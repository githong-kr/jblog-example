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
        <CardTitle className="text-xl">회원가입</CardTitle>
        <CardDescription>가입을 위한 정보를 입력해 주세요!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">이름</Label>
              <Input
                id="first-name"
                placeholder="Max"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">성</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                required
              />
            </div>
          </div>
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
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            이메일 만들기
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          이미 이메일이 있으신가요?{'   '}
          <Link
            href="signin"
            className="underline"
          >
            로그인
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
