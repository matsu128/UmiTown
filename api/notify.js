export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        to: process.env.VITE_LINE_USER_ID,
        messages: [{
          type: 'text',
          text: req.body.message
        }]
      })
    })

    if (!response.ok) throw new Error('LINE送信エラー')

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('LINE error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 