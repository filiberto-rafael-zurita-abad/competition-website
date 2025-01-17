import { NextResponse, NextRequest } from 'next/server'
import { query } from '@/lib/db'

export interface Submission {
  id: number
  nickname: string
  email: string
  description: string
  github?: string
  youtube?: string
  submissionNumber: number
  ipAddress?: string
  userAgent?: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Get IP and user agent
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip')
    const userAgent = request.headers.get('user-agent')

    // Insert new submission
    await query(
      `INSERT INTO submissions (
        nickname, email, description, github, youtube, 
        submission_number, ip_address, user_agent, timestamp
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [
        data.nickname,
        data.email,
        data.description,
        data.github,
        data.youtube,
        data.submissionNumber,
        ip,
        userAgent
      ]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save submission' },
      { status: 500 }
    )
  }
}
