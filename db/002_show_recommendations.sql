-- Show recommendations for the Side Quests fragment.
-- Safe to run more than once.
-- Run this against the production database before enabling persistence.

create extension if not exists pgcrypto;

create table if not exists show_recommendations (
  id text primary key default gen_random_uuid()::text,

  show_name text not null
    check (char_length(show_name) between 1 and 80),

  normalized_name text not null unique
    check (char_length(normalized_name) between 1 and 80),

  recommendation_count integer not null default 1
    check (recommendation_count >= 1),

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);
