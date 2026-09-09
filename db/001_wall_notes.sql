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

insert into wall_notes (id, author_name, body, x, y, variant, is_owner, created_at)
values
  ('seed-ananya', 'Guest 01', 'A small note can still change the room.', 280, -120, 0, false, '2026-09-01T08:00:00Z'),
  ('seed-ritvik', 'Guest 02', 'Different perspectives make the world more interesting.', 500, -180, 1, false, '2026-09-01T08:01:00Z'),
  ('seed-kartik', 'Guest 03', 'Leave the place kinder than you found it.', 250, 80, 0, false, '2026-09-01T08:02:00Z'),
  ('seed-meera', 'Guest 04', 'Found a corner worth remembering.', -20, 260, 1, false, '2026-09-01T08:03:00Z'),
  ('seed-shruti', 'Guest 05', 'Technical things feel better with a human edge.', 420, 230, 0, false, '2026-09-01T08:04:00Z'),
  ('seed-aarav', 'Guest 06', 'Football, old toys, and security notes can share a table.', 650, 360, 1, false, '2026-09-01T08:05:00Z'),
  ('seed-dev', 'Guest 07', 'Leaving a mark, quietly.', -100, 520, 0, false, '2026-09-01T08:06:00Z'),
  ('seed-tanvi', 'Guest 08', 'Good ideas find good people.', 320, 520, 1, false, '2026-09-01T08:07:00Z'),
  ('seed-aditya', 'Guest 09', 'Keep building with intention.', 620, 600, 0, false, '2026-09-01T08:08:00Z'),
  ('seed-sameer', 'Guest 10', 'Some weekends are worth losing to a match.', 180, 760, 0, false, '2026-09-01T08:09:00Z'),
  ('seed-nish', 'Guest 11', 'Saving this as a reference for later.', 760, 820, 1, false, '2026-09-01T08:10:00Z'),
  ('seed-owner', 'Shikhar', 'Different people. Same direction.', -260, 740, 2, true, '2026-09-01T08:11:00Z'),
  ('seed-lina', 'Guest 12', 'Strangers today, stories tomorrow.', 900, 120, 1, false, '2026-09-01T08:12:00Z')
on conflict (id) do nothing;
