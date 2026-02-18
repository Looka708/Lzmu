'use client'

import { useEffect, useRef, useState } from 'react'
import { Code2, Smartphone, Globe, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const techStack = ['React', 'Next.js', 'Flutter', 'Node.js', 'AWS', 'TypeScript']

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const [activeTech, setActiveTech] = useState<string | null>(null)
    const [typedText, setTypedText] = useState('')
    const [wordIndex, setWordIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    const words = ['web apps.', 'mobile apps.', 'APIs.', 'SaaS products.', 'your vision.']

    // Typewriter effect
    useEffect(() => {
        const current = words[wordIndex]
        let timeout: ReturnType<typeof setTimeout>

        if (!isDeleting) {
            if (typedText.length < current.length) {
                timeout = setTimeout(() => setTypedText(current.slice(0, typedText.length + 1)), 80)
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 1800)
            }
        } else {
            if (typedText.length > 0) {
                timeout = setTimeout(() => setTypedText(current.slice(0, typedText.length - 1)), 45)
            } else {
                setIsDeleting(false)
                setWordIndex((i) => (i + 1) % words.length)
            }
        }
        return () => clearTimeout(timeout)
    }, [typedText, isDeleting, wordIndex])


    // GSAP animations
    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            if (!sectionRef.current) return
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            ctx = gsap.context(() => {
                gsap.fromTo('.hero-content > *',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
                )
                gsap.fromTo('.hero-illustration',
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
                )
                gsap.to('.hero-icon-float', {
                    y: -15, duration: 2, repeat: -1, yoyo: true,
                    ease: 'sine.inOut', stagger: { each: 0.3, from: 'random' },
                })
                // Parallax on scroll
                gsap.to('.hero-illustration', {
                    y: -60,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
                })
            }, sectionRef)
        }
        init()
        return () => { ctx?.revert() }
    }, [])

    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left */}
                <div className="max-w-xl hero-content">
                    <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-full px-4 py-2 mb-6 text-sm font-medium text-zinc-600">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Available for new projects
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-4 display-font">
                        We build
                        <br />
                        <span className="bg-[#B9FF66] px-2 rounded-md inline-block min-w-[240px]">
                            {typedText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h1>

                    <p className="text-xl text-zinc-600 mb-8 leading-relaxed">
                        Lzmu is a premier software house delivering custom web apps, mobile solutions,
                        UI/UX design, and cloud infrastructure — engineered for scale and built to last.
                    </p>

                    {/* Tech stack pills — interactive */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {techStack.map((tech) => (
                            <button
                                key={tech}
                                onMouseEnter={() => setActiveTech(tech)}
                                onMouseLeave={() => setActiveTech(null)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${activeTech === tech
                                    ? 'bg-zinc-900 text-[#B9FF66] border-zinc-900 scale-110'
                                    : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-900'
                                    }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/quote"
                            className="group bg-zinc-900 text-white text-lg px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2"
                        >
                            Start a Project
                            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                        </Link>
                        <Link
                            href="/portfolio"
                            className="border border-zinc-300 text-zinc-900 text-lg px-8 py-4 rounded-xl hover:border-zinc-900 transition-all"
                        >
                            View Work
                        </Link>
                    </div>
                </div>

                {/* Right: Illustration */}
                <div className="relative w-full h-[420px] lg:h-[520px] items-center justify-center hidden md:flex hero-illustration">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Rings */}
                        <div className="absolute w-[80%] h-[60%] border border-black rounded-[100%] rotate-12 opacity-20" />
                        <div className="absolute w-[90%] h-[70%] border border-black rounded-[100%] -rotate-6 opacity-20" />

                        {/* Floating icons */}
                        <div className="absolute top-4 right-16 bg-black text-[#B9FF66] p-3 rounded-full hero-icon-float cursor-pointer hover:scale-125 transition-transform">
                            <Code2 className="w-6 h-6" />
                        </div>
                        <div className="absolute top-16 right-2 bg-[#B9FF66] text-black p-3 rounded-full hero-icon-float cursor-pointer hover:scale-125 transition-transform">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div className="absolute bottom-24 right-12 bg-[#B9FF66] text-black p-4 rounded-full border border-black hero-icon-float cursor-pointer hover:scale-125 transition-transform">
                            <Globe className="w-6 h-6" />
                        </div>

                        {/* Monitor */}
                        <div className="relative z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500 group cursor-pointer">
                            <div className="w-72 h-48 bg-zinc-900 border-2 border-black rounded-2xl relative overflow-hidden flex flex-col p-3 gap-2 group-hover:border-[#B9FF66] transition-colors duration-300">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                    <div className="flex-1 bg-zinc-700 rounded h-2.5 ml-2" />
                                </div>
                                <div className="w-3/4 h-2 bg-[#B9FF66] rounded opacity-80" />
                                <div className="w-1/2 h-2 bg-zinc-600 rounded" />
                                <div className="w-5/6 h-2 bg-zinc-600 rounded" />
                                <div className="w-2/3 h-2 bg-blue-400 rounded opacity-70" />
                                <div className="w-3/4 h-2 bg-zinc-600 rounded" />
                                <div className="w-1/3 h-2 bg-[#B9FF66] rounded opacity-60" />
                                <div className="w-4/5 h-2 bg-zinc-600 rounded" />
                                {/* Typing cursor blink */}
                                <div className="w-2 h-3 bg-[#B9FF66] animate-pulse rounded-sm" />
                            </div>
                            <div className="mx-auto w-12 h-5 bg-zinc-300 border border-zinc-400 rounded-b-lg" />
                            <div className="mx-auto w-20 h-2 bg-zinc-400 rounded-full" />
                            {/* Tooltip on hover */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-[#B9FF66] text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                Built with Next.js ⚡
                            </div>
                        </div>

                        {/* Star */}
                        <div className="absolute bottom-10 left-10 animate-spin" style={{ animationDuration: '12s' }}>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-black">
                                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
