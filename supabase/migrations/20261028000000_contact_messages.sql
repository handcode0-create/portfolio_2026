-- Messages du formulaire de contact du portfolio.
-- À exécuter une fois dans Supabase : SQL Editor > New query > coller > Run.

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 80),
  email       text not null check (char_length(email) between 3 and 160),
  message     text not null check (char_length(message) between 10 and 2000),
  source      text not null default 'portfolio',
  read_at     timestamptz
);

-- RLS activé sans aucune policy : personne ne peut lire ni écrire avec la clé publique (anon).
-- Seule la clé secrète, utilisée côté serveur par le portfolio, contourne RLS.
alter table public.contact_messages enable row level security;

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
