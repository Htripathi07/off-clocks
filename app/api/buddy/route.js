import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req) {
  try {
    const { messages, system } = await req.json()
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system,
      messages,
    })
    return Response.json({ reply: response.content[0].text })
  } catch (err) {
    console.error('Buddy API error:', err)
    return Response.json({ reply: 'Yaar kuch technical issue aa gaya!' }, { status: 500 })
  }
}