// api/send-newsletter.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID) : null
  const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET

  if (!BREVO_API_KEY || !BREVO_LIST_ID) {
    return res.status(500).json({ error: 'Mail server misconfiguration (API Key or List ID missing)' })
  }

  // Protect with secret key so only you can trigger it
  if (!NEWSLETTER_SECRET || req.headers['x-secret-key'] !== NEWSLETTER_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { postTitle, postSlug, postExcerpt, postCategory, postReadTime } = req.body

  if (!postTitle || !postSlug) {
    return res.status(400).json({ error: 'postTitle and postSlug are required fields' })
  }

  const siteUrl = process.env.VITE_SITE_URL || 'https://adithyaai.is-cool.dev'
  const postUrl = `${siteUrl}/blog/${postSlug}`

  try {
    // Get all contacts from list to verify subscriber list size
    const contactsRes = await fetch(
      `https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID}/contacts?limit=500`,
      {
        headers: { 
          'Accept': 'application/json',
          'api-key': BREVO_API_KEY 
        }
      }
    )
    
    let subscriberCount = 0
    if (contactsRes.ok) {
      const contacts = await contactsRes.json()
      subscriberCount = contacts.contacts ? contacts.contacts.length : 0
    }

    // Send campaign email
    const campaignRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        name: `New Post — ${postTitle}`,
        subject: `New on Adithya AI Hub: ${postTitle}`,
        sender: { name: 'Adithya | AI Hub', email: 'adithyaadhi0805@gmail.com' },
        type: 'classic',
        htmlContent: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#f0f0f0;padding:40px;border-radius:16px;">
            <p style="color:#00d4ff;font-size:12px;letter-spacing:2px;margin:0 0 10px 0;">NEW POST · ADITHYA AI HUB</p>
            <h1 style="font-size:24px;margin:16px 0;color:#ffffff;">${postTitle}</h1>
            <p style="color:#8888aa;font-size:13px;margin:0 0 20px 0;">${postCategory || 'AI & Machine Learning'} · ${postReadTime || '5 min read'}</p>
            <p style="color:#ccccdd;font-size:15px;line-height:1.7;margin:0 0 24px 0;">${postExcerpt || 'Read my latest article on Adithya AI Hub!'}</p>
            <a href="${postUrl}"
               style="display:inline-block;background:linear-gradient(90deg,#00d4ff,#7c3aed);color:#ffffff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;margin:0 0 24px 0;">
              Read Full Article →
            </a>
            <hr style="border-color:#222233;margin:32px 0;">
            <p style="color:#555566;font-size:12px;margin:0;">
              You received this because you subscribed at <a href="${siteUrl}" style="color:#00d4ff;text-decoration:none;">adithyaai.is-cool.dev</a>.<br>
              <a href="{{unsubscribeUrl}}" style="color:#555566;">Unsubscribe</a>
            </p>
          </div>
        `,
        recipients: { listIds: [BREVO_LIST_ID] },
        // Schedule to run 1 minute from now to ensure list updates and avoid any race conditions
        scheduledAt: new Date(Date.now() + 60 * 1000).toISOString()
      })
    })

    const campaign = await campaignRes.json()

    if (!campaignRes.ok) {
      console.error('Brevo campaign creation error:', campaign)
      return res.status(500).json({ error: campaign.message || 'Failed to create and schedule campaign.' })
    }

    return res.status(200).json({
      success: true,
      campaignId: campaign.id,
      message: `Newsletter campaign successfully scheduled. Reaching ~${subscriberCount} subscriber(s).`
    })

  } catch (error) {
    console.error('Newsletter sending catch error:', error)
    return res.status(500).json({ error: 'Failed to process newsletter campaign' })
  }
}
