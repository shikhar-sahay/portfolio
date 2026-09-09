create extension if not exists pgcrypto;

create table if not exists wall_notes (
  id text primary key default gen_random_uuid()::text,
  parent_id text references wall_notes(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 24),
  body text not null check (char_length(body) between 1 and 140),
  x integer,
  y integer,
  variant smallint not null default 0 check (variant between 0 and 2),
  is_owner boolean not null default false,
  moderation_state text not null default 'visible' check (moderation_state in ('visible', 'hidden')),
  created_at timestamptz not null default now(),
  hidden_at timestamptz,
  check (
    (parent_id is null and x is not null and y is not null)
    or (parent_id is not null and x is null and y is null)
  )
);

create index if not exists wall_notes_visible_top_created_idx
  on wall_notes (created_at desc)
  where parent_id is null and moderation_state = 'visible';

create index if not exists wall_notes_visible_top_xy_idx
  on wall_notes (x, y)
  where parent_id is null and moderation_state = 'visible';

create index if not exists wall_notes_visible_replies_idx
  on wall_notes (parent_id, created_at asc)
  where parent_id is not null and moderation_state = 'visible';
