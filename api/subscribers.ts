import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-secret-key')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secretKey = req.headers['x-secret-key']
  const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET

  if (NEWSLETTER_SECRET && secretKey !== NEWSLETTER_SECRET) {
    return res.status(401).json({ error: 'Unauthorized. Invalid x-secret-key.' })
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY
  const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '3')

  if (!BREVO_API_KEY) {
    return res.status(500).json({ error: 'BREVO_API_KEY is not configured in Vercel environment variables.' })
  }

  try {
    const response = await fetch(
      `https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID}/contacts?limit=50&offset=0&sort=desc`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        }
      }
    )

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      return res.status(response.status).json({
        error: err.message || 'Failed to fetch contacts from Brevo',
        details: err,
        listId: BREVO_LIST_ID
      })
    }

    const data = await response.json()
    return res.status(200).json({
      success: true,
      listId: BREVO_LIST_ID,
      count: data.count || 0,
      contacts: data.contacts || []
    })

  } catch (error: any) {
    console.error('Error fetching Brevo contacts:', error)
    return res.status(500).json({ error: error.message || 'Server error fetching subscribers' })
  }
}
