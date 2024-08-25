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
          <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav>
              <Link
                href="/"
                className="flex items-center justify-center space-x-2 transition-colors hover:text-orange-400"
              >
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <House className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </div>
                <div>Home</div>
              </Link>
            </nav>
          </header>
          <div className="flex flex-1 items-center justify-center pt-16">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
