import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Security check
  const secret = req.headers['x-secret-key']
  if (secret !== process.env.NEWSLETTER_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
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
  const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '1')
  const postUrl = `https://adithyaai.is-cool.dev/blog/${postSlug}`

  try {
    // Create and schedule email campaign
    const campaignRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY!
      },
      body: JSON.stringify({
        name: `New Post — ${postTitle} — ${new Date().toLocaleDateString()}`,
        subject: `New post: ${postTitle}`,
        sender: {
          name: 'Adithya | AI Hub',
          email: 'adithyaadhi0805@gmail.com'
        },
        type: 'classic',
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
            <td style="padding-bottom:32px;border-bottom:1px solid #e8e2da;">
              <p style="font-family:'Georgia',serif;font-size:20px;font-weight:700;color:#1a1a1a;margin:0;">
                Adithya AI Hub
              </p>
            </td>
          </tr>

          <!-- New Post Label -->
          <tr>
            <td style="padding:32px 0 24px;">
              <p style="font-size:11px;color:#9a9a9a;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;font-family:Arial,sans-serif;">
                NEW POST · ${postCategory || 'ADITHYA AI HUB'} · ${postReadTime || ''}
              </p>
              <h1 style="font-family:'Georgia',serif;font-size:32px;font-weight:700;color:#1a1a1a;margin:0 0 20px;line-height:1.2;letter-spacing:-0.5px;">
                ${postTitle}
              </h1>
              <p style="font-size:16px;color:#4a4a4a;line-height:1.8;margin:0 0 32px;font-family:Arial,sans-serif;">
                ${postExcerpt || 'A new article is live on Adithya AI Hub.'}
              </p>
              <a href="${postUrl}"
                 style="display:inline-block;background-color:#1a1a1a;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:4px;font-family:Arial,sans-serif;letter-spacing:0.5px;">
                Read Full Article →
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="border-top:1px solid #e8e2da;padding-top:32px;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="padding-bottom:48px;">
              <p style="font-family:'Georgia',serif;font-size:15px;font-weight:700;color:#1a1a1a;margin:0 0 4px;">
                Adithya Kuppusamy
              </p>
              <p style="font-size:13px;color:#9a9a9a;margin:0 0 16px;font-family:Arial,sans-serif;">
                AI & Data Science Engineer · Tamil Nadu
              </p>
              <p style="font-size:12px;color:#b0b0b0;margin:0;font-family:Arial,sans-serif;">
                <a href="https://adithyaai.is-cool.dev" style="color:#6b6b6b;">adithyaai.is-cool.dev</a>
                &nbsp;·&nbsp;
                <a href="{{unsubscribeUrl}}" style="color:#b0b0b0;">Unsubscribe</a>
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
      const err = await campaignRes.json()
      console.error('Campaign error:', err)
      return res.status(500).json({ error: 'Failed to create campaign', details: err })
    }

    const campaign = await campaignRes.json()

    return res.status(200).json({
      success: true,
      campaignId: campaign.id,
      message: `Newsletter scheduled. Will send in 2 minutes.`,
      postUrl
    })

  } catch (error) {
    console.error('Notify handler error:', error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
