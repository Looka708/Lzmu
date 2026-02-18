'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

const navLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
]

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mobileOpen) {
            document.body.style.overflow = 'unset'
            return
        }

        document.body.style.overflow = 'hidden'
        let ctx: any
        const init = async () => {
            if (!menuRef.current) return
            const { gsap } = await import('gsap')
            ctx = gsap.context(() => {
                const tl = gsap.timeline()
                tl.fromTo('.mobile-nav-link',
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
                )
                tl.fromTo('.mobile-menu-footer',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
                    '-=0.3'
                )
            }, menuRef)
        }

        init()
        return () => {
            ctx?.revert()
            document.body.style.overflow = 'unset'
        }
    }, [mobileOpen])

    return (
        <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <div className="relative w-7 h-7">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                </div>
                <span className="text-3xl font-semibold tracking-tight display-font">Lzmu</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10 text-lg font-normal text-zinc-600">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`transition-colors flex items-center h-8 ${pathname === link.href ? 'text-black font-medium' : 'text-zinc-600 hover:text-black'}`}
                    >
                        <span className="flip-link">
                            <span className="flip-link-inner">
                                <span className="flip-link-text">{link.label}</span>
                                <span className="flip-link-text">{link.label}</span>
                            </span>
                        </span>
                    </Link>
                ))}
                <Link
                    href="/quote"
                    className={`border rounded-xl px-6 py-3 transition-all flex items-center gap-2 overflow-hidden ${pathname === '/quote' ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-300 text-black hover:bg-zinc-900 hover:text-white'}`}
                >
                    <span className="flip-link">
                        <span className="flip-link-inner">
                            <span className="flip-link-text">Get a Quote</span>
                            <span className="flip-link-text">Get a Quote</span>
                        </span>
                    </span>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
            >
                {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div ref={menuRef} className="fixed inset-0 bg-white z-[999] flex flex-col px-6 py-8 lg:hidden animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-12 mobile-menu-header relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
                                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                                </svg>
                            </div>
                            <span className="text-3xl font-semibold tracking-tight display-font text-black">Lzmu</span>
                        </div>
                        <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="relative z-20">
                            <X className="w-8 h-8 text-black" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-8 relative z-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`mobile-nav-link text-4xl font-medium display-font tracking-tight block ${pathname === link.href ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pb-10 mobile-menu-footer relative z-10">
                        <Link
                            href="/quote"
                            className="w-full bg-zinc-900 text-white rounded-2xl py-5 text-center font-bold text-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors pointer-events-auto"
                            onClick={() => setMobileOpen(false)}
                        >
                            Get a Quote <ArrowUpRight className="w-5 h-5" />
                        </Link>
                        <div className="mt-8 flex flex-col items-center gap-2 text-zinc-500 font-medium text-sm">
                            <span>hello@lzmu.dev</span>
                            <span>+92 308 4970534</span>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
