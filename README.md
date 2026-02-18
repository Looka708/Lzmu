# ✦ Lzmu — Software House Website

> A premium, fully responsive marketing website for **Lzmu Software House** — built with Next.js 14, GSAP animations, and Resend email integration.

---

## 🚀 Live Preview

> Coming soon at **[lzmu.info](https://lzmu.info)**

---

## 📸 Features

- ⚡ **Next.js 14 App Router** — Server components, file-based routing, and optimized builds
- 🎨 **GSAP Animations** — Scroll-triggered reveals, staggered entries, parallax effects, and a typewriter hero
- 📱 **Fully Responsive** — Mobile-first design with a full-screen animated hamburger menu
- 📧 **Email Integration** — Quote form submissions sent via [Resend](https://resend.com) to `hello@lzmu.dev`
- 🌙 **Premium UI** — Glassmorphism, dark/light sections, micro-interactions, and a curated design system
- 🔍 **SEO Ready** — Semantic HTML, meta descriptions, and proper heading hierarchy on every page

---

## 🗂️ Pages

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Services, Case Studies, CTA |
| `/about` | About Us — Team, Values, Stats |
| `/services` | Full services breakdown |
| `/portfolio` | Project showcase |
| `/pricing` | Hourly pricing model ($35–$50/hr) |
| `/blog` | Engineering insights & case studies |
| `/quote` | Quote request form with email delivery |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework & routing |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [GSAP](https://gsap.com) | Animations & ScrollTrigger |
| [Resend](https://resend.com) | Transactional email delivery |
| [Lucide React](https://lucide.dev) | Icon library |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/lzmu.git
cd lzmu

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
RESEND_API_KEY=your_resend_api_key_here
```

> Get your API key from [resend.com/api-keys](https://resend.com/api-keys)

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
lzmu/
├── app/
│   ├── api/send/         # Email API route (Resend)
│   ├── about/            # About page
│   ├── blog/             # Blog page
│   ├── portfolio/        # Portfolio page
│   ├── pricing/          # Pricing page
│   ├── quote/            # Quote request form
│   ├── services/         # Services page
│   ├── layout.tsx        # Root layout & metadata
│   └── page.tsx          # Homepage
├── components/
│   ├── Header.tsx        # Navigation with mobile menu
│   ├── Footer.tsx        # Footer with contact info
│   ├── Hero.tsx          # Animated hero section
│   ├── Services.tsx      # Services grid
│   ├── CTA.tsx           # Call-to-action with stats
│   ├── CaseStudies.tsx   # Case studies & testimonials
│   └── LogoScroll.tsx    # Infinite tech stack scroll
├── public/               # Static assets
├── .env.local            # Environment variables (not committed)
└── README.md
```

---

## 📬 Contact

| Channel | Details |
|---|---|
| 📧 Email | [hello@lzmu.dev](mailto:hello@lzmu.dev) |
| 📞 Phone | [+92 308 4970534](tel:+923084970534) |
| 📍 Location | Lahore, Pakistan |

---

## 📄 License

This project is proprietary and confidential. All rights reserved © 2026 **Lzmu Software House**.
