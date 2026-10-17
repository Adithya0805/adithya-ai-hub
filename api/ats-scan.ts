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

Analyze this resume against the job description and return ONLY a JSON object.

RESUME:
${resume.slice(0, 4000)}

JOB DESCRIPTION:
${jobDesc.slice(0, 3000)}

Return ONLY this JSON structure, no other text:
{
  "score": <number 0-100, holistic match score based on keyword presence, technical qualification alignment, and ATS readability>,
  "matchedKeywords": [<array of strings — keywords and skills from JD clearly found in resume, max 15>],
  "missingKeywords": [<array of strings — important JD keywords and technical skills missing from resume, max 15>],
  "formatIssues": [<array of strings — ATS formatting, structure, or impact problems found, max 5>],
  "topSuggestion": "<single most impactful improvement in 1-2 concise actionable sentences>",
  "sectionScores": {
    "keywordMatch": <number 0-100>,
    "formatting": <number 0-100>,
    "relevance": <number 0-100>,
    "completeness": <number 0-100>
  },
  "verdict": "<2-sentence honest assessment of this resume for this target job>",
  "verdictColor": "<'green' if score>=75, 'yellow' if score>=50, 'red' if score<50>"
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
            maxOutputTokens: 2000,
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
              maxOutputTokens: 2000,
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
