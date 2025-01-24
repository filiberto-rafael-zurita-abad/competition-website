import { NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();
    
    // Configure API settings based on selected model
    const apiUrl = model === 'reasoner' 
      ? 'https://api.deepseek.com/v1/chat/completions' 
      : 'https://api.deepseek.com/v1/chat/completions';
    const apiKey = model === 'reasoner'
      ? process.env.DEEPSEEK_REASONER_KEY
      : process.env.DEEPSEEK_API_KEY;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are Deepseek Reasoner, an expert AI assistant specialized in logical reasoning and problem solving. Provide detailed, step-by-step explanations.'
          },
          ...messages as ChatMessage[]
        ],
        temperature: 0.7,
        stream: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || 'API request failed' },
        { status: response.status }
      );
    }

    // Forward the stream directly to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
