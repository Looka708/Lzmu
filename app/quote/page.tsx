'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Send, CheckCircle2 } from 'lucide-react'

const services = ['Web App Development', 'Mobile App Development', 'UI/UX Design', 'Backend & API Development', 'Cloud & DevOps', 'QA & Testing', 'Other']
const budgets = ['Under $2,500', '$2,500 – $6,500', '$6,500 – $15,000', '$15,000+', 'Not sure yet']

interface FormState {
    name: string
    email: string
    company: string
    service: string
    budget: string
    timeline: string
    message: string
}

export default function QuotePage() {
    const pageRef = useRef<HTMLDivElement>(null)
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', service: '', budget: '', timeline: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                const data = await response.json()
                setError(data.error?.message || 'Something went wrong. Please try again.')
            }
        } catch (err) {
            setError('Failed to send message. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        let ctx: { revert: () => void } | null = null
        const init = async () => {
            if (!pageRef.current) return
            const { gsap } = await import('gsap')
            ctx = gsap.context(() => {
                gsap.fromTo('.quote-hero > *', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' })
                gsap.fromTo('.quote-form', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' })
                gsap.fromTo('.quote-sidebar > *', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 0.4, ease: 'power3.out' })
            }, pageRef)
        }
        init()
        return () => { ctx?.revert() }
    }, [])

    const inputClass = 'w-full border border-zinc-300 rounded-xl px-4 py-3.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition-all bg-white text-sm'
    const labelClass = 'block text-sm font-semibold text-zinc-700 mb-2'

    return (
        <div ref={pageRef}>
            <Header />

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="quote-hero max-w-2xl mb-16">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05] mb-6 display-font">
                        Get a free <span className="bg-[#B9FF66] px-2 rounded-md">proposal.</span>
                    </h1>
                    <p className="text-xl text-zinc-600 leading-relaxed">
                        Tell us about your project. Our team will review your
                        request and get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        {submitted ? (
                            <div className="bg-[#B9FF66] rounded-[40px] border border-zinc-900 card-shadow p-8 md:p-16 flex flex-col items-center text-center gap-6">
                                <CheckCircle2 className="w-20 h-20 text-zinc-900" />
                                <h2 className="text-4xl font-bold display-font">We got your message!</h2>
                                <p className="text-zinc-700 text-lg max-w-md">
                                    Thanks, <strong>{form.name}</strong>! Our team will personally review your
                                    request and reach out within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="quote-form bg-zinc-100 rounded-[40px] border border-zinc-900 card-shadow p-6 md:p-10 space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass} htmlFor="name">Full Name *</label>
                                        <input id="name" name="name" type="text" required placeholder="Your Name" className={inputClass} value={form.name} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className={labelClass} htmlFor="email">Email Address *</label>
                                        <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputClass} value={form.email} onChange={handleChange} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="company">Company / Organization</label>
                                    <input id="company" name="company" type="text" placeholder="Acme Inc." className={inputClass} value={form.company} onChange={handleChange} />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClass} htmlFor="service">Service Needed *</label>
                                        <select id="service" name="service" required className={inputClass} value={form.service} onChange={handleChange}>
                                            <option value="">Select a service</option>
                                            {services.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass} htmlFor="budget">Budget Range *</label>
                                        <select id="budget" name="budget" required className={inputClass} value={form.budget} onChange={handleChange}>
                                            <option value="">Select a budget</option>
                                            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="timeline">Desired Timeline</label>
                                    <input id="timeline" name="timeline" type="text" placeholder="e.g. 3 months, ASAP" className={inputClass} value={form.timeline} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className={labelClass} htmlFor="message">Project Details *</label>
                                    <textarea id="message" name="message" required rows={5} placeholder="Tell us about your project, goals, and any specific requirements..." className={`${inputClass} resize-none`} value={form.message} onChange={handleChange} />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm font-medium">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-zinc-900 text-white text-lg font-semibold py-4 rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Request'} <Send className="w-5 h-5" />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="quote-sidebar space-y-6">
                        <div className="bg-zinc-900 rounded-[30px] border border-zinc-900 card-shadow p-8 text-white">
                            <h3 className="text-xl font-bold display-font mb-4">What happens next?</h3>
                            <ol className="space-y-4">
                                {[
                                    { step: '01', text: 'Our team reviews your request within 24 hours.' },
                                    { step: '02', text: 'We schedule a discovery call with you.' },
                                    { step: '03', text: 'We send a detailed proposal & timeline.' },
                                    { step: '04', text: 'We kick off your project!' },
                                ].map((item) => (
                                    <li key={item.step} className="flex gap-4">
                                        <span className="text-[#B9FF66] font-bold text-lg display-font shrink-0">{item.step}</span>
                                        <span className="text-zinc-300 text-sm leading-relaxed">{item.text}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="bg-[#B9FF66] rounded-[30px] border border-zinc-900 card-shadow p-8">
                            <h3 className="text-xl font-bold display-font mb-2">Prefer to email directly?</h3>
                            <p className="text-zinc-700 text-sm mb-4">Reach our team directly at:</p>
                            <a href="mailto:hello@lzmu.dev" className="font-bold text-zinc-900 underline underline-offset-4 hover:no-underline">hello@lzmu.dev</a>
                        </div>

                        <div className="bg-zinc-100 rounded-[30px] border border-zinc-900 card-shadow p-8">
                            <h3 className="text-xl font-bold display-font mb-4">Why Lzmu?</h3>
                            <ul className="space-y-3">
                                {['50+ successful projects', 'Transparent pricing', 'Dedicated project manager', 'On-time delivery guarantee', 'Post-launch support included'].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-700">
                                        <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
