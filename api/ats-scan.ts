import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { resume, jobDesc } = req.body || {}
  if (!resume || !jobDesc) {
    return res.status(400).json({ error: 'Resume and job description required' })
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  if (!GEMINI_API_KEY) {
    console.error('Server error: GEMINI_API_KEY is not defined in environment variables')
    return res.status(500).json({ error: 'Gemini API key is not configured on the server' })
  }

  const prompt = `You are an expert ATS (Applicant Tracking System) analyzer and senior technical recruiter.

Analyze this resume against the job description and extract its exact structure into a clean JSON object. Keep all candidate facts, projects, bullets, and skills 100% truthful to the original. Do NOT invent fake experience if candidate only has projects.

RESUME:
${resume.slice(0, 4500)}

JOB DESCRIPTION:
${jobDesc.slice(0, 3500)}

Return ONLY this JSON structure:
{
  "score": <number 0-100, holistic match score based on keyword presence and technical qualification alignment>,
  "matchedKeywords": [<array of strings — keywords from JD found in resume, max 15>],
  "missingKeywords": [<array of strings — key JD keywords/skills missing from resume, max 15>],
  "formatIssues": [<array of strings — ATS formatting or impact improvements, max 5>],
  "topSuggestion": "<single most impactful improvement in 1-2 concise actionable sentences>",
  "sectionScores": {
    "keywordMatch": <number 0-100>,
    "formatting": <number 0-100>,
    "relevance": <number 0-100>,
    "completeness": <number 0-100>
  },
  "verdict": "<2-sentence assessment of this resume for this target job>",
  "verdictColor": "<'green' if score>=75, 'yellow' if score>=50, 'red' if score<50>",
  "structuredResume": {
    "header": {
      "fullName": "<Candidate Name>",
      "jobTitle": "<Role headline, e.g. Software & AI Engineer>",
      "location": "<e.g. Ambur, Tamil Nadu, India>",
      "phone": "<e.g. +91 8825714576>",
      "email": "<email>",
      "linkedin": "<linkedin if present>",
      "github": "<github if present>"
    },
    "summary": "<candidate's exact summary paragraph from resume>",
    "skillCategories": [
      {
        "category": "<e.g. Languages / AI & Generative AI Frameworks / Machine Learning & Data Infrastructure / Web & Database Engineering / Cloud, DevOps & Automation>",
        "skills": ["<skill1>", "<skill2>"]
      }
    ],
    "projects": [
      {
        "id": "proj-1",
        "title": "<Project Name>",
        "techStack": "<comma-separated tech stack>",
        "bullets": [
          "<complete unbroken bullet point 1>",
          "<complete unbroken bullet point 2>"
        ]
      }
    ],
    "experience": [
      {
        "id": "exp-1",
        "company": "<company name if candidate has work experience, else leave empty array>",
        "role": "<job role>",
        "location": "<location>",
        "startDate": "<dates>",
        "endDate": "<dates>",
        "bullets": ["<bullet>"]
      }
    ],
    "education": [
      {
        "id": "edu-1",
        "degree": "<degree or exam name>",
        "institution": "<institution or school>",
        "year": "<year or graduation date>",
        "gpaOrScore": "<e.g. 8.5 CGPA or 74%>"
      }
    ],
    "certifications": [
      {
        "id": "cert-1",
        "title": "<certification title>",
        "issuerYear": "<issuer and year>",
        "description": "<brief description if present>"
      }
    ],
    "sectionOrder": ["summary", "skills", "projects", "education", "certifications"]
  }
}`

  try {
    // Model preference: gemini-2.5-flash with native JSON mode
    let modelName = 'gemini-2.5-flash'
    let geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 3500,
            responseMimeType: 'application/json',
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    )

    // Fallback if 2.5-flash is temporarily unavailable
    if (!geminiRes.ok && geminiRes.status === 404) {
      modelName = 'gemini-flash-latest'
      geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 3500,
              responseMimeType: 'application/json',
              thinkingConfig: { thinkingBudget: 0 },
            },
          }),
        }
      )
    }

    const data = await geminiRes.json()

    if (!geminiRes.ok) {
      console.error('Gemini API returned error:', data)
      return res.status(502).json({ error: data.error?.message || 'Upstream Gemini API error' })
    }

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    let clean = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()
    const firstBrace = clean.indexOf('{')
    const lastBrace = clean.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      clean = clean.slice(firstBrace, lastBrace + 1)
    }

    const result = JSON.parse(clean)

    return res.status(200).json(result)
  } catch (e: any) {
    console.error('ATS scan server error:', e)
    return res.status(500).json({ error: e?.message || 'Analysis failed. Please try again.' })
  }
}
