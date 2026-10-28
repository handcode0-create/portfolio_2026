import { err, ok, ServerPatternsError, type Result } from "@serverpatterns/core";
import { isSupabaseConfigured, supabase } from "@/lib/api/supabase";

export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

/** Enregistre un message du formulaire de contact dans la table contact_messages. */
export async function saveContactMessage(
  input: ContactMessageInput,
): Promise<Result<{ received: true }, ServerPatternsError>> {
  if (!isSupabaseConfigured) {
    console.error("[contact] SUPABASE_URL ou SUPABASE_SECRET_KEY manquant : message non enregistré.");
    return err(new ServerPatternsError("SERVER_ERROR", "Le formulaire est momentanément indisponible."));
  }

  const result = await supabase.post<undefined>(
    "/contact_messages",
    { name: input.name, email: input.email, message: input.message, source: "portfolio" },
    { headers: { Prefer: "return=minimal" } },
  );

  if (!result.success) {
    // Détails techniques dans les logs Vercel uniquement, jamais envoyés au visiteur
    console.error("[contact] Insertion Supabase échouée", result.error.code, result.error.status, result.error.details);
    return err(new ServerPatternsError("SERVER_ERROR", "Ton message n’a pas pu être envoyé. Réessaie dans un instant."));
  }

  return ok({ received: true });
}
