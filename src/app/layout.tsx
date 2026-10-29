import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Partora - Genuine Spare Parts Online',
  description: 'Buy genuine OEM and aftermarket spare parts with fast delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}