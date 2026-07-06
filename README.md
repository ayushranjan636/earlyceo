# EarlyCEO Landing Page

Premium, conversion-focused landing page for **EarlyCEO** — an entrepreneurship education platform.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import the GitHub repo: https://github.com/ayushranjan636/earlyceo
2. In **Project Settings → Build & Deployment → Framework Settings**:
   - **Framework Preset:** `Next.js` (not "Other")
   - **Root Directory:** leave empty (project root)
   - **Build Command:** `npm run build`
   - **Output Directory:** leave empty (do not set to `out` or `dist`)
   - **Install Command:** `npm install`
3. **Node.js Version:** 22.x (or 20.19+)
4. Redeploy with **Clear build cache** enabled

If you still see `404: NOT_FOUND` after a successful build, delete the Vercel project and re-import the repo fresh from GitHub.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide Icons**

## Sections

- Hero with rotating CEO text, early bird pricing, countdown
- Social proof & statistics
- CEO for a Day experience
- 9-day curriculum
- Who Should Join
- Comparison table
- Testimonials
- About (founder, team, contact)
- Join Bootcamp application form
