'use client'

import { useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
    Globe, Smartphone, Layout, Code2, Cloud, ShieldCheck,
    ArrowUpRight, CheckCircle2
} from 'lucide-react'

const services = [
    {
        icon: Globe,
        title: 'Web App Development',
        desc: 'From marketing sites to complex SaaS platforms — we build fast, scalable, and beautiful web applications using React, Next.js, and modern stacks.',
        features: ['Custom React / Next.js apps', 'REST & GraphQL APIs', 'SEO-optimized architecture', 'Performance & Core Web Vitals'],
        bg: 'bg-zinc-100',
        titleBg: 'bg-[#B9FF66]',
        iconBg: 'bg-black text-[#B9FF66]',
    },
    {
        icon: Smartphone,
        title: 'Mobile App Development',
        desc: 'Cross-platform and native mobile apps for iOS and Android, built with Flutter and React Native for maximum reach and performance.',
        features: ['Flutter & React Native', 'iOS & Android', 'Offline-first architecture', 'Push notifications & analytics'],
        bg: 'bg-[#B9FF66]',
        titleBg: 'bg-white',
        iconBg: 'bg-black text-[#B9FF66]',
    },
    {
        icon: Layout,
        title: 'UI/UX Design',
        desc: 'User-centered design that converts. We craft intuitive interfaces backed by research, prototyping, and rigorous usability testing.',
        features: ['User research & personas', 'Wireframing & prototyping', 'Design systems', 'Figma & interactive prototypes'],
        bg: 'bg-zinc-900',
        titleBg: 'bg-white',
        iconBg: 'bg-[#B9FF66] text-black',
    },
    {
        icon: Code2,
        title: 'Backend & API Development',
        desc: 'Robust, secure, and scalable server-side systems. We architect APIs and microservices that power your product at any scale.',
        features: ['Node.js, Go, Python', 'Microservices & REST/GraphQL', 'Database design (SQL & NoSQL)', 'Authentication & security'],
        bg: 'bg-zinc-100',
        titleBg: 'bg-[#B9FF66]',
        iconBg: 'bg-black text-[#B9FF66]',
    },
    {
        icon: Cloud,
        title: 'Cloud & DevOps',
        desc: 'Infrastructure that scales with you. We set up CI/CD pipelines, containerized deployments, and cloud-native architectures on AWS, GCP, and Azure.',
        features: ['AWS / GCP / Azure', 'Docker & Kubernetes', 'CI/CD pipelines', 'Monitoring & alerting'],
        bg: 'bg-[#B9FF66]',
        titleBg: 'bg-white',
        iconBg: 'bg-black text-[#B9FF66]',
    },
    {
        icon: ShieldCheck,
        title: 'QA & Testing',
        desc: 'Comprehensive quality assurance to ensure your product is bug-free, performant, and ready for production.',
        features: ['Manual & automated testing', 'Performance testing', 'Security audits', 'Regression & smoke testing'],
        bg: 'bg-zinc-900',
        titleBg: 'bg-[#B9FF66]',
        iconBg: 'bg-[#B9FF66] text-black',
    },
]

export default function ServicesPage() {
    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            ctx = gsap.context(() => {
                gsap.fromTo('.services-hero > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' })
                gsap.fromTo('.service-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.services-list', start: 'top 85%' } })
                document.querySelectorAll<HTMLElement>('.service-card').forEach((card) => {
                    card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power1.out' }))
                    card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' }))
                })
                ScrollTrigger.refresh()
            }, pageRef)
        }
        init()
        return () => { ctx?.revert() }
    }, [])

    return (
        <div ref={pageRef}>
            <Header />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="services-hero max-w-3xl">
                    <h1 className="text-6xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-8 display-font">
                        What we <span className="bg-[#B9FF66] px-2 rounded-md">build.</span>
                    </h1>
                    <p className="text-xl text-zinc-600 leading-relaxed">
                        End-to-end software services tailored to your business. From idea to deployment,
                        Lzmu covers every layer of the stack.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-2 gap-8 services-list">
                    {services.map((s) => (
                        <div key={s.title} className={`service-card ${s.bg} p-10 rounded-[40px] border border-zinc-900 card-shadow flex flex-col gap-6 cursor-pointer`}>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.iconBg}`}>
                                <s.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <span className={`${s.titleBg} px-2 text-2xl lg:text-3xl font-medium rounded display-font`}>{s.title}</span>
                            </div>
                            <p className={`text-lg leading-relaxed ${s.bg === 'bg-zinc-900' ? 'text-zinc-300' : 'text-zinc-600'}`}>{s.desc}</p>
                            <ul className="space-y-2">
                                {s.features.map((f) => (
                                    <li key={f} className={`flex items-center gap-2 text-sm font-medium ${s.bg === 'bg-zinc-900' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                                        <CheckCircle2 className="w-4 h-4 text-[#B9FF66] shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center gap-3 mt-auto group cursor-pointer">
                                <div className={`rounded-full w-10 h-10 flex items-center justify-center transform group-hover:rotate-45 transition-transform ${s.bg === 'bg-zinc-900' ? 'bg-white text-black' : 'bg-black text-[#B9FF66]'}`}>
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                                <span className={`font-medium ${s.bg === 'bg-zinc-900' ? 'text-white' : 'text-zinc-900'}`}>Learn more</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}
