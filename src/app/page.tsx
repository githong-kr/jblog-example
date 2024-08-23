import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col space-y-10">
      <div className="select-none rounded-lg bg-white p-3 text-5xl font-bold text-orange-400 transition-all duration-500 hover:bg-orange-400 hover:text-white hover:ring-2 hover:ring-orange-400 hover:ring-offset-4">
        Hello World
      </div>
      <div className="flex items-center justify-center">
        <Button variant="link">
          <Link
            href={'/signin'}
            className="text-xl text-orange-400"
          >
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  )
}
