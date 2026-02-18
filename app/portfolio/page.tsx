'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowUpRight, Globe, Smartphone, Layout } from 'lucide-react'

const categories = ['All', 'Web App', 'Mobile', 'UI/UX', 'Backend', 'Cloud']

const projects = [
    { id: 1, title: 'PayFlow', category: 'Web App', tags: ['Next.js', 'Node.js', 'PostgreSQL'], desc: 'Real-time payment processing platform for a fintech startup. Reduced transaction latency by 60%.', color: 'bg-[#B9FF66]', icon: Globe, result: '60% faster transactions' },
    { id: 2, title: 'MedTrack', category: 'Mobile', tags: ['Flutter', 'Firebase', 'HIPAA'], desc: 'HIPAA-compliant patient management mobile app for a healthcare provider.', color: 'bg-zinc-900', icon: Smartphone, result: '40% less admin overhead' },
    { id: 3, title: 'ShopEdge', category: 'Web App', tags: ['Next.js', 'Shopify', 'Tailwind'], desc: 'Headless commerce solution for a regional e-commerce brand. 3x faster page loads.', color: 'bg-zinc-100', icon: Globe, result: '35% higher conversions' },
    { id: 4, title: 'DashKit', category: 'UI/UX', tags: ['Figma', 'React', 'Design System'], desc: 'Complete design system and dashboard UI for a SaaS analytics platform.', color: 'bg-[#B9FF66]', icon: Layout, result: '4.9★ user satisfaction' },
    { id: 5, title: 'LogiCore API', category: 'Backend', tags: ['Node.js', 'GraphQL', 'Redis'], desc: 'High-throughput logistics API handling 500k+ daily requests for a supply chain company.', color: 'bg-zinc-900', icon: Globe, result: '500k+ daily requests' },
    { id: 6, title: 'CloudShift', category: 'Cloud', tags: ['AWS', 'Kubernetes', 'Terraform'], desc: 'Full cloud migration and DevOps setup for a legacy enterprise system.', color: 'bg-zinc-100', icon: Globe, result: '70% infra cost reduction' },
    { id: 7, title: 'EduPulse', category: 'Mobile', tags: ['React Native', 'Node.js', 'MongoDB'], desc: 'EdTech mobile app with live classes, quizzes, and progress tracking for 20k+ students.', color: 'bg-[#B9FF66]', icon: Smartphone, result: '20k+ active students' },
    { id: 8, title: 'HireFlow', category: 'Web App', tags: ['React', 'Python', 'AI/ML'], desc: 'AI-powered recruitment platform that automates candidate screening and scheduling.', color: 'bg-zinc-900', icon: Globe, result: '80% faster hiring' },
]

// Store gsap instance once loaded
let gsapInstance: typeof import('gsap').gsap | null = null

async function getGsap() {
    if (gsapInstance) return gsapInstance
    const { gsap } = await import('gsap')
    gsapInstance = gsap
    return gsap
}

export default function PortfolioPage() {
    const [active, setActive] = useState('All')
    const pageRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const animatingRef = useRef(false)

    const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

    // Hero + filter tabs — once on mount
    useEffect(() => {
        const init = async () => {
            const gsap = await getGsap()
            gsap.fromTo(
                '.portfolio-hero > *',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
            )
            gsap.fromTo(
                '.filter-tab',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.5, ease: 'power3.out' }
            )
        }
        init()
    }, [])

    // Animate cards in whenever filtered list changes
    useEffect(() => {
        if (!gridRef.current) return
        if (animatingRef.current) return

        const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.project-card'))
        if (cards.length === 0) return

        animatingRef.current = true

        const run = async () => {
            const gsap = await getGsap()

            // Instantly hide all cards
            gsap.set(cards, { opacity: 0, y: 40, scale: 0.94 })

            // Stagger them in
            gsap.to(cards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.55,
                stagger: 0.09,
                ease: 'power3.out',
                onComplete: () => {
                    animatingRef.current = false
                    // Attach hover after entrance finishes
                    cards.forEach((card) => {
                        card.addEventListener('mouseenter', () =>
                            gsap.to(card, { y: -8, scale: 1.03, duration: 0.3, ease: 'power2.out' })
                        )
                        card.addEventListener('mouseleave', () =>
                            gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: 'power2.inOut' })
                        )
                    })
                },
            })
        }

        run()
    }, [filtered]) // re-run whenever filtered array reference changes

    return (
        <div ref={pageRef}>
            <Header />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="portfolio-hero max-w-3xl">
                    <h1 className="text-6xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-8 display-font">
                        Our <span className="bg-[#B9FF66] px-2 rounded-md">work.</span>
                    </h1>
                    <p className="text-xl text-zinc-600 leading-relaxed">
                        A selection of projects we&apos;re proud of. Real products, real results, real impact.
                    </p>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="max-w-7xl mx-auto px-6 mb-10">
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`filter-tab px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${active === cat
                                    ? 'bg-zinc-900 text-white border-zinc-900'
                                    : 'bg-white text-zinc-600 border-zinc-300 hover:border-zinc-900 hover:text-zinc-900'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project) => (
                        <div
                            key={project.id}
                            className={`project-card ${project.color} rounded-[30px] border border-zinc-900 card-shadow p-8 flex flex-col gap-4 cursor-pointer`}
                            style={{ willChange: 'transform, opacity' }}
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${project.color === 'bg-zinc-900' ? 'bg-[#B9FF66] text-black' : 'bg-black text-[#B9FF66]'
                                }`}>
                                <project.icon className="w-6 h-6" />
                            </div>

                            {/* Category badge */}
                            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded w-fit ${project.color === 'bg-zinc-900' ? 'bg-zinc-800 text-zinc-300' : 'bg-black text-[#B9FF66]'
                                }`}>
                                {project.category}
                            </span>

                            {/* Title */}
                            <h3 className={`text-2xl font-bold display-font ${project.color === 'bg-zinc-900' ? 'text-white' : 'text-zinc-900'
                                }`}>
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-sm leading-relaxed ${project.color === 'bg-zinc-900' ? 'text-zinc-300' : 'text-zinc-600'
                                }`}>
                                {project.desc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className={`text-xs px-2 py-1 rounded-full border font-medium ${project.color === 'bg-zinc-900' ? 'border-zinc-700 text-zinc-400' : 'border-zinc-300 text-zinc-600'
                                        }`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Result + Arrow */}
                            <div className={`mt-auto flex items-center justify-between pt-4 border-t ${project.color === 'bg-zinc-900' ? 'border-zinc-800' : 'border-zinc-200'
                                }`}>
                                <span className={`text-sm font-semibold ${project.color === 'bg-[#B9FF66]' ? 'text-zinc-900'
                                        : project.color === 'bg-zinc-900' ? 'text-[#B9FF66]'
                                            : 'text-zinc-700'
                                    }`}>
                                    {project.result}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${project.color === 'bg-zinc-900' ? 'bg-white text-black' : 'bg-black text-[#B9FF66]'
                                    }`}>
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}
