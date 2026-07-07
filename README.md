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
3. **New sheet:** run `setupSheet()` once
4. **Upgrading old layout:** run `upgradeSheetHeaders()` once (updates row 1 only)
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the Web App URL into `GOOGLE_SCRIPT_URL`

#### Sheet1 — Payments (payment & review only)

| Column | Header |
|--------|--------|
| A | Submitted At |
| B | Registration Number |
| C | Cohort |
| D | Full Name |
| E | Email |
| F | Phone |
| G | Review Status (`pending` / `selected` / `rejected`) |
| H | Payment Status (`applied` / `paid`) |
| I | Amount Paid |
| J | Order ID |
| K | Payment ID |
| L | Paid At |

#### Sheet2 — Applications (full form answers)

| Column | Header |
|--------|--------|
| A | Submitted At |
| B | Registration Number |
| C | Cohort |
| D–H | Full Name, Age, Gender, Email, Phone |
| I–J | City, School / College |
| K–N | Why Bootcamp, Why Select You, Commitment Level, CEO Day Approach |
| O–P | Has Idea, Idea Details |
| Q | Willing To Pay |
| R | Confirmation Email Sent |

Both tabs are linked by **Registration Number** (e.g. `EC01-A3F9K2`).

### 2. Razorpay
1. Copy `.env.example` to `.env.local`
2. Add your keys from [Razorpay Dashboard](https://dashboard.razorpay.com/)
3. Use test keys first, then live keys for production

Required variables:
```
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

API routes:
- `POST /api/razorpay/order` — create order (used by checkout)
- `POST /api/create-order` — standard alias for order creation
- `POST /api/razorpay/verify` — verify signature + save paid lead
- `POST /api/verify-payment` — standard alias for signature verification

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
- **Apply** on the site → **Sheet2** gets full answers, **Sheet1** gets a payment row (`Payment Status: applied`, `Review Status: pending`)
- Applicant gets registration number + confirmation email (timestamp logged on Sheet2)
- Review applications on **Sheet2**, manage selection/payment on **Sheet1**
- Set **Review Status** to `selected` on Sheet1 for approved candidates
- Share `earlyceo.online/payment` only with selected applicants
- Successful payment updates **Sheet1** only (`paid`, amount, Razorpay IDs)
- Only **paid** rows on Sheet1 count toward the 100-seat limit

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
