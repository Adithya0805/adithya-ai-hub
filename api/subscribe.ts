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
  // List 3 is "AI Hub Subscribers" in Brevo
  const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '3')

  if (!BREVO_API_KEY) {
    return res.status(500).json({ 
      error: 'Brevo API key is not configured in Vercel. Please add BREVO_API_KEY in Vercel Settings -> Environment Variables.' 
    })
  }

  try {
    // Step 1 — Add contact to Brevo list #3
    // Use standard Brevo payload without non-standard custom attributes that trigger schema validation errors
    const contactPayload: Record<string, any> = {
      email: email.trim().toLowerCase(),
      listIds: [BREVO_LIST_ID],
      updateEnabled: true
    }

    if (name && name !== 'AI Learner') {
      contactPayload.attributes = { FIRSTNAME: name }
    }

    const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(contactPayload)
    })

    const contactData = await contactRes.json().catch(() => ({}))

    // Brevo returns 201 for created, 204 for updated/already exists
    if (!contactRes.ok && contactRes.status !== 204 && contactRes.status !== 201) {
      console.error('Brevo contact error:', contactData)
      return res.status(contactRes.status || 400).json({
        error: contactData.message || 'Failed to add subscriber to Brevo list',
        brevoCode: contactData.code || null,
        listIdAttempted: BREVO_LIST_ID
      })
    }

    // Step 2 — Attempt welcome email (non-blocking if sender email is not yet authenticated in Brevo)
    try {
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
          to: [{ email: email.trim().toLowerCase(), name: name }],
          subject: 'Welcome to Adithya AI Hub — You are in!',
          htmlContent: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Segoe UI',sans-serif;color:#f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0c;padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#121216;border:1px solid #26262a;border-radius:12px;padding:36px;">
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #26262a;">
              <h2 style="color:#c8a96e;margin:0 0 6px 0;font-size:22px;letter-spacing:-0.5px;">ADITHYA AI HUB</h2>
              <p style="font-size:12px;color:#94a3b8;margin:0;text-transform:uppercase;letter-spacing:1.5px;">AI Systems & Engineering Research</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0 24px;">
              <h1 style="color:#ffffff;font-size:24px;margin:0 0 16px 0;">You're on the list!</h1>
              <p style="font-size:15px;color:#cbd5e1;line-height:1.7;margin:0 0 20px 0;">
                Thank you for subscribing to my engineering dispatches. You will receive an email whenever I publish a new architecture breakdown, clinical AI case study, or open-source release.
              </p>
              <a href="https://adithya-ai-hub.vercel.app/blog" style="display:inline-block;padding:12px 24px;background:#c8a96e;color:#0a0a0a;text-decoration:none;border-radius:6px;font-weight:700;font-size:13px;">
                Explore Recent Articles →
              </a>
            </td>
          </tr>
          <tr>
            <td style="border-top:1px solid #26262a;padding-top:20px;font-size:12px;color:#64748b;">
              Adithya Kuppusamy · AI Engineer · Ambur, Tamil Nadu<br />
              <a href="https://adithya-ai-hub.vercel.app" style="color:#c8a96e;text-decoration:none;">adithya-ai-hub.vercel.app</a>
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
        const emailErr = await emailRes.json().catch(() => ({}))
        console.warn('Welcome email not sent (check Brevo sender authorization):', emailErr)
      }
    } catch (e) {
      console.warn('Welcome email exception:', e)
    }

    return res.status(200).json({
      success: true,
      message: 'Subscribed successfully! Contact added to Brevo list #3.',
      listId: BREVO_LIST_ID
    })

  } catch (error: any) {
    console.error('Subscribe handler error:', error)
    return res.status(500).json({ error: error.message || 'Something went wrong. Please try again.' })
  }
}
