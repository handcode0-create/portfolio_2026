"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { withServerAction, ok, err } from "@serverpatterns/next";
import { createRateLimiter, ServerPatternsError } from "@serverpatterns/core";
import { saveContactMessage } from "@/lib/services/contact-messages";

// Généré avec `serverpatterns add action send-contact-message`, puis complété.

const inputSchema = z.object({
  name: z.string().trim().min(2, "Indique ton nom.").max(80, "Ton nom est trop long."),
  email: z.string().trim().email("Adresse email invalide.").max(160, "Adresse email trop longue."),
  message: z
    .string()
    .trim()
    .min(10, "Ton message doit faire au moins 10 caractères.")
    .max(2000, "Ton message dépasse 2 000 caractères."),
  // Champ piège invisible : un humain le laisse vide, un robot le remplit souvent.
  website: z.string().optional(),
});

// 3 messages par tranche de 10 minutes et par adresse IP.
// Store en mémoire : propre à chaque instance serverless, c'est un frein, pas un mur.
const limiter = createRateLimiter({ limit: 3, windowMs: 10 * 60 * 1000 });

export const sendContactMessage = withServerAction({
  inputSchema,
  action: async (input) => {
    // Robot probable : on répond comme si tout allait bien, sans rien enregistrer.
    if (input.website) return ok({ received: true as const });

    const forwardedFor = (await headers()).get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || "inconnue";
    const limit = await limiter.check(`contact:${ip}`);
    if (!limit.allowed) {
      return err(
        new ServerPatternsError("VALIDATION_ERROR", "Tu as déjà envoyé plusieurs messages. Réessaie dans quelques minutes.", {
          status: 429,
        }),
      );
    }

    return saveContactMessage({ name: input.name, email: input.email, message: input.message });
  },
});
