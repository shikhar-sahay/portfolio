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
  ('seed-ananya', 'Ananya', 'A small note can still change the room.', 280, -120, 0, false, '2026-09-01T08:00:00Z'),
  ('seed-ritvik', 'Ritvik', 'Different perspectives make the world a lot more interesting.', 500, -180, 1, false, '2026-09-01T08:01:00Z'),
  ('seed-kartik', 'Kartik', 'More people like you please.', 250, 80, 0, false, '2026-09-01T08:02:00Z'),
  ('seed-meera', 'Meera', 'Found this through a friend. Ended up spending way too long here.', -20, 260, 1, false, '2026-09-01T08:03:00Z'),
  ('seed-shruti', 'Shruti', 'You are proof that it is possible to care about both the technical and human side.', 420, 230, 0, false, '2026-09-01T08:04:00Z'),
  ('seed-aarav', 'Aarav', 'Pokemon, Beyblade, and cybersecurity on the same site? Elite taste.', 650, 360, 1, false, '2026-09-01T08:05:00Z'),
  ('seed-dev', 'Dev', 'Leaving my mark here.', -100, 520, 0, false, '2026-09-01T08:06:00Z'),
  ('seed-tanvi', 'Tanvi', 'Good ideas find good people.', 320, 520, 1, false, '2026-09-01T08:07:00Z'),
  ('seed-aditya', 'Aditya', 'Keep building. The internet needs more people who build with intention.', 620, 600, 0, false, '2026-09-01T08:08:00Z'),
  ('seed-sameer', 'Sameer', 'Football makes life better.', 180, 760, 0, false, '2026-09-01T08:09:00Z'),
  ('seed-nish', 'Nish', 'Randomly stumbled here and now I am saving this as reference.', 760, 820, 1, false, '2026-09-01T08:10:00Z'),
  ('seed-owner', 'Shikhar', 'Different people. Same direction.', -260, 740, 2, true, '2026-09-01T08:11:00Z'),
  ('seed-lina', 'Lina', 'Strangers today, stories tomorrow.', 900, 120, 1, false, '2026-09-01T08:12:00Z')
on conflict (id) do nothing;
