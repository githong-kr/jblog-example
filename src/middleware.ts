import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_KEY)

export async function middleware(request: NextRequest) {
  const token = new TextEncoder().encode(
    request.cookies.get('auth-token')?.value
  )
  let isSigned = true

  // 토큰이 유효한지 확인하는 추가 로직을 넣을 수 있습니다.
  try {
    await jwtVerify(token, SECRET_KEY!)
  } catch {
    isSigned = false
  }

  if (isSigned) {
    return NextResponse.next()
  } else {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  // 토큰이 유효하면 요청을 그대로 진행
}

// 보호된 경로 설정
export const config = {
  matcher: ['/secret/:path*'],
}
