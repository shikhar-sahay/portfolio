create table if not exists wall_post_events (
  id bigserial primary key,
  ip_hash text not null,
  kind text not null check (kind in ('notes', 'replies')),
  content_key text not null,
  created_at timestamptz not null default now()
);

create index if not exists wall_post_events_ip_kind_created_idx
  on wall_post_events (ip_hash, kind, created_at desc);

create index if not exists wall_post_events_content_idx
  on wall_post_events (ip_hash, kind, content_key, created_at desc);
