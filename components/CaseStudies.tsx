'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Link from 'next/link'

const caseStudies = [
    {
        tag: 'Fintech',
        title: 'PayFlow',
        text: 'For a fintech startup, Lzmu engineered a real-time payment processing platform that reduced transaction latency by 60% and scaled to 100k daily active users within 3 months.',
        result: '60% faster',
        metric: 'transaction speed',
    },
    {
        tag: 'Healthcare',
        title: 'MedTrack',
        text: 'For a healthcare provider, we built a HIPAA-compliant patient management system with a custom mobile app, cutting administrative overhead by 40% and improving patient satisfaction scores.',
        result: '40% reduction',
        metric: 'admin overhead',
    },
    {
        tag: 'E-Commerce',
        title: 'ShopEdge',
        text: 'For a regional e-commerce brand, Lzmu delivered a headless commerce solution that boosted page load speed by 3x and increased conversion rates by 35% in the first quarter post-launch.',
        result: '35% increase',
        metric: 'conversion rate',
    },
]

const testimonials = [
    { name: 'Ahmed Raza', role: 'CEO, PayFlow', text: 'Lzmu delivered beyond expectations. The Lzmu team is sharp, communicative, and genuinely cares about the product.' },
    { name: 'Dr. Sana Malik', role: 'CTO, MedTrack', text: 'Working with Lzmu felt like having a co-founder. They understood our compliance needs and built something we\'re truly proud of.' },
    { name: 'Bilal Khan', role: 'Founder, ShopEdge', text: 'The speed and quality Lzmu delivered in 10 weeks was remarkable. Our conversion rate jumped 35% in the first month.' },
]

export default function CaseStudies() {
    const sectionRef = useRef<HTMLElement>(null)
    const [activeCase, setActiveCase] = useState(0)
    const [testimonialIdx, setTestimonialIdx] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const nextTestimonial = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setTimeout(() => { setTestimonialIdx((i) => (i + 1) % testimonials.length); setIsAnimating(false) }, 300)
    }
    const prevTestimonial = () => {
        if (isAnimating) return
        setIsAnimating(true)
        setTimeout(() => { setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length); setIsAnimating(false) }, 300)
    }

    // Auto-advance testimonials
    useEffect(() => {
        const t = setInterval(nextTestimonial, 4000)
        return () => clearInterval(t)
    }, [])

    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            if (!sectionRef.current) return
            const { gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            gsap.registerPlugin(ScrollTrigger)
            ctx = gsap.context(() => {
                gsap.fromTo('.case-studies-card',
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: '.case-studies-card', start: 'top 85%' }
                    }
                )
                ScrollTrigger.refresh()
            }, sectionRef)
        }
        init()
        return () => { ctx?.revert() }
    }, [])

    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto px-6 mb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mb-12">
                <h2 className="bg-[#B9FF66] px-2 rounded-md text-4xl font-medium tracking-tight inline-block display-font">
                    Case Studies
                </h2>
                <p className="max-w-xl text-lg text-zinc-600">
                    Real results from real projects — explore how Lzmu has helped businesses transform through technology.
                </p>
            </div>

            {/* Interactive Case Study Tabs */}
            <div className="bg-zinc-900 rounded-[40px] p-8 lg:p-12 text-white case-studies-card mb-8">
                {/* Tab buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {caseStudies.map((c, i) => (
                        <button
                            key={c.tag}
                            onClick={() => setActiveCase(i)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${activeCase === i
                                ? 'bg-[#B9FF66] text-black border-[#B9FF66]'
                                : 'border-zinc-700 text-zinc-400 hover:border-zinc-400 hover:text-white'
                                }`}
                        >
                            {c.tag}
                        </button>
                    ))}
                </div>

                {/* Active case content */}
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <h3 className="text-3xl font-bold display-font text-white mb-4">{caseStudies[activeCase].title}</h3>
                        <p className="text-zinc-300 text-lg leading-relaxed mb-6">{caseStudies[activeCase].text}</p>
                        <Link href="/portfolio" className="inline-flex items-center text-[#B9FF66] text-lg font-medium hover:underline">
                            Learn more <ArrowUpRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                    {/* Result metric */}
                    <div className="bg-zinc-800 rounded-[24px] p-8 flex flex-col items-center justify-center text-center border border-zinc-700">
                        <div className="text-5xl font-bold display-font text-[#B9FF66] mb-2">{caseStudies[activeCase].result}</div>
                        <div className="text-zinc-400 text-sm font-medium">{caseStudies[activeCase].metric}</div>
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-2 mt-8">
                    {caseStudies.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveCase(i)}
                            className={`rounded-full transition-all duration-300 ${activeCase === i ? 'w-8 h-2 bg-[#B9FF66]' : 'w-2 h-2 bg-zinc-600 hover:bg-zinc-400'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Testimonial Slider */}
            <div className="bg-zinc-100 rounded-[40px] border border-zinc-900 card-shadow p-10 lg:p-12">
                <div className="flex items-start justify-between mb-6">
                    <Quote className="w-10 h-10 text-[#B9FF66] fill-[#B9FF66]" />
                    <div className="flex gap-2">
                        <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextTestimonial} className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <p className="text-xl lg:text-2xl text-zinc-700 leading-relaxed mb-8 font-medium">
                        &ldquo;{testimonials[testimonialIdx].text}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-[#B9FF66] font-bold display-font text-lg">
                            {testimonials[testimonialIdx].name[0]}
                        </div>
                        <div>
                            <div className="font-semibold text-zinc-900">{testimonials[testimonialIdx].name}</div>
                            <div className="text-sm text-zinc-500">{testimonials[testimonialIdx].role}</div>
                        </div>
                    </div>
                </div>

                {/* Progress dots */}
                <div className="flex gap-2 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setTestimonialIdx(i)}
                            className={`rounded-full transition-all duration-300 ${testimonialIdx === i ? 'w-8 h-2 bg-zinc-900' : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-500'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
