'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle2, ArrowUpRight, Zap } from 'lucide-react'
import Link from 'next/link'

const faqs = [
    { q: 'How long does a typical project take?', a: 'Development timelines are scoped per project based on complexity. We provide detailed estimates and track every hour so you know exactly where the time goes.' },
    { q: 'Do you offer ongoing maintenance?', a: 'Yes. Our hourly model is perfect for long-term maintenance and iterative feature development. You only pay for the time we spend supporting you.' },
    { q: 'What technologies do you use?', a: 'We primarily use React, Next.js, Node.js, Flutter, PostgreSQL, and AWS — but we adapt to your existing stack if needed.' },
    { q: 'Can I set a maximum budget?', a: 'Absolutely. We often work with clients who have bi-weekly or monthly budget caps to ensure the project stays within financial comfort zones.' },
]

export default function PricingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const pageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            ctx = gsap.context(() => {
                gsap.fromTo('.pricing-hero > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' })
                gsap.fromTo('.hourly-card', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.hourly-section', start: 'top 85%' } })
                gsap.fromTo('.faq-item', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.faq-list', start: 'top 85%' } })
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
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <div className="pricing-hero">
                    <h1 className="text-6xl lg:text-8xl font-medium tracking-tight leading-[1.05] mb-6 display-font">
                        Simple <span className="bg-[#B9FF66] px-2 rounded-md">Hourly</span> pricing.
                    </h1>
                    <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-10">
                        At Lzmu, we believe in full transparency and flexibility. That&apos;s why we work exclusively on an hourly basis.
                    </p>
                </div>
            </section>

            {/* Main Hourly Rate Card */}
            <section className="max-w-7xl mx-auto px-6 pb-20 hourly-section">
                <div className="hourly-card bg-zinc-900 rounded-[40px] border border-zinc-900 card-shadow p-12 lg:p-20 text-center flex flex-col items-center gap-8">
                    <div className="bg-[#B9FF66] px-4 py-1.5 rounded-full text-sm font-bold display-font text-black uppercase tracking-wider">
                        Standard Rate
                    </div>
                    <div className="space-y-2">
                        <div className="text-5xl md:text-7xl lg:text-9xl font-bold display-font text-white">$35 - $50</div>
                        <div className="text-zinc-400 text-xl lg:text-2xl">per hour</div>
                    </div>
                    <p className="max-w-2xl text-zinc-300 text-lg leading-relaxed">
                        We don&apos;t believe in complex fixed-price packages that hide costs or limit scope.
                        You pay only for the actual time spent developing your product, giving you complete control
                        over the project&apos;s budget and evolution.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
                        {[
                            { title: 'Full Transparency', desc: 'Tracked time logs and weekly progress reports.' },
                            { title: 'Zero Commitment', desc: 'Scale up or down as your project needs change.' },
                            { title: 'Direct Access', desc: 'Direct communication with our expert developers and designers.' },
                        ].map((item) => (
                            <div key={item.title} className="bg-zinc-800 p-6 rounded-3xl border border-zinc-700 text-left">
                                <div className="text-[#B9FF66] font-bold mb-2 display-font">{item.title}</div>
                                <div className="text-zinc-400 text-sm leading-relaxed">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                    <Link href="/quote" className="mt-8 bg-[#B9FF66] text-black px-10 py-5 rounded-2xl font-bold text-xl hover:bg-lime-400 transition-all flex items-center gap-3">
                        Start Your Project <ArrowUpRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto px-6 pb-20">
                <h2 className="bg-[#B9FF66] px-2 rounded-md text-4xl font-medium tracking-tight inline-block display-font mb-10">FAQs</h2>
                <div className="space-y-4 faq-list">
                    {[
                        { q: 'Why only hourly billing?', a: 'Fixed prices often lead to "scope creep" or rushed work. Hourly billing ensures we can focus on quality and adapt to your changing requirements without recalculating complex contracts.' },
                        { q: 'How do you track time?', a: 'We use professional time-tracking software and provide detailed reports every week, so you know exactly which features or modules were worked on.' },
                        { q: 'Can I set a maximum budget?', a: 'Yes! We often work with clients who have a bi-weekly or monthly budget cap to ensure the project stays within their financial comfort zone.' },
                        { q: 'How do I pay?', a: 'We typically invoice bi-weekly or monthly for the hours worked in that period. We accept all major payment methods.' },
                    ].map((faq, i) => (
                        <div key={i} className="faq-item border border-zinc-200 rounded-2xl overflow-hidden">
                            <button
                                className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-lg hover:bg-zinc-50 transition-colors"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                {faq.q}
                                <span className={`text-2xl transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                            </button>
                            {openFaq === i && (
                                <div className="px-6 pb-5 text-zinc-600 leading-relaxed">{faq.a}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    )
}
