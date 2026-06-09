const fallbackSupabaseUrl = "https://placeholder.supabase.co";
const fallbackSupabaseAnonKey = "placeholder-anon-key";
const fallbackSiteUrl = "http://localhost:3000";

function validHttpUrl(value: string | undefined) {
  if (!value) return "";

  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.origin : "";
  } catch {
    return "";
  }
}

const configuredSupabaseUrl = validHttpUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const configuredSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";
const configuredSiteUrl = validHttpUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const env = {
  supabaseUrl: configuredSupabaseUrl || fallbackSupabaseUrl,
  supabaseAnonKey: configuredSupabaseAnonKey || fallbackSupabaseAnonKey,
  siteUrl: configuredSiteUrl || fallbackSiteUrl,
  isSupabaseConfigured: Boolean(
    configuredSupabaseUrl &&
      configuredSupabaseAnonKey &&
      configuredSupabaseAnonKey !== fallbackSupabaseAnonKey
  )
};
