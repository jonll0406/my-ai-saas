import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  "https://hoyigsdvixqcfdyegvwo.supabase.co"

const supabaseKey =
  "sb_publishable_BxkthrtLMnPQCZppyGF14g_nT8MFVUO"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
