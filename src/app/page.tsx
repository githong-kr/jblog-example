'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { TooltipArrow, TooltipTrigger } from '@radix-ui/react-tooltip'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isHovered, setIsHovered] = useState(true)

  const handleMouseEnter = () => {
    setIsHovered(false)
  }

  const handleMouseLeave = () => {
    setIsHovered(true)
  }
  return (
    <div className="flex flex-col space-y-10">
      <TooltipProvider>
        <Tooltip open={isHovered}>
          <TooltipTrigger asChild>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="rounded-lg bg-white p-3 text-5xl font-bold text-orange-400 transition-all duration-500 hover:bg-orange-400 hover:text-white hover:ring-2 hover:ring-orange-400 hover:ring-offset-4"
            >
              Hello World
            </div>
          </TooltipTrigger>
          <TooltipContent sideOffset={50}>
            터치해 보세요!
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center justify-center">
        <Button variant={'link'}>
          <Link
            href={'/secret'}
            className="text-xl"
          >
            Get Secret
          </Link>
        </Button>
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
