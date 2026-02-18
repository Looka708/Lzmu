import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LogoScroll from '@/components/LogoScroll'
import Services from '@/components/Services'
import CTA from '@/components/CTA'
import CaseStudies from '@/components/CaseStudies'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <main>
            <Header />
            <Hero />
            <LogoScroll />
            <Services />
            <CTA />
            <CaseStudies />
            <Footer />
        </main>
    )
}
