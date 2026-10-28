import { createApiClient } from "@serverpatterns/core";

/**
 * Client de l'API REST de Supabase (PostgREST), côté serveur uniquement.
 * Pas de SDK : createApiClient suffit pour insérer une ligne, et renvoie un Result.
 *
 * Variables d'environnement (jamais préfixées NEXT_PUBLIC_) :
 * - SUPABASE_URL        : https://<projet>.supabase.co
 * - SUPABASE_SECRET_KEY : clé secrète (sb_secret_…) ou ancienne clé service_role
 */
const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

export const isSupabaseConfigured = Boolean(url && secretKey);

export const supabase = createApiClient({
  baseUrl: `${url ?? "https://supabase-non-configure.invalid"}/rest/v1`,
  timeoutMs: 8000,
  defaultHeaders: (): Record<string, string> => {
    if (!secretKey) return {};
    // Les nouvelles clés (sb_secret_…) passent par l'en-tête apikey ;
    // une ancienne clé service_role (un JWT) va aussi dans Authorization.
    return secretKey.startsWith("eyJ")
      ? { apikey: secretKey, Authorization: `Bearer ${secretKey}` }
      : { apikey: secretKey };
  },
});
