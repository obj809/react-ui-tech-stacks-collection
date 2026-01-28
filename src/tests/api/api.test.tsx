// src/tests/api/api.test.tsx

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../api/api';
import { Todo } from '../../types/types';

// Mock Supabase client
vi.mock('../../config/supabaseClient', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import { supabase } from '../../config/supabaseClient';

describe('API Functions', () => {
  const mockFrom = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
      select: mockFrom,
      insert: mockFrom,
      update: mockFrom,
      delete: mockFrom,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches all todos', async () => {
    const mockTodos: Todo[] = [
      { id: 1, title: 'Test Todo 1' },
      { id: 2, title: 'Test Todo 2' },
    ];

    mockFrom.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: mockTodos, error: null }),
    });

    const todos = await getTodos();
    expect(todos).toEqual(mockTodos);
    expect(supabase.from).toHaveBeenCalledWith('todos');
  });

  it('fetches a single todo by ID', async () => {
    const mockTodo: Todo = { id: 1, title: 'Test Todo' };

    mockFrom.mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: mockTodo, error: null }),
      }),
    });

    const todo = await getTodoById(1);
    expect(todo).toEqual(mockTodo);
    expect(supabase.from).toHaveBeenCalledWith('todos');
  });

  it('creates a new todo', async () => {
    const mockTodo: Todo = { id: 3, title: 'New Todo' };

    mockFrom.mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: mockTodo, error: null }),
      }),
    });

    const todo = await createTodo({ title: 'New Todo' });
    expect(todo).toEqual(mockTodo);
    expect(supabase.from).toHaveBeenCalledWith('todos');
  });

  it('updates an existing todo', async () => {
    const mockTodo: Todo = { id: 1, title: 'Updated Todo' };

    mockFrom.mockReturnValue({
      eq: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: mockTodo, error: null }),
        }),
      }),
    });

    const todo = await updateTodo(1, { title: 'Updated Todo' });
    expect(todo).toEqual(mockTodo);
    expect(supabase.from).toHaveBeenCalledWith('todos');
  });

  it('deletes a todo', async () => {
    mockFrom.mockReturnValue({
      eq: vi.fn().mockResolvedValue({ error: null }),
    });

    await deleteTodo(1);
    expect(supabase.from).toHaveBeenCalledWith('todos');
  });

  it('handles errors gracefully when fetching todos', async () => {
    const mockError = { message: 'Database error' };

    mockFrom.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: null, error: mockError }),
    });

    await expect(getTodos()).rejects.toEqual(mockError);
    expect(supabase.from).toHaveBeenCalledWith('todos');
  });
});
