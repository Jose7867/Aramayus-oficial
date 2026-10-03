import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error("Falta SUPABASE_URL");
}

if (!supabaseSecretKey) {
  throw new Error("Falta SUPABASE_SECRET_KEY");
}

export const supabase = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

export const SUPABASE_BUCKET =
  process.env.SUPABASE_BUCKET || "aramayus";
