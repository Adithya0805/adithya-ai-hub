import type { VercelRequest, VercelResponse } from '@vercel/node'
import notifyHandler from './notify'

// Alias handler so both /api/send-newsletter and /api/notify seamlessly work with Brevo
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return notifyHandler(req, res)
}
