import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginForm() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
          로그인 하시려면 이메일을 입력해 주세요!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-10">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">비밀번호</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                이메일을 잃어버리셨나요?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            로그인
          </Button>
        </div>
        <div className="mt-4 text-center 
        text-sm">
          아이디가 없으신가요?{'   '}
          <Link
            href="signup"
            className="underline"
          >
            회원가입
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
