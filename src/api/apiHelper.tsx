import { supabase } from '../utils/supabaseClient';

export const getHelper = (
  table: string,
  query: string,
  options?: any
) => {
  return supabase.from(table).select(query, options);
}

export const insertHelper = (
  table: string,
  data: any
) => {
  return supabase.from(table).insert(data);
}

export const updateHelper = (
  table: string,
  data: any
) => {
  return supabase.from(table).update(data);
}

export const deleteHelper = (
  table: string,
  id: number
) => {
  return supabase.from(table).delete().eq('id', id);
}