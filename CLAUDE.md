# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Todo application with Supabase backend integration. Built with React 18, TypeScript, Vite, and Vitest for testing.

## Development Commands

```bash
# Development
npm run dev              # Start Vite dev server

# Testing
npm test                 # Run all tests with Vitest
npx vitest run <path>    # Run specific test file
npm run test:ui          # Open Vitest UI
npm run coverage         # Generate test coverage report

# Build & Lint
npm run build            # TypeScript compile + Vite build
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

## Architecture

### Backend: Supabase Integration

This project uses **Supabase as the backend**, not a Flask server. All data operations go through the Supabase client.

**Supabase Client Setup** (`src/config/supabaseClient.ts`):
- Initializes Supabase client with environment variables
- Throws error if `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are missing
- Single client instance exported for use across the app

**API Layer** (`src/api/api.ts`):
- All CRUD operations use Supabase client methods (`.from('todos')`)
- Functions: `getTodos`, `getTodoById`, `createTodo`, `updateTodo`, `deleteTodo`
- Each function handles errors and logs to console

### Frontend Architecture

**Routing** (`src/App.tsx`):
- Uses React Router with two routes:
  - `/` → `StaticPage` (landing/info page)
  - `/form` → `FormPage` (todo management interface)

**Component Structure**:
- `FormPage` (`src/pages/FormPage/FormPage.tsx`): Main todo management component
  - Manages state for todos list, editing mode, loading, and errors
  - Calls API functions and handles all CRUD operations
  - Displays todos in **reverse order** (newest first via `.slice().reverse()`)
  - Uses `TodoForm` component for both add and edit operations

- `TodoForm` (`src/pages/TodoForm/TodoForm.tsx`): Reusable form component
  - Accepts `onSubmit`, `initialTitle`, and `buttonText` props
  - Handles form validation (title required)
  - Used for both creating and updating todos

**Type System** (`src/types/types.ts`):
- `Todo`: Main todo object with `id`, `title`, `created_at?`
- `TodoCreation`: For creating todos (only `title`)
- `TodoUpdate`: For updating todos (optional `title`)
- `ApiResponse`, `TodoListResponse`, `TodoResponse`: Legacy types (may not be actively used with Supabase)

### Database Schema

Supabase `todos` table:
```sql
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Row Level Security is enabled with public access policy for development.

## Testing Strategy

**Test Structure**:
- Unit tests: `src/tests/api/api.test.tsx` (Supabase API functions)
- Component tests: `src/tests/pages/*/` (React component rendering)
- Integration tests: `src/tests/integration/App.test.tsx` (full app flow)

**Mocking Approach**:
- Supabase client is mocked in tests using Vitest's `vi.mock()`
- Mock pattern: Mock `supabase.from()` to return chainable methods (`.select()`, `.insert()`, etc.)
- See `src/tests/api/api.test.tsx` for reference implementation

**Test Environment**:
- Vitest with jsdom environment (`vitest.config.ts`)
- CI runs tests with dummy Supabase credentials (see `.github/workflows/ci.yml`)

## Environment Variables

Required for development:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Important**: All environment variables must be prefixed with `VITE_` to be accessible in Vite. Restart dev server after changing `.env`.

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):
- Runs on pushes to `main`, `develop`, and `supabase-integration` branches
- Runs on pull requests to `main`
- Uses Node.js 18
- Sets dummy Supabase credentials for test execution

## Key Implementation Details

1. **Todo Display Order**: FormPage reverses the todo array to show newest first (server returns ascending by ID)

2. **Edit Mode**: FormPage tracks `isEditing` state with todo ID, conditionally renders TodoForm inline for editing

3. **Error Handling**: Both FormPage and TodoForm have local error state, API errors caught and displayed to user

4. **Loading State**: FormPage shows "Loading todos..." message while fetching from Supabase

5. **Type Safety**: Full TypeScript coverage with strict typing for all API operations and components
