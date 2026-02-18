'use client'

import { useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Users, Target, Lightbulb, Award, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'

const team = [
    {
        name: 'Umer',
        role: 'CEO & Founder',
        bio: 'Visionary leader with 10+ years in software engineering. Passionate about building products that make a real difference.',
        initials: 'U',
        accent: 'bg-[#B9FF66] text-black',
    },
    {
        name: 'Sara Khan',
        role: 'CTO',
        bio: 'Full-stack architect specializing in scalable cloud systems and distributed microservices.',
        initials: 'SK',
        accent: 'bg-zinc-900 text-white',
    },
    {
        name: 'Ali Raza',
        role: 'Lead Designer',
        bio: 'Award-winning UI/UX designer crafting intuitive, pixel-perfect digital experiences.',
        initials: 'AR',
        accent: 'bg-[#B9FF66] text-black',
    },
    {
        name: 'Fatima Malik',
        role: 'Head of Engineering',
        bio: 'Backend specialist with deep expertise in Node.js, Go, and cloud-native architectures.',
        initials: 'FM',
        accent: 'bg-zinc-900 text-white',
    },
]

const values = [
    { icon: Target, title: 'Mission-Driven', desc: 'Every line of code we write serves a purpose — to solve real problems and create measurable impact for our clients.' },
    { icon: Lightbulb, title: 'Innovation First', desc: 'We stay ahead of the curve, adopting emerging technologies to give our clients a competitive edge.' },
    { icon: Users, title: 'Client-Centric', desc: 'Your success is our success. We work as an extension of your team, not just a vendor.' },
    { icon: Award, title: 'Quality Obsessed', desc: 'We don\'t ship code we\'re not proud of. Rigorous QA and code reviews are non-negotiable.' },
]

const stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '30+', label: 'Happy Clients' },
    { number: '5+', label: 'Years of Experience' },
    { number: '15+', label: 'Team Members' },
]

export default function AboutPage() {
    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            if (!pageRef.current) return
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            ctx = gsap.context(() => {
                gsap.fromTo('.about-hero > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' })
                gsap.fromTo('.stat-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' } })
                gsap.fromTo('.value-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.values-grid', start: 'top 85%' } })
                gsap.fromTo('.team-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.team-grid', start: 'top 85%' } })
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
                <div className="about-hero max-w-3xl">
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-8 display-font">
                        We build software that <span className="bg-[#B9FF66] px-2 rounded-md">matters.</span>
                    </h1>
                    <p className="text-xl text-zinc-600 leading-relaxed mb-10">
                        Lzmu is a Lahore-based software house. We partner with
                        startups and enterprises to design, build, and scale world-class digital products.
                    </p>
                    <a href="/quote" className="inline-flex items-center gap-2 bg-zinc-900 text-white text-lg px-8 py-4 rounded-xl hover:bg-zinc-800 transition-colors">
                        Work with us <ArrowUpRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 stats-grid">
                    {stats.map((s) => (
                        <div key={s.label} className="stat-card bg-zinc-100 rounded-[30px] p-8 border border-zinc-900 card-shadow text-center">
                            <div className="text-5xl font-bold display-font text-zinc-900 mb-2">{s.number}</div>
                            <div className="text-zinc-500 font-medium">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mb-12">
                    <h2 className="bg-[#B9FF66] px-2 rounded-md text-4xl font-medium tracking-tight inline-block display-font">Our Values</h2>
                    <p className="max-w-xl text-lg text-zinc-600">The principles that guide every decision we make at Lzmu.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 values-grid">
                    {values.map((v, i) => (
                        <div key={v.title} className={`value-card p-10 rounded-[40px] border border-zinc-900 card-shadow ${i % 2 === 0 ? 'bg-zinc-100' : 'bg-zinc-900 text-white'}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${i % 2 === 0 ? 'bg-black text-[#B9FF66]' : 'bg-[#B9FF66] text-black'}`}>
                                <v.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-semibold display-font mb-3">{v.title}</h3>
                            <p className={i % 2 === 0 ? 'text-zinc-600' : 'text-zinc-400'}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="max-w-7xl mx-auto px-6 py-16 mb-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mb-12">
                    <h2 className="bg-[#B9FF66] px-2 rounded-md text-4xl font-medium tracking-tight inline-block display-font">Meet the Team</h2>
                    <p className="max-w-xl text-lg text-zinc-600">The talented people behind Lzmu&apos;s world-class software.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 team-grid">
                    {team.map((member) => (
                        <div key={member.name} className="team-card bg-zinc-100 rounded-[30px] p-8 border border-zinc-900 card-shadow flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold display-font mb-4 ${member.accent}`}>
                                {member.initials}
                            </div>
                            <h3 className="text-xl font-semibold display-font mb-1">{member.name}</h3>
                            <p className="text-sm text-[#B9FF66] bg-zinc-900 px-3 py-1 rounded-full mb-3 font-medium">{member.role}</p>
                            <p className="text-zinc-500 text-sm leading-relaxed">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}
