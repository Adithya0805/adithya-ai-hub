import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.error('Missing BREVO_API_KEY environment variable');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true, // Update if the contact already exists
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Brevo API error:', data);
      
      // If contact already exists (though updateEnabled should handle this, just in case)
      if (data.code === 'duplicate_parameter') {
        return res.status(200).json({ message: 'Already subscribed' });
      }

      throw new Error('Failed to subscribe');
    }

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
