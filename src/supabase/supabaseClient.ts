import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_DATABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
export const supabase = createClient(supabaseURL, supabaseKey);

