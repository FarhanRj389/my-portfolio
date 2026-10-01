# My Portfolio

A production-ready portfolio for Farhan Ahmed, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Supabase, and Nodemailer.

## Setup

1. Copy `.env.example` to `.env.local` and fill in the Supabase, SMTP, and contact email values.
2. Add `public/Farhan_Ahmed_CV.pdf` when the CV is ready.
3. Deploy to Vercel with the same environment variables.

## Supabase SQL

```sql
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);
alter table messages enable row level security;
```

The portfolio writes contact messages through the server route using the service role key. No public read policy is created.

## Environment variables

`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` identify the app. `SUPABASE_SERVICE_ROLE_KEY` is server-only. `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` configure Gmail SMTP. `CONTACT_TO_EMAIL` receives new messages.
