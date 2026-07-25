# Email API Setup Guide

## ✅ SETUP COMPLETED

The email sending system has been implemented and is ready to use. Follow these steps to complete the setup:

---

## 📦 STEP 1: Install Dependencies

Run this command in your terminal:

```bash
npm install resend
```

**Note:** If you get a PowerShell security error, you may need to run the command manually in your terminal.

---

## 🔑 STEP 2: Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy the generated key

**Important:** The free plan includes:
- 3,000 emails/month
- 100 emails/day
- Perfect for contact forms

---

## 🔐 STEP 3: Add API Key to Environment

1. Open the `.env.local` file in the root directory
2. Replace `your_resend_api_key_here` with your actual API key:

```env
RESEND_API_KEY=re_123456789_your_actual_key_here
```

3. Save the file

**Note:** `.env.local` is already in `.gitignore` so your key won't be committed to version control.

---

## 🚀 STEP 4: Verify Setup

### Files Created:

✅ `/src/app/api/contact/route.ts` - API endpoint  
✅ `/.env.local` - Environment variables  
✅ Contact form updated with API integration

### Test Locally:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/hablemos` page

3. Fill out and submit the contact form

4. Check:
   - Form shows "Sending..." while processing
   - Success message appears after submission
   - Emails arrive at:
     - memi@dobleparcreatives.com
     - delfina@dobleparcreatives.com

---

## 📧 Email Features

### What's Included:

✅ **Professional HTML Email Template**
- Clean, branded design
- Responsive layout
- Properly formatted contact details

✅ **Reply-To Functionality**
- Click reply in your email client
- Automatically replies to the sender's email

✅ **Error Handling**
- Input validation
- Network error handling
- User-friendly error messages

✅ **Loading States**
- Button shows "Sending..."
- Form inputs disabled during submission
- Prevents multiple submissions

✅ **Success Feedback**
- Green success message
- Auto-clears after 5 seconds
- Form resets automatically

---

## 🔧 Configuration

### Email Recipients

To change who receives emails, edit `/src/app/api/contact/route.ts`:

```typescript
to: [
  'memi@dobleparcreatives.com',
  'delfina@dobleparcreatives.com'
  // Add more recipients here
],
```

### "From" Address

By default, Resend uses `onboarding@resend.dev` for testing. To use your own domain:

1. Verify your domain in Resend dashboard
2. Update the `from` field:
   ```typescript
   from: 'Doblepar <contact@dobleparcreatives.com>',
   ```

---

## 🌐 Deploy to Vercel

The email API works automatically on Vercel:

1. Push your code to GitHub
2. Deploy on Vercel
3. Add environment variable:
   - Go to **Project Settings** → **Environment Variables**
   - Add `RESEND_API_KEY` with your key
   - Save and redeploy

**No additional configuration needed!** Vercel handles serverless API routes automatically.

---

## 🛡️ Optional Security Enhancements

### Add Honeypot (Spam Prevention)

Add a hidden field that bots will fill but humans won't:

```tsx
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

Then check in API:
```typescript
if (body.website) {
  return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
}
```

### Rate Limiting

Consider adding rate limiting to prevent abuse. Use Vercel's rate limiting or a service like Upstash.

---

## 🧪 Testing

### Test Email Delivery

1. **Localhost:** Works immediately with Resend API key
2. **Staging:** Test on Vercel preview deployments
3. **Production:** Verify with real email addresses

### What to Test:

- ✅ Email arrives at both addresses
- ✅ Reply-To works correctly
- ✅ Email content is formatted properly
- ✅ Success/error messages display correctly
- ✅ Form validation works

---

## 📊 Monitor Usage

Track your email usage in the Resend dashboard:
- View sent emails
- Check delivery status
- Monitor API usage
- View error logs

---

## 🆘 Troubleshooting

### "Missing API key" error
- Check `.env.local` exists
- Verify API key is correct
- Restart dev server after adding env variables

### Emails not arriving
- Check Resend dashboard for delivery status
- Verify recipient email addresses
- Check spam folders
- Ensure API key has proper permissions

### Network errors
- Verify internet connection
- Check browser console for errors
- Ensure API route is accessible (`/api/contact`)

---

## ✨ Current Implementation

**Contact Form:** `/src/components/sections/hablemos/ContactForm/ContactForm.tsx`
- ✅ Full API integration
- ✅ Loading states
- ✅ Success/error messages
- ✅ Form validation
- ✅ Auto-reset after success

**API Route:** `/src/app/api/contact/route.ts`
- ✅ Email validation
- ✅ Error handling
- ✅ Professional HTML template
- ✅ Dual recipient support
- ✅ Reply-To functionality

---

## 🎯 Next Steps

1. **Install resend:** `npm install resend`
2. **Get API key:** [resend.com](https://resend.com)
3. **Update `.env.local`** with your key
4. **Test locally** on `/hablemos` page
5. **Deploy to Vercel** with environment variable

---

## 📖 Documentation

- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Setup is complete! Install dependencies and add your API key to start receiving emails.**
