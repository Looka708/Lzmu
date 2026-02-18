'use client'

import { useEffect, useRef, useState } from 'react'
import {
    Globe, Smartphone, Layout, Code2, Cloud, ShieldCheck, ArrowUpRight,
} from 'lucide-react'

const services = [
    { id: 1, bg: 'bg-zinc-100', titleBg: 'bg-[#B9FF66]', iconBg: 'bg-black text-[#B9FF66]', arrowBg: 'bg-black', arrowColor: 'text-[#B9FF66]', dark: false, icon: Globe, title: ['Web App', 'Development'], desc: 'Custom React & Next.js apps built for speed, scale, and SEO.' },
    { id: 2, bg: 'bg-[#B9FF66]', titleBg: 'bg-white', iconBg: 'bg-black text-[#B9FF66]', arrowBg: 'bg-black', arrowColor: 'text-[#B9FF66]', dark: false, icon: Smartphone, title: ['Mobile App', 'Development'], desc: 'Cross-platform iOS & Android apps with Flutter and React Native.' },
    { id: 3, bg: 'bg-zinc-900', titleBg: 'bg-white', iconBg: 'bg-[#B9FF66] text-black', arrowBg: 'bg-white', arrowColor: 'text-black', dark: true, icon: Layout, title: ['UI/UX', 'Design'], desc: 'User-centred design systems that convert visitors into customers.' },
    { id: 4, bg: 'bg-zinc-100', titleBg: 'bg-[#B9FF66]', iconBg: 'bg-black text-[#B9FF66]', arrowBg: 'bg-black', arrowColor: 'text-[#B9FF66]', dark: false, icon: Code2, title: ['Backend &', 'API Development'], desc: 'Scalable Node.js, Go & Python APIs powering your product.' },
    { id: 5, bg: 'bg-[#B9FF66]', titleBg: 'bg-white', iconBg: 'bg-black text-[#B9FF66]', arrowBg: 'bg-black', arrowColor: 'text-[#B9FF66]', dark: false, icon: Cloud, title: ['Cloud &', 'DevOps'], desc: 'AWS, GCP, Docker & Kubernetes — infrastructure that scales.' },
    { id: 6, bg: 'bg-zinc-900', titleBg: 'bg-[#B9FF66]', iconBg: 'bg-[#B9FF66] text-black', arrowBg: 'bg-white', arrowColor: 'text-black', dark: true, icon: ShieldCheck, title: ['QA &', 'Testing'], desc: 'Automated & manual testing so you ship with confidence.' },
]

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null)
    const [activeCard, setActiveCard] = useState<number | null>(null)

    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            if (!sectionRef.current) return
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            ctx = gsap.context(() => {
                gsap.fromTo('.services-grid > div',
                    { y: 60, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                        scrollTrigger: { trigger: '.services-grid', start: 'top 85%' }
                    }
                )
                ScrollTrigger.refresh()
            }, sectionRef)
        }
        init()
        return () => { ctx?.revert() }
    }, [])

    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mb-16">
                <h2 className="bg-[#B9FF66] px-2 rounded-md text-4xl font-medium tracking-tight inline-block display-font">
                    Services
                </h2>
                <p className="max-w-2xl text-lg text-zinc-600">
                    At Lzmu, we deliver end-to-end software solutions tailored to your business needs.
                    From concept to deployment, we&apos;ve got you covered:
                </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-8 services-grid">
                {services.map((s) => (
                    <div
                        key={s.id}
                        className={`${s.bg} p-6 md:p-10 rounded-[40px] border border-zinc-900 card-shadow flex flex-col justify-between min-h-[300px] cursor-pointer transition-all duration-300 ${activeCard === s.id ? 'scale-[1.03] shadow-2xl' : 'hover:scale-[1.01]'
                            }`}
                        onMouseEnter={() => setActiveCard(s.id)}
                        onMouseLeave={() => setActiveCard(null)}
                    >
                        <div className="flex justify-between items-start">
                            {/* Title */}
                            <div className="space-y-1">
                                {s.title.map((line) => (
                                    <span key={line} className={`${s.titleBg} px-2 text-2xl lg:text-3xl font-medium rounded block w-fit display-font`}>
                                        {line}
                                    </span>
                                ))}
                            </div>

                            {/* Icon — spins on hover */}
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 ${activeCard === s.id ? 'rotate-[360deg]' : ''
                                } ${s.iconBg}`}>
                                <s.icon className="w-8 h-8" />
                            </div>
                        </div>

                        {/* Description — slides in on hover */}
                        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${activeCard === s.id ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'
                            }`}>
                            <p className={`text-sm leading-relaxed ${s.dark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                {s.desc}
                            </p>
                        </div>

                        {/* Learn More */}
                        <div className="mt-8 flex items-center gap-4 group">
                            <div className={`${s.arrowBg} ${s.arrowColor} rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-300 ${activeCard === s.id ? 'rotate-45 scale-110' : ''
                                }`}>
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                            <span className={`text-xl font-medium ${s.dark ? 'text-white' : 'text-zinc-900'} transition-all duration-300 ${activeCard === s.id ? 'translate-x-1' : ''
                                }`}>
                                Learn more
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
