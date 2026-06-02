// api/subscribe.ts — Vercel Serverless Function
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name = 'AI Learner' } = req.body

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : null
  const VITE_SITE_URL = process.env.VITE_SITE_URL || 'https://adithyaai.is-cool.dev'
  const PDF_DOWNLOAD_URL = process.env.PDF_DOWNLOAD_URL || `${VITE_SITE_URL}/top-10-python-questions.md`

  if (!BREVO_API_KEY) {
    console.error('Missing BREVO_API_KEY environment variable')
    return res.status(500).json({ error: 'Mail server misconfiguration: BREVO_API_KEY environment variable is missing on Vercel/Local environment.' })
  }

  if (!BREVO_LIST_ID) {
    console.error('Missing BREVO_LIST_ID environment variable')
    return res.status(500).json({ error: 'Mail server misconfiguration: BREVO_LIST_ID environment variable is missing or invalid on Vercel/Local environment.' })
  }

  try {
    // Step 1 — Add contact to Brevo list
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name,
          SOURCE: 'AI Hub Lead Magnet'
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true
      })
    })

    if (!contactResponse.ok) {
      const contactError = await contactResponse.json()
      console.error('Brevo Contact API error:', contactError)
      
      // If list id is wrong or API key is wrong, fail immediately to inform user
      return res.status(500).json({ 
        error: `Brevo Contact Error: ${contactError.message || JSON.stringify(contactError)} (Code: ${contactError.code || 'unknown'})` 
      })
    }

    // Step 2 — Send welcome email with PDF link
    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'Adithya | AI Hub',
          email: 'adithyaadhi0805@gmail.com'
        },
        to: [{ email: email, name: name }],
        subject: '🎯 Your Free PDF is Here — Top 10 CTS/Wipro Python Questions',
        htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Adithya AI Hub</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Inter',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d1117,#0a1628);border:1px solid rgba(0,212,255,0.3);border-radius:16px 16px 0 0;padding:40px;text-align:center;">
              <p style="color:#00d4ff;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;">ADITHYA AI HUB</p>
              <h1 style="color:#f0f0f0;font-size:28px;font-weight:700;margin:0 0 12px 0;">Your Free PDF is Ready! 🎯</h1>
              <p style="color:#8888aa;font-size:16px;margin:0;">Top 10 CTS/Wipro Python Coding Questions</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#111118;border-left:1px solid rgba(0,212,255,0.1);border-right:1px solid rgba(0,212,255,0.1);padding:40px;">

              <p style="color:#f0f0f0;font-size:16px;line-height:1.7;margin:0 0 20px 0;">
                Hi ${name || 'there'} 👋
              </p>

              <p style="color:#ccccdd;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
                Thank you for joining 100+ AI learners on Adithya AI Hub. Your free PDF with the
                Top 10 Python questions from CTS and Wipro hiring tests is ready to download.
              </p>

              <!-- PDF Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${PDF_DOWNLOAD_URL}"
                       style="display:inline-block;background:linear-gradient(90deg,#00d4ff,#7c3aed);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:8px;">
                      📥 Download Your Free PDF
                    </a>
                  </td>
                </tr>
              </table>

              <!-- What's Inside -->
              <div style="background:#16161f;border:1px solid #222233;border-radius:12px;padding:24px;margin:0 0 32px 0;">
                <p style="color:#00d4ff;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px 0;">WHAT'S INSIDE THE PDF</p>
                <ul style="color:#ccccdd;font-size:15px;line-height:2;margin:0;padding-left:20px;">
                  <li>10 real Python questions from CTS & Wipro tests</li>
                  <li>Complete working solutions with explanations</li>
                  <li>Time & space complexity for each answer</li>
                  <li>Exactly how to explain your logic to interviewers</li>
                  <li>Common mistakes candidates make — and how to avoid them</li>
                </ul>
              </div>

              <!-- What to expect next -->
              <div style="border-left:3px solid #00d4ff;padding-left:20px;margin:0 0 32px 0;">
                <p style="color:#f0f0f0;font-size:15px;font-weight:600;margin:0 0 8px 0;">What to expect next:</p>
                <p style="color:#8888aa;font-size:14px;line-height:1.7;margin:0;">
                  Every week I send one practical AI/ML tutorial, interview tip, or career insight.
                  No spam. No generic content. Just the stuff that actually helped me go from a
                  Tamil Nadu engineering student to building production AI systems.
                </p>
              </div>

              <!-- Latest Blog Posts -->
              <p style="color:#00d4ff;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px 0;">START READING</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;">
                <tr>
                  <td style="background:#16161f;border:1px solid #222233;border-radius:8px;padding:16px;">
                    <a href="${VITE_SITE_URL}/blog/my-tcs-nqt-experience-2026-honest-review"
                       style="color:#f0f0f0;font-size:15px;font-weight:600;text-decoration:none;">
                      My TCS NQT Experience 2026 — Honest Review →
                    </a>
                    <p style="color:#8888aa;font-size:13px;margin:8px 0 0 0;">7 min read · Interview Prep</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;">
                <tr>
                  <td style="background:#16161f;border:1px solid #222233;border-radius:8px;padding:16px;">
                    <a href="${VITE_SITE_URL}/blog/how-i-built-mediaguard-multi-agent-ai-system"
                       style="color:#f0f0f0;font-size:15px;font-weight:600;text-decoration:none;">
                      How I Built MediGuard — Multi-Agent Clinical AI →
                    </a>
                    <p style="color:#8888aa;font-size:13px;margin:8px 0 0 0;">10 min read · Machine Learning</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px 0;">
                <tr>
                  <td style="background:#16161f;border:1px solid #222233;border-radius:8px;padding:16px;">
                    <a href="${VITE_SITE_URL}/blog/how-i-built-skillspeak-ai-career-platform-15-features"
                       style="color:#f0f0f0;font-size:15px;font-weight:600;text-decoration:none;">
                      How I Built SkillSpeak AI — 15 Feature Career Platform →
                    </a>
                    <p style="color:#8888aa;font-size:13px;margin:8px 0 0 0;">12 min read · Machine Learning</p>
                  </td>
                </tr>
              </table>

              <p style="color:#ccccdd;font-size:15px;line-height:1.7;margin:0;">
                Good luck with your interviews. If any of these questions appear in your CTS or
                Wipro test — let me know on LinkedIn. I would love to hear how it went.
              </p>

              <p style="color:#ccccdd;font-size:15px;margin:24px 0 0 0;">
                — Adithya Kuppusamy<br>
                <span style="color:#8888aa;font-size:13px;">AI & Data Science Engineer, Tamil Nadu</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d1117;border:1px solid rgba(0,212,255,0.1);border-radius:0 0 16px 16px;padding:24px;text-align:center;">
              <p style="color:#8888aa;font-size:13px;margin:0 0 8px 0;">
                <a href="${VITE_SITE_URL}" style="color:#00d4ff;text-decoration:none;">adithyaai.is-cool.dev</a>
                · <a href="https://github.com/Adithya0805" style="color:#00d4ff;text-decoration:none;">GitHub</a>
                · <a href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/" style="color:#00d4ff;text-decoration:none;">LinkedIn</a>
              </p>
              <p style="color:#555566;font-size:12px;margin:0;">
                You received this because you subscribed at adithyaai.is-cool.dev<br>
                <a href="{{unsubscribeUrl}}" style="color:#555566;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
        `
      })
    })

    if (!emailResponse.ok) {
      const error = await emailResponse.json()
      console.error('Brevo SMTP error:', error)
      return res.status(500).json({ 
        error: `Brevo Welcome Email Failed: ${error.message || JSON.stringify(error)}. Please check if sender email adithyaadhi0805@gmail.com is verified in Brevo Dashboard under Senders.`
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Subscribed successfully. Check your email for the free PDF.'
    })

  } catch (error: any) {
    console.error('Subscribe catch error:', error)
    return res.status(500).json({ error: `Connection / Server Error: ${error.message || error}` })
  }
}
