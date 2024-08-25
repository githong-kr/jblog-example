import { connectToDatabase } from '@/db/mssql'
import { SignJWT } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

// JWT KEY
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // 데이터베이스 연결
    const db = await connectToDatabase()

    // 이메일로 사용자 조회
    const result = await db
      .request()
      .input('email', email)
      .query('SELECT id, email, password FROM users WHERE email = @email')

    const user = result.recordset[0]

    if (!user) {
      // 사용자가 존재하지 않을 경우
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // 비밀번호 검증
    const passwordMatch = password === user.password

    if (!passwordMatch) {
      // 비밀번호가 일치하지 않는 경우
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // 로그인 성공 시
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('5m')
      .sign(SECRET_KEY)
    const res = NextResponse.json({
      success: true,
      message: 'Login successful',
    })
    res.cookies.set('auth-token', token, { httpOnly: true })

    return res
  } catch (error) {
    console.error('Login failed:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
