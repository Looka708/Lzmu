'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered' },
    { value: 30, suffix: '+', label: 'Happy Clients' },
    { value: 5, suffix: '+', label: 'Years Experience' },
]

function useCountUp(target: number, trigger: boolean, duration = 1800) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!trigger) return
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(start))
        }, 16)
        return () => clearInterval(timer)
    }, [trigger, target, duration])
    return count
}

function StatCounter({ value, suffix, label, trigger }: { value: number; suffix: string; label: string; trigger: boolean }) {
    const count = useCountUp(value, trigger)
    return (
        <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold display-font text-white">
                {count}{suffix}
            </div>
            <div className="text-sm text-zinc-400 mt-1 font-medium">{label}</div>
        </div>
    )
}

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null)
    const [counted, setCounted] = useState(false)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            if (!sectionRef.current) return
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            ctx = gsap.context(() => {
                gsap.fromTo('.cta-section',
                    { scale: 0.96, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 1, ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '.cta-section', start: 'top 80%',
                            onEnter: () => setCounted(true),
                        }
                    }
                )
                gsap.to('.cta-orbit-ring', { rotation: 360, duration: 20, repeat: -1, ease: 'linear', stagger: 2 })
                ScrollTrigger.refresh()
            }, sectionRef)
        }
        init()
        return () => { ctx?.revert() }
    }, [])

    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto px-6 mb-20">
            {/* Live stats bar */}
            <div className="bg-zinc-900 rounded-[30px] border border-zinc-900 card-shadow p-6 lg:p-8 mb-6 grid md:grid-cols-3 gap-8 md:gap-4 md:divide-x divide-zinc-700">
                {stats.map((s) => (
                    <StatCounter key={s.label} {...s} trigger={counted} />
                ))}
            </div>

            {/* Main CTA card */}
            <div
                className="bg-zinc-100 rounded-[40px] p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between cta-section transition-all duration-500"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Animated background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#B9FF66]/20 to-transparent rounded-[40px] transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Text */}
                <div className="max-w-lg z-10">
                    <h3 className="text-3xl lg:text-4xl font-medium tracking-tight mb-6 display-font">
                        Let&apos;s build something great together
                    </h3>
                    <p className="text-lg text-zinc-600 mb-8">
                        Connect with the Lzmu team today. Whether you have a full
                        product vision or just an idea — we&apos;ll help you shape and ship it.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/quote"
                            className={`group bg-zinc-900 text-white text-lg px-8 py-4 rounded-xl transition-all flex items-center gap-2 ${hovered ? 'bg-zinc-800' : ''}`}
                        >
                            Get your free proposal
                            <span className={`transition-transform duration-300 inline-block ${hovered ? 'translate-x-1' : ''}`}>→</span>
                        </Link>
                        <Link href="/portfolio" className="border border-zinc-400 text-zinc-700 text-lg px-8 py-4 rounded-xl hover:border-zinc-900 transition-all">
                            See our work
                        </Link>
                    </div>
                </div>

                {/* Illustration */}
                <div className="relative w-72 h-72 mt-10 lg:mt-0 hidden md:block">
                    <div className="absolute top-0 right-10 w-20 h-20 text-black opacity-30">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-full h-full">
                            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                        </svg>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className={`relative w-28 h-28 bg-black rounded-full flex items-center justify-center gap-3 transition-transform duration-500 ${hovered ? 'scale-110' : ''}`}>
                            <div className="w-2.5 h-7 bg-white rounded-full" />
                            <div className="w-2.5 h-7 bg-white rounded-full" />
                        </div>
                        <div className="cta-orbit-ring absolute inset-0 border border-zinc-400 rounded-full scale-150 rotate-12 opacity-50" />
                        <div className="cta-orbit-ring absolute inset-0 border border-zinc-400 rounded-full scale-[1.8] -rotate-6 opacity-40" />
                    </div>
                    <div className={`absolute bottom-0 left-8 text-[#B9FF66] transition-transform duration-500 ${hovered ? 'scale-110 rotate-12' : ''}`}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}
