import { connectToDatabase } from '@/db/mssql'
import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY)

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    const { payload } = await jwtVerify(token, SECRET_KEY!)
    const email = payload.email as string

    // 데이터베이스 연결 및 이메일 검증
    const db = await connectToDatabase()
    const result = await db
      .request()
      .input('email', email)
      .query('SELECT id FROM users WHERE email = @email')

    if (result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
