'use client'

import { useEffect, useRef } from 'react'

// Tech stack / client logos — duplicated 3x for seamless infinite scroll
const logos = [
    { type: 'text', label: 'React', className: 'text-3xl font-semibold font-sans tracking-tighter' },
    { type: 'text', label: 'Next.js', className: 'text-3xl font-bold font-sans' },
    { type: 'text', label: 'Node.js', className: 'text-3xl font-medium font-sans' },
    { type: 'notion' }, // repurposed as "Flutter" badge
    {
        type: 'text',
        label: 'TypeScript',
        className: 'text-3xl font-bold tracking-widest',
        style: { WebkitTextStroke: '1px black', color: 'transparent' },
    },
    {
        type: 'text',
        label: 'AWS',
        className: 'text-3xl font-bold font-sans',
        style: { WebkitTextStroke: '1px black', color: 'transparent' },
    },
]

function LogoItem({ logo }: { logo: (typeof logos)[0] }) {
    if (logo.type === 'notion') {
        return (
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-zinc-800 rounded text-[#B9FF66] flex items-center justify-center text-lg font-bold font-sans">
                    Fl
                </div>
                <span className="text-3xl font-medium font-sans">Flutter</span>
            </div>
        )
    }
    return (
        <span className={logo.className} style={logo.style as React.CSSProperties}>
            {logo.label}
        </span>
    )
}

export default function LogoScroll() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        let ctx: { revert: () => void } | null = null

        const initGSAP = async () => {
            const { gsap } = await import('gsap')

            ctx = gsap.context(() => {
                gsap.to('.logo-track', {
                    xPercent: -33.33,
                    ease: 'none',
                    duration: 25,
                    repeat: -1,
                })
            }, sectionRef)
        }

        initGSAP()
        return () => { ctx?.revert() }
    }, [])

    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto px-6 py-10 overflow-hidden">
            <div className="flex items-center gap-12 lg:gap-24 whitespace-nowrap logo-track">
                {[1, 2, 3].map((set) =>
                    logos.map((logo, i) => (
                        <LogoItem key={`set${set}-${i}`} logo={logo} />
                    ))
                )}
            </div>
        </section>
    )
}
