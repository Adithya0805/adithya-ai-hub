import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  } = req.body

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
    // Create email campaign in Brevo targeted to List #3
    const campaignRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        name: `New Post — ${postTitle} — ${new Date().toLocaleDateString()}`,
        subject: `New on Adithya AI Hub: ${postTitle}`,
        sender: {
          name: 'Adithya | AI Hub',
          email: 'adithyaadhi0805@gmail.com'
        },
        type: 'classic',
        htmlContent: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0c;font-family:'Segoe UI',sans-serif;color:#f1f5f9;">

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
                <a href="{{unsubscribeUrl}}" style="color:#64748b;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
        `,
        recipients: { listIds: [BREVO_LIST_ID] },
        scheduledAt: new Date(Date.now() + 2 * 60 * 1000).toISOString()
      })
    })

    if (!campaignRes.ok) {
      const err = await campaignRes.json().catch(() => ({}))
      console.error('Brevo campaign creation error:', err)
      return res.status(500).json({ error: 'Failed to create Brevo campaign', details: err, listId: BREVO_LIST_ID })
    }

    const campaign = await campaignRes.json()

    return res.status(200).json({
      success: true,
      campaignId: campaign.id,
      listId: BREVO_LIST_ID,
      message: `Newsletter campaign created for Brevo List #${BREVO_LIST_ID}. Scheduled to broadcast in 2 minutes!`,
      postUrl
    })

  } catch (error: any) {
    console.error('Notify handler error:', error)
    return res.status(500).json({ error: error.message || 'Something went wrong scheduling newsletter' })
  }
}
