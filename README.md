# EarlyCEO Landing Page

Premium, conversion-focused landing page for **EarlyCEO** — an entrepreneurship education platform.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup (Google Sheets + Razorpay)

### 1. Google Sheet
Sheet: [earlyCEO-leads](https://docs.google.com/spreadsheets/d/1IFJsudd5gaWxmqESYzkb0WAUCfkDkmV0DvwvpGHaQcQ/edit)

1. Open the sheet → **Extensions → Apps Script**
2. Paste code from `scripts/google-apps-script.js`
3. Run `setupSheet()` once (authorize when prompted)
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL

### 2. Razorpay
1. Create keys at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Use test keys first, then live keys for production

### 3. Vercel Environment Variables
Add these in **Vercel → Project → Settings → Environment Variables**:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

Redeploy after adding variables.

### How it works
- Form submissions are saved to your Google Sheet after payment
- **₹999** Founding Cohort Special for **Cohort 01** — only **100** paid seats
- Razorpay checkout opens after form submit; only successful payments reduce seat count

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **Lucide Icons**

## Sections

- Hero with rotating CEO text, founding cohort pricing, countdown
- Social proof & statistics
- CEO for a Day experience
- 9-day curriculum
- Who Should Join
- Comparison table
- Testimonials
- About (founder, team, contact)
- Join Bootcamp application form
