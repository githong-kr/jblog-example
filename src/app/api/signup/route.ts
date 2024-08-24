import { connectToDatabase } from '@/db/mssql'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json()

    // 데이터 검증
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    const db = await connectToDatabase()

    // 이메일 중복 체크
    const userCheck = await db
      .request()
      .input('email', email)
      .query('SELECT id FROM users WHERE email = @email')

    if (userCheck.recordset.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email already in use' },
        { status: 409 }
      )
    }

    // 사용자 정보 데이터베이스에 저장
    await db
      .request()
      .input('firstName', firstName)
      .input('lastName', lastName)
      .input('email', email)
      .input('password', password).query(`
        INSERT INTO users (firstName, lastName, email, password)
        VALUES (@firstName, @lastName, @email, @password)
      `)

    return NextResponse.json(
      { success: true, message: 'User registered successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup failed:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
