import type { Metadata } from 'next'
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
      <body className="flex h-screen items-center justify-center">{children}</body>
    </html>
  )
}
