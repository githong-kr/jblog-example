import { Button } from '@/components/ui/button'
import Link from 'next/link'

//TODO : 로그인이 완료되면 로그인 한 상태에서만 접근 가능한 페이지로 이동하기.
//TODO : 바로 접근하려고 하면 로그인이 필요한 화면이라고 알려주고 홈으로 이동하기.
export default function Home() {
  return (
    <div className="flex flex-col space-y-10">
      <div className="select-none rounded-lg bg-white p-3 text-5xl font-bold text-orange-400 transition-all duration-500 hover:bg-orange-400 hover:text-white hover:ring-2 hover:ring-orange-400 hover:ring-offset-4">
        Hello World
      </div>
      <div className="flex items-center justify-center">
        <Button variant={'link'}>
          <Link
            href={'/signin'}
            className="text-xl"
          >
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  )
}
