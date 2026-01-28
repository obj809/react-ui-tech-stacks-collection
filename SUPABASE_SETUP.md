# Supabase Integration Setup

## Configuration Complete ✓

Your React app is now configured to use Supabase as the backend database.

## What Was Changed

### 1. Installed Dependencies
- `@supabase/supabase-js` - Supabase JavaScript client library

### 2. Environment Variables
Created `.env` file with:
```
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key-here
```

**Action Required:** Update `.env` with your actual Supabase credentials:
1. Go to https://app.supabase.com/project/YOUR_PROJECT/settings/api
2. Copy the **Project URL** → paste into `VITE_SUPABASE_URL`
3. Copy the **Publishable key** (from "Publishable and secret API keys" tab) → paste into `VITE_SUPABASE_ANON_KEY`

### 3. Created Supabase Client
- `src/config/supabaseClient.ts` - Initializes Supabase client with environment variables

### 4. Updated API Layer
- `src/api/api.ts` - Replaced axios/Flask API calls with Supabase client methods
- Removed: `getMainMessage()`, `getHelloWorld()` (Flask-specific endpoints)
- Updated: All CRUD operations now use Supabase

## Database Requirements

Your Supabase database should have a `todos` table with this schema:

```sql
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Enable Row Level Security (Recommended)

```sql
-- Enable RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (adjust based on your auth requirements)
CREATE POLICY "Enable all access for todos" ON todos
  FOR ALL USING (true);
```

## Testing the Integration

1. Update your `.env` file with real credentials
2. Ensure your Supabase `todos` table exists
3. Restart the dev server: `npm run dev`
4. Navigate to `/form` route to test CRUD operations

## Next Steps

- Set up proper Row Level Security policies based on your authentication needs
- Consider adding authentication (Supabase Auth)
- Add error boundary components for better error handling
- Update tests to work with Supabase (currently test mocks use axios)

## Troubleshooting

**"Missing Supabase environment variables" error:**
- Make sure `.env` file exists in the project root
- Verify variable names start with `VITE_`
- Restart the dev server after updating `.env`

**Connection errors:**
- Verify Supabase URL and key are correct
- Check that your Supabase project is active
- Ensure the `todos` table exists in your database
