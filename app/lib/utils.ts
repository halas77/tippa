import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SUPABASE_URL = "https://cpknsthyysjogdxbjzsx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwa25zdGh5eXNqb2dkeGJqenN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTExNzksImV4cCI6MjA2MDcyNzE3OX0.unpNhQ9MQSiJohgsuQDI-gJQxwVNaaiIPA7rT_YfWwo";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const customScrollBar =
  "[&::-webkit-scrollbar]:w-[2.5px] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-thumb]:bg-primary max-w-[80rem]";
