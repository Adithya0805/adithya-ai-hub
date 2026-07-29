import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, name = 'AI Learner' } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '1')

  if (!BREVO_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    // Step 1 — Add contact to Brevo list
    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name,
          SOURCE: 'Adithya AI Hub Newsletter'
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true
      })
    })

    // 201 = created, 204 = already exists (both are fine)
    if (!contactRes.ok && contactRes.status !== 204) {
      const err = await contactRes.json()
      console.error('Brevo contact error:', err)
      // Don't fail — still send welcome email
    }

    // Step 2 — Send welcome email
    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
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
        subject: 'Welcome to Adithya AI Hub — You are in!',
        htmlContent: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8f4ef;font-family:'Georgia',serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4ef;padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:40px;border-bottom:1px solid #e8e2da;">
              <p style="font-family:'Georgia',serif;font-size:22px;font-weight:700;color:#1a1a1a;margin:0 0 4px 0;">
                Adithya AI Hub
              </p>
              <p style="font-size:13px;color:#9a9a9a;margin:0;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">
                AI Engineer · Tamil Nadu
              </p>
            </td>
          </tr>

          <!-- Welcome -->
          <tr>
            <td style="padding:40px 0 32px;">
              <p style="font-size:13px;color:#9a9a9a;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;font-family:Arial,sans-serif;">
                WELCOME
              </p>
              <h1 style="font-family:'Georgia',serif;font-size:36px;font-weight:700;color:#1a1a1a;margin:0 0 24px;line-height:1.2;letter-spacing:-1px;">
                You are in, ${name}!
              </h1>
              <p style="font-size:16px;color:#4a4a4a;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
                Thank you for subscribing to Adithya AI Hub. You will get one email every time
                I publish a new post — ML tutorials, project breakdowns, career insights, and
                honest writing about what the fresher AI job search actually looks like.
              </p>
              <p style="font-size:16px;color:#4a4a4a;line-height:1.8;margin:0 0 32px;font-family:Arial,sans-serif;">
                No spam. No fluff. Just the stuff that actually helps.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="border-top:1px solid #e8e2da;padding-top:32px;"></td></tr>

          <!-- Latest Posts -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="font-size:11px;color:#9a9a9a;letter-spacing:3px;text-transform:uppercase;margin:0 0 24px;font-family:Arial,sans-serif;">
                START READING
              </p>

              <!-- Post 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="padding:20px;border:1px solid #e8e2da;border-radius:4px;">
                    <p style="font-size:11px;color:#9a9a9a;margin:0 0 8px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">
                      CAREER · 8 MIN READ
                    </p>
                    <a href="https://adithyaai.is-cool.dev/blog/my-ai-career-journey-2025-tamil-nadu-fresher"
                       style="font-family:'Georgia',serif;font-size:18px;font-weight:700;color:#1a1a1a;text-decoration:none;line-height:1.3;">
                      From Ambur to AI Engineer — My Honest Career Journey →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Post 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="padding:20px;border:1px solid #e8e2da;border-radius:4px;">
                    <p style="font-size:11px;color:#9a9a9a;margin:0 0 8px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">
                      MACHINE LEARNING · 10 MIN READ
                    </p>
                    <a href="https://adithyaai.is-cool.dev/blog/how-i-built-mediaguard-multi-agent-ai-system"
                       style="font-family:'Georgia',serif;font-size:18px;font-weight:700;color:#1a1a1a;text-decoration:none;line-height:1.3;">
                      How I Built MediGuard — Multi-Agent Clinical AI →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Post 3 -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px;border:1px solid #e8e2da;border-radius:4px;">
                    <p style="font-size:11px;color:#9a9a9a;margin:0 0 8px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">
                      INTERVIEW PREP · 7 MIN READ
                    </p>
                    <a href="https://adithyaai.is-cool.dev/blog/my-tcs-nqt-experience-2026-honest-review"
                       style="font-family:'Georgia',serif;font-size:18px;font-weight:700;color:#1a1a1a;text-decoration:none;line-height:1.3;">
                      My TCS NQT Experience 2026 — Honest Review →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="border-top:1px solid #e8e2da;padding-top:32px;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="padding-bottom:48px;">
              <p style="font-family:'Georgia',serif;font-size:16px;font-weight:700;color:#1a1a1a;margin:0 0 4px;">
                Adithya Kuppusamy
              </p>
              <p style="font-size:13px;color:#9a9a9a;margin:0 0 20px;font-family:Arial,sans-serif;">
                AI & Data Science Engineer · Ambur, Tamil Nadu
              </p>
              <div style="display:flex;gap:20px;">
                <a href="https://adithyaai.is-cool.dev" style="font-size:13px;color:#1a1a1a;font-family:Arial,sans-serif;">Website</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="https://github.com/Adithya0805" style="font-size:13px;color:#1a1a1a;font-family:Arial,sans-serif;">GitHub</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="https://www.linkedin.com/in/adithya-kuppusamy-76baab204/" style="font-size:13px;color:#1a1a1a;font-family:Arial,sans-serif;">LinkedIn</a>
              </div>
              <p style="font-size:12px;color:#b0b0b0;margin:20px 0 0;font-family:Arial,sans-serif;">
                You subscribed at adithyaai.is-cool.dev · <a href="{{unsubscribeUrl}}" style="color:#b0b0b0;">Unsubscribe</a>
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

    if (!emailRes.ok) {
      const err = await emailRes.json()
      console.error('Brevo email send error:', err)
      // Contact was added — partial success
      return res.status(200).json({
        success: true,
        message: 'Subscribed successfully. Welcome email may be delayed.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Subscribed! Check your inbox for a welcome email.'
    })

  } catch (error) {
    console.error('Subscribe handler error:', error)
    return res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}
