# AI for Teachers — QNAYDS

React + Vite landing page based on the requested QNAYDS-style structure and the supplied
"AI Foundations for Educators — Landing Page Plan".

## Run
```bash
npm install
npm run dev
```

## Important
1. The project uses a QNAYDS-style logo mark in CSS so it runs immediately.
2. If you have the official QNAYDS logo PNG/SVG, put it in `public/qnayds-logo.png` and replace the
   `<Logo />` component in `src/App.jsx` with an `<img>` if you need the exact official artwork.
3. WhatsApp number is configured at the top of `src/App.jsx`:
   `const WHATSAPP_NUMBER = "919074871204";`
4. The existing `.env` file supplies the Razorpay public key through
   `VITE_RAZORPAY_KEY` and the course identifier through `VITE_COURSE_ID`.
5. The enrollment form opens Razorpay Checkout for ₹1,999 after validation and prefills the
   customer's name, phone number, and email.
6. Only use a Razorpay test key during testing. Never put the Razorpay secret key
   in `.env` with a `VITE_` prefix or in frontend code. Production payments must
   be verified server-side using Razorpay's signature verification before granting
   course access.
7. Replace the mentor/testimonial placeholders with the actual approved content.
