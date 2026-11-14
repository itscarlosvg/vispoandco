-- Registro de aceptaciones de la política de privacidad desde el formulario de la web.
-- Aplicado en Supabase el 2026-11-14. Solo se escribe a través de web_consent;
-- la fecha, la hora y la IP las pone el servidor, no el navegador.
create table if not exists public.consentimientos (
  id          bigint generated always as identity primary key,
  creado      timestamptz not null default now(),
  ref         text not null,
  nombre      text not null,
  email       text not null,
  ip          text,
  user_agent  text,
  politica    text not null,
  pagina      text,
  acepta      boolean not null default true
);
alter table public.consentimientos enable row level security;
revoke all on public.consentimientos from anon, authenticated;
create index if not exists consentimientos_email_idx on public.consentimientos (lower(email));

create or replace function public.web_consent(p jsonb)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  h jsonb := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  v_ref text := left(coalesce(p->>'ref', ''), 20);
  v_mail text := left(trim(coalesce(p->>'email', '')), 160);
  v_ip text;
begin
  if v_ref !~ '^P-[A-Z0-9]{4,10}$' then raise exception 'ref inválida'; end if;
  if v_mail !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then raise exception 'email inválido'; end if;
  if coalesce((p->>'acepta')::boolean, false) is not true then raise exception 'sin aceptación'; end if;
  v_ip := coalesce(nullif(h->>'cf-connecting-ip', ''), nullif(trim(split_part(h->>'x-forwarded-for', ',', 1)), ''), nullif(h->>'x-real-ip', ''));
  insert into public.consentimientos (ref, nombre, email, ip, user_agent, politica, pagina)
  values (v_ref, left(coalesce(p->>'nombre', ''), 120), v_mail, left(v_ip, 64), left(h->>'user-agent', 400),
          left(coalesce(p->>'politica', ''), 40), left(p->>'pagina', 200));
end; $$;

revoke all on function public.web_consent(jsonb) from public;
grant execute on function public.web_consent(jsonb) to anon, authenticated;
