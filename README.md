# React UI Tech Stacks Collection

[![CI - Run Tests](https://github.com/cyberforge1/react-ui-tech-stacks-collection/actions/workflows/ci.yml/badge.svg)](https://github.com/cyberforge1/react-ui-tech-stacks-collection/actions/workflows/ci.yml)

A React Todo application with full CRUD functionality, powered by Supabase.

## Tech Stack

React 18 · TypeScript · Vite · Supabase · React Router · Vitest

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase

Create `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Create the database table in Supabase SQL Editor:
```sql
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access" ON todos FOR ALL USING (true);
```

### 3. Run
```bash
npm run dev
```

## Commands

```bash
npm run dev       # Start dev server
npm test          # Run tests
npm run build     # Build for production
npm run lint      # Run linter
```

## Project Structure

```
src/
├── api/                # Supabase API functions
├── config/             # Supabase client setup
├── pages/              # React components
├── tests/              # Test files
└── types/              # TypeScript types
```

## Testing

28 passing tests covering API functions, components, and integration flows.

```bash
npm test                                        # Run all tests
npx vitest run src/tests/api/api.test.tsx      # Run specific test
```

## Troubleshooting

**Missing environment variables:** Ensure `.env` exists with `VITE_` prefixed variables and restart dev server.

**401 errors:** Verify RLS policies are configured and you're using the anon key (not secret key).

## License

MIT


