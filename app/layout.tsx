import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    weight: ['300', '400', '500', '600'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Lzmu — Software House',
    description:
        'Lzmu is a premier software house helping businesses grow through custom software development, web & mobile apps, UI/UX design, and cloud solutions.',
    icons: {
        icon: '/icon.svg',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <body className="bg-white text-zinc-900 antialiased selection:bg-[#B9FF66] selection:text-black">
                {children}
            </body>
        </html>
    )
}
