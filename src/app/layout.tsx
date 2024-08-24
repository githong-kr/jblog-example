import { House } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'J-Blog Example',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                href="/"
                className="flex items-center justify-center space-x-2 transition-colors hover:text-orange-400"
              >
                <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
                  <House className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </div>
                <div>Home</div>
              </Link>
            </nav>
          </header>
          <div className="flex h-screen items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
