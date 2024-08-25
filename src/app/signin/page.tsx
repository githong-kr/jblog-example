'use client'

import { CustomDialog } from '@/components/custom/dialog'
import Loader from '@/components/custom/loader'
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
import { initialValue } from '@/lib/iv'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DialogControl } from '../signup/page'

type FormValues = {
  email: string
  password: string
}

export default function LoginForm() {
  const [dialogControl, setDialogControl] =
    useState<DialogControl>(initialValue)
  const [loading, setLoading] = useState(false)
  // const [signinSeccess, setSigninSuccess] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    // setSigninSuccess(false)
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        // 로그인 성공 시, 비밀 페이지로 리다이렉트
        // setSigninSuccess(true)
        router.push('/secret')
      } else {
        // 에러 처리
        const successDialogControl: DialogControl = {
          isSuccess: false,
          title: '로그인을 못 했어요! 🥹',
          description: '이메일이나 비밀번호를 확인해 주세요.',
          buttonMessage: '네, 알겠어요.',
        }
        setDialogControl(successDialogControl)
        console.error('User registration failed')
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error)
    }
    setLoading(false)
  }

  // useEffect(() => {
  //   if (signinSeccess) {
  //     router.push('/secret') // 로그인 성공 시 리다이렉트
  //   }
  // }, [signinSeccess, router])

  const handleAction = () => {
    setDialogControl(initialValue)
  }

  return (
    <>
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>
            로그인 하시려면 이메일을 입력해 주세요!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-10">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email', { required: '이메일을 입력하세요' })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <div>
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: '비밀번호를 입력하세요',
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full"
              >
                {loading ? <Loader /> : '로그인'}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            아이디가 없으신가요?{' '}
            <Link
              href="signup"
              className="underline"
            >
              회원가입
            </Link>
          </div>
        </CardContent>
      </Card>
      <CustomDialog
        dialogControl={dialogControl}
        handleAction={handleAction}
      />
    </>
  )
}
