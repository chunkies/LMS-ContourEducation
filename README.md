# Contour LMS

Student consultation booking app built with Next.js, Supabase, and Material UI.

## Setup

You'll need Node.js 20+ and Docker installed.

```bash
npm install
npx supabase start
```

Once Supabase is running, copy the **Publishable** key from the output. Then create your env file:

```bash
cp .env.local

-- in the file 
NEXT_PUBLIC_SUPABASE_URL=<YourProjectURL>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<YourPublishableKey>

```

Paste your key into `.env.local`, then apply the migration:

```bash
npx supabase db reset
```

Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up with any email — magic link emails appear in Mailpit at http://127.0.0.1:54324.

To stop Supabase: `npx supabase stop`

## Auth

Magic link via Supabase Auth. Users enter their email, receive a link, click to sign in. No passwords.

## Database

One table (`consultations`) with RLS policies so users can only access their own rows. Migration is in `supabase/migrations/`.

## Tests

```bash
npm run test
```

## Stack

- Next.js (App Router) + TypeScript
- Supabase (PostgreSQL + Auth)
- Material UI v7
- Vitest + React Testing Library
