'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const navLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Get a Quote', href: '/quote' },
]

export default function Footer() {
    return (
        <footer className="bg-zinc-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#B9FF66]">
                                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                            </svg>
                            <span className="text-2xl font-semibold tracking-tight display-font">Lzmu</span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            A premier software house delivering custom web, mobile, and cloud solutions.
                            Led by an expert team of developers and designers.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-zinc-400 hover:text-[#B9FF66] transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-zinc-400 hover:text-[#B9FF66] transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-zinc-400 hover:text-[#B9FF66] transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">Navigation</h4>
                        <ul className="space-y-3">
                            {navLinks.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-zinc-300 hover:text-[#B9FF66] transition-colors text-sm">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">Services</h4>
                        <ul className="space-y-3 text-sm text-zinc-300">
                            {['Web App Development', 'Mobile Apps', 'UI/UX Design', 'Backend & APIs', 'Cloud & DevOps', 'QA & Testing'].map((s) => (
                                <li key={s}><Link href="/services" className="hover:text-[#B9FF66] transition-colors">{s}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-4">Contact</h4>
                        <ul className="space-y-4 text-sm text-zinc-300">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-[#B9FF66] mt-0.5 shrink-0" />
                                <span>hello@lzmu.dev</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-[#B9FF66] mt-0.5 shrink-0" />
                                <a href="tel:+923084970534" className="hover:text-[#B9FF66] transition-colors">+92 308 4970534</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#B9FF66] mt-0.5 shrink-0" />
                                <span>Lahore, Pakistan</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                    <p>© {new Date().getFullYear()} Lzmu Software House. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
