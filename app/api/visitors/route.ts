import { NextResponse, NextRequest } from 'next/server'
import { query } from '@/lib/db'

export interface Visitor {
  id: number
  ipAddress: string
  country?: string
  userAgent?: string
  timestamp: string
  visitCount: number
  lastVisit: string
}

export async function GET(request: NextRequest) {
  try {
    // Get visitor info
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip')
    const userAgent = request.headers.get('user-agent')
    
    // Get country from IP (using freegeoip.app)
    let country = 'Unknown'
    if (ip) {
      try {
        const geoResponse = await fetch(`https://freegeoip.app/json/${ip}`)
        const geoData = await geoResponse.json()
        country = geoData.country_name || 'Unknown'
      } catch (error) {
        console.error('Error getting country:', error)
      }
    }

    // Check if visitor exists
    const existingVisitor = await query(
      `SELECT * FROM visitors WHERE ip_address = $1`,
      [ip]
    )

    if (existingVisitor.rows.length > 0) {
      // Update existing visitor
      await query(
        `UPDATE visitors SET 
          visit_count = visit_count + 1,
          last_visit = NOW()
        WHERE ip_address = $1`,
        [ip]
      )
    } else {
      // Add new visitor
      await query(
        `INSERT INTO visitors (
          ip_address, country, user_agent, timestamp, visit_count, last_visit
        ) VALUES ($1, $2, $3, NOW(), 1, NOW())`,
        [ip || 'Unknown', country, userAgent || 'Unknown']
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track visitor' },
      { status: 500 }
    )
  }
}
