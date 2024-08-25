'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SecretPage() {
  const router = useRouter()

  const buttonHandler = () => {
    router.push('/')
  }

  useEffect(() => {
    const canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!

    // 캔버스 크기 업데이트 함수
    const updateCanvasSize = () => {
      const navHeight = document.querySelector('header')?.clientHeight || 0
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight + navHeight
    }

    // 초기 캔버스 크기 설정 및 리사이즈 시 크기 업데이트
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%'
    const fontSize = 18
    const columns = canvas.width / fontSize
    const drops: number[] = Array(Math.floor(columns)).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0F0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval) // 컴포넌트 언마운트 시 애니메이션 정리
      window.removeEventListener('resize', updateCanvasSize) // 리스너 정리
    }
  }, [])

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <canvas
        id="matrixCanvas"
        className="absolute -top-16 left-0 block w-full"
      ></canvas>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <Card>
          <CardHeader className="gap-2">
            <CardTitle>비밀 페이지 😎</CardTitle>
            <CardDescription>
              이 페이지는 로그인된 사용자만 접근할 수 있어요 🎉🎉
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-end">
              <Button
                variant={'destructive'}
                onClick={buttonHandler}
              >
                메인 페이지로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
