import { connectToDatabase } from '@/db/mssql'
import { NextRequest, NextResponse } from 'next/server'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function GET(req: NextRequest) {
  try {
    // MSSQL 데이터베이스 연결
    const db = await connectToDatabase()

    // 쿼리 실행
    const result = await db.request().query<User>('SELECT * FROM users')

    // JSON 응답 반환
    return NextResponse.json(result.recordset)
  } catch (error) {
    console.error('Database query failed: ', error)

    // 오류 응답 반환
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password }: User = await req.json()

    // 데이터 검증
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const db = await connectToDatabase()

    // SQL 인젝션 방지를 위해 파라미터화된 쿼리 사용
    const result = await db
      .request()
      .input('firstName', firstName)
      .input('lastName', lastName)
      .input('email', email)
      .input('password', password).query(`
        INSERT INTO users (firstName, lastName, email, password)
        VALUES (@firstName, @lastName, @email, @password);
      `)

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Database insertion failed: ', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
