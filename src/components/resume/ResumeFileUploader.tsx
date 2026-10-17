import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, RefreshCw, Eye, EyeOff } from "lucide-react";
import { extractTextFromFile, ExtractedResumeFile } from "@/utils/resumeParser";

interface ResumeFileUploaderProps {
  onTextExtracted: (text: string, fileMeta?: ExtractedResumeFile) => void;
  extractedMeta: ExtractedResumeFile | null;
  onClear: () => void;
  rawText: string;
  onRawTextChange: (text: string) => void;
}

export function ResumeFileUploader({
  onTextExtracted,
  extractedMeta,
  onClear,
  rawText,
  onRawTextChange,
}: ResumeFileUploaderProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setParseError("File is too large (maximum size is 10 MB).");
      return;
    }

    setParseError(null);
    setIsParsing(true);

    try {
      const extracted = await extractTextFromFile(file);
      onTextExtracted(extracted.text, extracted);
      onRawTextChange(extracted.text);
    } catch (err: any) {
      setParseError(err.message || "Failed to process resume file. Please try pasting plain text.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Tab Switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <label
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "var(--text-1)",
            letterSpacing: "0.3px",
          }}
        >
          Your Resume
          <span style={{ color: "var(--text-3)", fontWeight: "400", marginLeft: "8px" }}>
            (Upload PDF, DOCX, or paste text)
          </span>
        </label>

        <div
          style={{
            display: "inline-flex",
            background: "var(--bg-2)",
            padding: "3px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              fontWeight: activeTab === "upload" ? "600" : "400",
              color: activeTab === "upload" ? "var(--accent)" : "var(--text-2)",
              background: activeTab === "upload" ? "var(--bg-0)" : "transparent",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            File Upload (PDF / DOCX)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("paste")}
            style={{
              padding: "4px 12px",
              fontSize: "12px",
              fontWeight: activeTab === "paste" ? "600" : "400",
              color: activeTab === "paste" ? "var(--accent)" : "var(--text-2)",
              background: activeTab === "paste" ? "var(--bg-0)" : "transparent",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Plain Text Paste
          </button>
        </div>
      </div>

      {/* UPLOAD TAB CONTENT */}
      {activeTab === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />

          {/* Dropped / Extracted File Badge */}
          {extractedMeta ? (
            <div
              style={{
                padding: "20px",
                background: "var(--bg-1)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      background: "rgba(74, 222, 128, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4ade80",
                    }}
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-1)", margin: 0 }}>
                      {extractedMeta.fileName}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-3)", margin: "3px 0 0" }}>
                      {extractedMeta.fileType.toUpperCase()} • {formatFileSize(extractedMeta.fileSize)}
                      {extractedMeta.pageCount ? ` • ${extractedMeta.pageCount} page(s)` : ""} •{" "}
                      {extractedMeta.text.split(/\s+/).length} words extracted
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      color: "var(--text-2)",
                      background: "var(--bg-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
                    {showPreview ? "Hide Preview" : "Preview Text"}
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      color: "var(--accent)",
                      background: "rgba(200, 169, 110, 0.1)",
                      border: "1px solid rgba(200, 169, 110, 0.3)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <RefreshCw size={13} />
                    Replace File
                  </button>

                  <button
                    type="button"
                    onClick={onClear}
                    style={{
                      padding: "6px 8px",
                      fontSize: "12px",
                      color: "var(--text-3)",
                      background: "var(--bg-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    title="Remove file"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Text Preview Drawer */}
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      overflow: "hidden",
                      borderTop: "1px solid var(--border)",
                      paddingTop: "12px",
                    }}
                  >
                    <p style={{ fontSize: "11px", color: "var(--text-3)", marginBottom: "6px" }}>
                      Extracted Text Preview:
                    </p>
                    <pre
                      style={{
                        padding: "12px",
                        background: "var(--bg-0)",
                        borderRadius: "6px",
                        fontSize: "12px",
                        color: "var(--text-2)",
                        maxHeight: "160px",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        fontFamily: "var(--font-mono)",
                        border: "1px solid var(--border)",
                        margin: 0,
                      }}
                    >
                      {extractedMeta.text.slice(0, 1500)}
                      {extractedMeta.text.length > 1500 ? "\n\n... (truncated for preview)" : ""}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Drag and Drop Box */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isParsing && fileInputRef.current?.click()}
              style={{
                border: isDragging ? "2px dashed var(--accent)" : "1.5px dashed var(--border)",
                borderRadius: "10px",
                padding: "40px 24px",
                textAlign: "center",
                background: isDragging ? "rgba(200, 169, 110, 0.05)" : "var(--bg-1)",
                cursor: isParsing ? "wait" : "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {isParsing ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "2px solid var(--accent)",
                      borderTopColor: "transparent",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-1)", margin: 0 }}>
                    Extracting text from resume...
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-3)", margin: 0 }}>
                    Reading layout, sections, and keywords
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(200, 169, 110, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)",
                      marginBottom: "4px",
                    }}
                  >
                    <UploadCloud size={24} />
                  </div>

                  <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-1)", margin: 0 }}>
                    Drop your resume here, or <span style={{ color: "var(--accent)", textDecoration: "underline" }}>browse files</span>
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-3)", margin: 0 }}>
                    Supports <strong>PDF (.pdf)</strong>, <strong>Word (.docx, .doc)</strong>, and <strong>Text (.txt)</strong> up to 10MB
                  </p>

                  <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                    {["100% Client-Side Parsing", "Zero Cloud Storage", "Instant Pattern Scan"].map((badge) => (
                      <span
                        key={badge}
                        style={{
                          fontSize: "11px",
                          color: "var(--text-3)",
                          background: "var(--bg-2)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          border: "1px solid var(--border)",
                        }}
                      >
                        ✓ {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {parseError && (
            <div
              style={{
                marginTop: "12px",
                padding: "10px 14px",
                background: "rgba(248, 113, 113, 0.1)",
                border: "1px solid rgba(248, 113, 113, 0.3)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#f87171",
                fontSize: "13px",
              }}
            >
              <AlertCircle size={16} />
              <span>{parseError}</span>
            </div>
          )}
        </div>
      )}

      {/* PLAIN TEXT TAB CONTENT */}
      {activeTab === "paste" && (
        <div>
          <textarea
            value={rawText}
            onChange={(e) => {
              onRawTextChange(e.target.value);
              onTextExtracted(e.target.value);
            }}
            placeholder="Paste your full resume text here — contact info, summary, experience, technical skills, education, and projects..."
            rows={10}
            style={{
              width: "100%",
              padding: "16px",
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-1)",
              fontSize: "13px",
              lineHeight: "1.65",
              resize: "vertical",
              outline: "none",
              fontFamily: "var(--font-mono)",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      )}
    </div>
  );
}
