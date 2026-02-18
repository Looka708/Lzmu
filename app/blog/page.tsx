'use client'

import { useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'

const posts = [
    { id: 1, title: 'Why Next.js 14 is the Future of Web Development', excerpt: 'We break down the App Router, Server Components, and why every serious web project should consider Next.js 14 as its foundation.', category: 'Engineering', date: 'Feb 10, 2026', readTime: '6 min read', color: 'bg-[#B9FF66]', author: 'Lzmu Team' },
    { id: 2, title: 'Flutter vs React Native in 2026: Which Should You Choose?', excerpt: 'A deep technical comparison of the two leading cross-platform mobile frameworks — performance, DX, ecosystem, and real-world trade-offs.', category: 'Mobile', date: 'Feb 5, 2026', readTime: '8 min read', color: 'bg-zinc-900', author: 'Ali Raza' },
    { id: 3, title: 'Designing for Trust: UI Patterns That Convert', excerpt: "How micro-interactions, social proof placement, and visual hierarchy can dramatically improve your product's conversion rates.", category: 'Design', date: 'Jan 28, 2026', readTime: '5 min read', color: 'bg-zinc-100', author: 'Sara Khan' },
    { id: 4, title: 'Building a HIPAA-Compliant App: Lessons from MedTrack', excerpt: 'A behind-the-scenes look at the architecture decisions, security measures, and compliance challenges we faced building MedTrack.', category: 'Case Study', date: 'Jan 20, 2026', readTime: '10 min read', color: 'bg-[#B9FF66]', author: 'Fatima Malik' },
    { id: 5, title: 'Kubernetes for Startups: When You Actually Need It', excerpt: "Kubernetes is powerful — but is it right for your stage? We share our honest take on when to adopt container orchestration.", category: 'DevOps', date: 'Jan 12, 2026', readTime: '7 min read', color: 'bg-zinc-900', author: 'Lzmu Team' },
    { id: 6, title: 'The Real Cost of Technical Debt (And How to Pay It Down)', excerpt: "Technical debt compounds like financial debt. Here's how we help clients audit, prioritize, and systematically eliminate it.", category: 'Engineering', date: 'Jan 5, 2026', readTime: '6 min read', color: 'bg-zinc-100', author: 'Ali Raza' },
]

const categoryColors: Record<string, string> = {
    Engineering: 'bg-zinc-900 text-[#B9FF66]',
    Mobile: 'bg-[#B9FF66] text-black',
    Design: 'bg-zinc-200 text-zinc-800',
    'Case Study': 'bg-zinc-900 text-[#B9FF66]',
    DevOps: 'bg-[#B9FF66] text-black',
}

export default function BlogPage() {
    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            if (!pageRef.current) return
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            ctx = gsap.context(() => {
                gsap.fromTo('.blog-hero > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' })
                gsap.fromTo('.blog-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.blog-grid', start: 'top 85%' } })
                document.querySelectorAll<HTMLElement>('.blog-card').forEach((card) => {
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
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="blog-hero max-w-3xl">
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-8 display-font">
                        Insights from <span className="bg-[#B9FF66] px-2 rounded-md">Lzmu.</span>
                    </h1>
                    <p className="text-xl text-zinc-600 leading-relaxed">Engineering deep-dives, design thinking, case studies, and industry perspectives from the Lzmu team.</p>
                </div>
            </section>

            {/* Featured Post */}
            <section className="max-w-7xl mx-auto px-6 mb-12">
                <div className="bg-zinc-900 rounded-[40px] border border-zinc-900 card-shadow p-10 lg:p-14">
                    <span className="text-xs font-bold uppercase tracking-widest bg-[#B9FF66] text-black px-3 py-1 rounded-full">Featured</span>
                    <h2 className="text-3xl lg:text-5xl font-bold display-font text-white mt-4 mb-4 leading-tight">{posts[0].title}</h2>
                    <p className="text-zinc-300 text-lg leading-relaxed mb-6">{posts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-zinc-400 text-sm mb-8">
                        <span>{posts[0].author}</span><span>·</span><span>{posts[0].date}</span><span>·</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{posts[0].readTime}</span>
                    </div>
                    <Link href="#" className="inline-flex items-center gap-2 bg-[#B9FF66] text-black font-semibold px-6 py-3 rounded-xl hover:bg-lime-400 transition-colors">
                        Read article <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 blog-grid">
                    {posts.slice(1).map((post) => (
                        <div key={post.id} className={`blog-card ${post.color} rounded-[30px] border border-zinc-900 card-shadow p-8 flex flex-col gap-4 cursor-pointer`}>
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-zinc-200 text-zinc-700'}`}>{post.category}</span>
                                <span className={`text-xs flex items-center gap-1 ${post.color === 'bg-zinc-900' ? 'text-zinc-400' : 'text-zinc-500'}`}><Clock className="w-3 h-3" />{post.readTime}</span>
                            </div>
                            <h3 className={`text-xl font-bold display-font leading-snug ${post.color === 'bg-zinc-900' ? 'text-white' : 'text-zinc-900'}`}>{post.title}</h3>
                            <p className={`text-sm leading-relaxed flex-1 ${post.color === 'bg-zinc-900' ? 'text-zinc-300' : 'text-zinc-600'}`}>{post.excerpt}</p>
                            <div className={`flex items-center justify-between pt-4 border-t ${post.color === 'bg-zinc-900' ? 'border-zinc-800' : 'border-zinc-200'}`}>
                                <div>
                                    <p className={`text-xs font-semibold ${post.color === 'bg-zinc-900' ? 'text-zinc-300' : 'text-zinc-700'}`}>{post.author}</p>
                                    <p className={`text-xs ${post.color === 'bg-zinc-900' ? 'text-zinc-500' : 'text-zinc-400'}`}>{post.date}</p>
                                </div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${post.color === 'bg-zinc-900' ? 'bg-white text-black' : 'bg-black text-[#B9FF66]'}`}>
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
