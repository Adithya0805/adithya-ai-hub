// api/send-newsletter.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

// Helper to find the audience list automatically
async function getAudienceId(apiKey: string): Promise<string | null> {
  const listRes = await fetch('https://api.resend.com/audiences', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })

  if (!listRes.ok) {
    throw new Error('Failed to fetch Resend audiences')
  }

  const listData = await listRes.json()
  const existing = listData.data?.find((aud: any) => aud.name === 'AI Hub Subscribers')
  return existing ? existing.id : null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Mail server misconfiguration (RESEND_API_KEY missing)' })
  }

  // Protect with secret key
  if (!NEWSLETTER_SECRET || req.headers['x-secret-key'] !== NEWSLETTER_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { postTitle, postSlug, postExcerpt, postCategory, postReadTime } = req.body

  if (!postTitle || !postSlug) {
    return res.status(400).json({ error: 'postTitle and postSlug are required fields' })
  }

  const siteUrl = process.env.VITE_SITE_URL || 'https://adithyaai.is-cool.dev'
  const postUrl = `${siteUrl}/blog/${postSlug}`
  const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Adithya | AI Hub <onboarding@resend.dev>'

  try {
    // Step 1 — Locate the audience ID
    const audienceId = await getAudienceId(RESEND_API_KEY)

    if (!audienceId) {
      return res.status(400).json({ 
        error: 'Audience list "AI Hub Subscribers" not found in your Resend account. Please let a user subscribe first to auto-create it!' 
      })
    }

    // Step 2 — Fetch all contacts in this audience
    const contactsRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`
      }
    })

    if (!contactsRes.ok) {
      const err = await contactsRes.json()
      return res.status(500).json({ error: `Failed to fetch contacts: ${err.message || JSON.stringify(err)}` })
    }

    const contactsData = await contactsRes.json()
    const activeSubscribers = contactsData.data?.filter((c: any) => !c.unsubscribed) || []

    if (activeSubscribers.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No active subscribers found in list. No emails sent.'
      })
    }

    // Extract all emails
    const bccEmails = activeSubscribers.map((c: any) => c.email)

    // Step 3 — Send the Newsletter Email to all subscribers in BCC
    const campaignRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: SENDER_EMAIL, // Addressed to you for safety, with subscribers in BCC
        bcc: bccEmails,
        subject: `New on Adithya AI Hub: ${postTitle}`,
        html: `
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
            </p>
          </div>
        `
      })
    })

    if (!campaignRes.ok) {
      const err = await campaignRes.json()
      return res.status(500).json({ error: `Resend newsletter campaign failed: ${err.message || JSON.stringify(err)}` })
    }

    const campaignData = await campaignRes.json()

    return res.status(200).json({
      success: true,
      emailId: campaignData.id,
      message: `Newsletter successfully sent to ${bccEmails.length} subscriber(s).`
    })

  } catch (error: any) {
    console.error('Resend newsletter catch error:', error)
    return res.status(500).json({ error: `Failed to process newsletter campaign: ${error.message || error}` })
  }
}
