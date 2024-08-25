'use client'

import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type DialogControl = {
  isSuccess: boolean | null
  title: string
  description: string
  buttonMessage: string
}

export default function LoginForm() {
  const [dialogControl, setDialogControl] =
    useState<DialogControl>(initialValue)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // 성공 처리
        const successDialogControl: DialogControl = {
          isSuccess: true,
          title: '가입을 성공했어요! 🚀',
          description: '로그인 페이지로 이동하실래요?',
          buttonMessage: '네, 이동할게요.',
        }
        setDialogControl(successDialogControl)
        console.log('User registered successfully')
      } else {
        // 에러 처리
        const successDialogControl: DialogControl = {
          isSuccess: false,
          title: '가입을 못 했어요! 🥹',
          description: '다른 이메일을 사용해 주세요!',
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

  const handleAction = () => {
    if (dialogControl.isSuccess) {
      router.push('/signin')
    } else {
      setDialogControl(initialValue)
    }
  }

  return (
    <>
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-xl">회원가입</CardTitle>
          <CardDescription>가입을 위한 정보를 입력해 주세요!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">이름</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    {...register('firstName', {
                      required: '이름을 입력하세요',
                    })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">성</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    {...register('lastName', { required: '성을 입력하세요' })}
                  />
                  {errors.lastName && (
                    <span className="text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email', {
                    required: '이메일을 입력하세요',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '유효한 이메일 주소를 입력하세요',
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">비밀번호</Label>
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
                {loading ? <Loader /> : '이메일 만들기'}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            이미 이메일이 있으신가요?{' '}
            <Link
              href="signin"
              className="underline"
            >
              로그인
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
