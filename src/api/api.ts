// src/api/api.ts

import { supabase } from '../config/supabaseClient';
import { Todo, TodoCreation, TodoUpdate } from '../types/types';

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }

    console.log('Fetched todos:', data);
    return data || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Get a single todo by ID
export const getTodoById = async (id: number): Promise<Todo> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching todo with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todo: TodoCreation): Promise<Todo> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .insert([todo])
      .select()
      .single();

    if (error) {
      console.error('Error creating todo:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update an existing todo
export const updateTodo = async (id: number, todoUpdate: TodoUpdate): Promise<Todo> => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .update(todoUpdate)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating todo with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error updating todo with ID ${id}:`, error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting todo with ID ${id}:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`Error deleting todo with ID ${id}:`, error);
    throw error;
  }
};
