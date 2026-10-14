import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { resume, jobDesc, missingKeywords = [], formatIssues = [] } = req.body || {}

  if (!resume || !jobDesc) {
    return res.status(400).json({ error: 'Resume and job description required' })
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  if (!GEMINI_API_KEY) {
    console.error('Server error: GEMINI_API_KEY is not defined')
    return res.status(500).json({ error: 'Gemini API key is not configured on the server' })
  }

  const prompt = `You are an elite Executive Technical Resume Writer and ATS Optimization Specialist.

YOUR TASK:
Take the provided candidate RESUME and rewrite it into a high-scoring, ATS-optimized version specifically tailored for the target JOB DESCRIPTION.

CANDIDATE RESUME:
${resume.slice(0, 4500)}

TARGET JOB DESCRIPTION:
${jobDesc.slice(0, 3500)}

MISSING KEYWORDS TO NATURALLY INTEGRATE:
${Array.isArray(missingKeywords) ? missingKeywords.join(', ') : 'None specified'}

FORMAT ISSUES TO RESOLVE:
${Array.isArray(formatIssues) ? formatIssues.join(', ') : 'None specified'}

OPTIMIZATION RULES:
1. Maintain honesty: Keep candidate's core identity, projects, and educational background truthful while professionally framing experience.
2. Naturally embed the missing keywords into experience and project bullet points using Google's XYZ formula: Accomplished [X], as measured by [Y], by doing [Z].
3. Ensure crisp ATS-friendly structure:
   - Header with Candidate Name, Title, Contact Info
   - Professional Summary (2-3 punchy sentences with core JD keywords)
   - Technical Skills (categorized cleanly: Languages, Frameworks, Cloud/DevOps, Tools)
   - Professional Experience & Key Projects (with measurable metrics: %, ms latency, scale)
   - Education & Certifications
4. Fix any formatting or readability issues identified.

Return ONLY a JSON object in this exact structure:
{
  "optimizedResume": "<complete, polished, print-ready plain text resume with standard markdown formatting>",
  "keyEnhancements": [
    "<3-5 bullet points explaining key improvements made, e.g. integrated CI/CD and Docker ECS, added quantifiable performance metrics, strengthened summary>"
  ],
  "bulletInsertions": [
    {
      "keyword": "<missing keyword>",
      "suggestedBullet": "<concise high-impact bullet point demonstrating this skill in action>",
      "placementSection": "<e.g. Work Experience or Technical Projects>"
    }
  ],
  "projectedScore": <number between 88 and 96>
}`

  try {
    let modelName = 'gemini-2.5-flash'
    let geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 3000,
            responseMimeType: 'application/json',
          },
        }),
      }
    )

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
              temperature: 0.3,
              maxOutputTokens: 3000,
              responseMimeType: 'application/json',
            },
          }),
        }
      )
    }

    const data = await geminiRes.json()

    if (!geminiRes.ok) {
      console.error('Gemini API error during resume optimization:', data)
      return res.status(502).json({ error: data.error?.message || 'Gemini API failed' })
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
    console.error('Resume optimizer server error:', e)
    return res.status(500).json({ error: e?.message || 'Failed to optimize resume' })
  }
}
