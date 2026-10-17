import * as mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

// Configure worker safely for Vite / browser
if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  // Use unpkg worker URL matching installed version, or cdnjs
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || "4.10.38"}/build/pdf.worker.min.mjs`;
}

export interface ExtractedResumeFile {
  text: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  pageCount?: number;
}

/**
 * Extracts plain text from an uploaded resume file (.pdf, .docx, .doc, .txt).
 */
export async function extractTextFromFile(file: File): Promise<ExtractedResumeFile> {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const arrayBuffer = await file.arrayBuffer();

  // 1. Plain Text
  if (extension === "txt" || file.type === "text/plain") {
    const text = new TextDecoder("utf-8").decode(arrayBuffer);
    return {
      text: text.trim(),
      fileName: file.name,
      fileSize: file.size,
      fileType: "txt",
      pageCount: 1,
    };
  }

  // 2. Word Document (.docx)
  if (extension === "docx" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      const clean = result.value.replace(/\n\s*\n\s*\n/g, "\n\n").trim();
      return {
        text: clean,
        fileName: file.name,
        fileSize: file.size,
        fileType: "docx",
      };
    } catch (err) {
      console.error("Mammoth DOCX extraction failed:", err);
      throw new Error("Could not parse DOCX file. Please try pasting the text or saving as PDF.");
    }
  }

  // 3. PDF Document (.pdf)
  if (extension === "pdf" || file.type === "application/pdf") {
    try {
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        useSystemFonts: true,
      });

      const pdf = await loadingTask.promise;
      const pageTexts: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        let lastY: number | null = null;
        let pageStr = "";

        for (const item of textContent.items as any[]) {
          if (!("str" in item)) continue;
          
          // Check for line break based on vertical coordinate Y change
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
            pageStr += "\n";
          } else if (pageStr.length > 0 && !pageStr.endsWith(" ") && !item.str.startsWith(" ")) {
            pageStr += " ";
          }
          pageStr += item.str;
          lastY = item.transform[5];
        }

        pageTexts.push(pageStr.trim());
      }

      const fullText = pageTexts.join("\n\n").trim();
      if (fullText.length < 50) {
        throw new Error("The PDF appears to be an image or scanned document with no selectable text. Please upload a standard text PDF or paste the text directly.");
      }

      return {
        text: fullText,
        fileName: file.name,
        fileSize: file.size,
        fileType: "pdf",
        pageCount: pdf.numPages,
      };
    } catch (err: any) {
      console.error("PDF parsing error:", err);
      throw new Error(err.message || "Failed to extract text from PDF.");
    }
  }

  // 4. Legacy .doc fallback (extract ASCII text chunks)
  if (extension === "doc") {
    try {
      const raw = new Uint8Array(arrayBuffer);
      let extracted = "";
      for (let i = 0; i < raw.length; i++) {
        const code = raw[i];
        if (code >= 32 && code <= 126) {
          extracted += String.fromCharCode(code);
        } else if (code === 10 || code === 13) {
          extracted += "\n";
        }
      }
      const clean = extracted.replace(/[^\x20-\x7E\n]/g, "").replace(/\n\s*\n\s*\n/g, "\n\n").trim();
      if (clean.length > 100) {
        return {
          text: clean,
          fileName: file.name,
          fileSize: file.size,
          fileType: "doc",
        };
      }
    } catch (e) {
      // ignore fallback error
    }
    throw new Error("Legacy .doc format detected. For best results, please save or export as .pdf or .docx.");
  }

  throw new Error(`Unsupported file type (.${extension}). Please upload a .pdf, .docx, or .txt file.`);
}
