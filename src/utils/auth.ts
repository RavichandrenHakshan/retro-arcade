import { supabase } from './supabase';

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Login error:", error.message);
    return false;
  }
  return true;
};

export const logout = async () => {
  await supabase.auth.signOut();
};

export const checkAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};
