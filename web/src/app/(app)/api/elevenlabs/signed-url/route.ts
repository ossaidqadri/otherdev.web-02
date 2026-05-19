import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const agentId = searchParams.get('agent_id')

  if (!agentId) {
    return NextResponse.json({ error: 'agent_id is required' }, { status: 400 })
  }

  const client = new ElevenLabsClient()

  try {
    const { signed_url } = await client.conversationalAi.conversations.getSignedUrl({
      agent_id: agentId,
      environment: process.env.ELEVENLABS_ENVIRONMENT ?? 'production',
    })

    return NextResponse.json({ signed_url })
  } catch (error) {
    console.error('Failed to get signed URL:', error)
    return NextResponse.json({ error: 'Failed to get signed URL' }, { status: 500 })
  }
}
