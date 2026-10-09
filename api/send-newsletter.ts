import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-secret-key')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Security check
  const secret = req.headers['x-secret-key']
  const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET

  if (NEWSLETTER_SECRET && secret !== NEWSLETTER_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid secret key' })
  }

  const {
    postTitle,
    postSlug,
    postExcerpt,
    postCategory,
    postReadTime
  } = req.body || {}

  if (!postTitle || !postSlug) {
    return res.status(400).json({ error: 'postTitle and postSlug are required' })
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '3')
  const postUrl = `https://adithya-ai-hub.vercel.app/blog/${postSlug}`

  if (!BREVO_API_KEY) {
    return res.status(500).json({ error: 'BREVO_API_KEY is missing in Vercel environment variables' })
  }

  try {
    // 1. Fetch active subscribers from Brevo List #3
    const listRes = await fetch(
      `https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID}/contacts?limit=50&offset=0`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        }
      }
    )

    if (!listRes.ok) {
      const err = await listRes.json().catch(() => ({}))
      console.error('Brevo fetch list error:', err)
      let msg = err.message || `Failed to fetch contacts from Brevo List #${BREVO_LIST_ID}`
      if (typeof msg === 'string' && (msg.includes('unrecognised IP address') || msg.includes('authorised_ips'))) {
        msg = 'Brevo IP restriction active: Please open https://app.brevo.com/security/authorised_ips and click "Deactivate for API" to allow Vercel.'
      }
      return res.status(listRes.status).json({
        error: msg,
        details: err,
        listId: BREVO_LIST_ID
      })
    }

    const listData = await listRes.json()
    const contacts: { email: string }[] = listData.contacts || []

    if (contacts.length === 0) {
      return res.status(200).json({
        success: true,
        sentCount: 0,
        totalSubscribers: 0,
        listId: BREVO_LIST_ID,
        message: `No active contacts found in Brevo List #${BREVO_LIST_ID}. Add a subscriber first!`,
        postUrl
      })
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Segoe UI',system-ui,sans-serif;color:#f1f5f9;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0c;padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#121216;border:1px solid #26262a;border-radius:14px;padding:36px;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:24px;border-bottom:1px solid #26262a;">
              <h2 style="color:#c8a96e;margin:0 0 4px 0;font-size:22px;letter-spacing:-0.5px;">ADITHYA AI HUB</h2>
              <p style="font-size:11px;color:#94a3b8;margin:0;text-transform:uppercase;letter-spacing:1.5px;">AI Systems & Engineering Research</p>
            </td>
          </tr>

          <!-- New Post Announcement -->
          <tr>
            <td style="padding:28px 0 24px;">
              <span style="font-size:11px;color:#c8a96e;font-weight:700;letter-spacing:2px;text-transform:uppercase;background:rgba(200,169,110,0.12);padding:4px 8px;border-radius:4px;border:1px solid rgba(200,169,110,0.25);">
                ${postCategory || 'AI & MACHINE LEARNING'} · ${postReadTime || '5 min read'}
              </span>

              <h1 style="color:#ffffff;font-size:26px;font-weight:700;margin:18px 0 16px;line-height:1.25;letter-spacing:-0.5px;">
                ${postTitle}
              </h1>

              <p style="font-size:15px;color:#cbd5e1;line-height:1.75;margin:0 0 28px;">
                ${postExcerpt || 'A new technical architecture breakdown is live on Adithya AI Hub.'}
              </p>

              <a href="${postUrl}" style="display:inline-block;background-color:#c8a96e;color:#0a0a0a;font-size:14px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:6px;letter-spacing:0.3px;">
                Read Full Article →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #26262a;padding-top:24px;font-size:12px;color:#64748b;line-height:1.6;">
              <p style="margin:0 0 6px;color:#94a3b8;"><strong>Adithya Kuppusamy</strong> · AI Engineer · Ambur, Tamil Nadu</p>
              <p style="margin:0;">
                <a href="https://adithya-ai-hub.vercel.app" style="color:#c8a96e;text-decoration:none;">adithya-ai-hub.vercel.app</a>
                &nbsp;·&nbsp;
                <a href="https://adithya-ai-hub.vercel.app/blog" style="color:#94a3b8;text-decoration:none;">Browse All Research</a>
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

    // 2. Send instant transactional email to all contacts in Brevo List #3
    const sendResults = await Promise.all(
      contacts.map(async (contact) => {
        try {
          const sendRes = await fetch('https://api.brevo.com/v3/smtp/email', {
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
              to: [{ email: contact.email }],
              subject: `New on Adithya AI Hub: ${postTitle}`,
              htmlContent: emailHtml
            })
          })

          const data = await sendRes.json().catch(() => ({}))
          return { email: contact.email, ok: sendRes.ok, status: sendRes.status, data }
        } catch (err: any) {
          return { email: contact.email, ok: false, error: err.message }
        }
      })
    )

    const successful = sendResults.filter(r => r.ok).length

    return res.status(200).json({
      success: true,
      sentCount: successful,
      totalSubscribers: contacts.length,
      listId: BREVO_LIST_ID,
      message: `Broadcast complete! Successfully sent email to ${successful} subscriber(s) in Brevo List #${BREVO_LIST_ID}.`,
      postUrl,
      results: sendResults
    })

  } catch (error: any) {
    console.error('Send newsletter handler error:', error)
    return res.status(500).json({ error: error.message || 'Something went wrong dispatching newsletter' })
  }
}
