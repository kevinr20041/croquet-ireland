-- Croquet Association of Ireland — database schema
-- Run via scripts/migrate.mjs

create extension if not exists "pgcrypto";

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  display_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists clubs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  county text,
  address text,
  lat double precision,
  lng double precision,
  phone text,
  email text,
  contact_person text,
  website text,
  facebook_url text,
  lawns text,
  croquet_types text[] not null default '{}',
  beginner_friendly boolean not null default true,
  description text,
  image_url text,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  start_date date not null,
  end_date date,
  start_time text,
  end_time text,
  venue text,
  club_id uuid references clubs(id) on delete set null,
  competition_type text,
  description text,
  entry_info text,
  registration_link text,
  documents_url text,
  status text not null default 'upcoming', -- upcoming | ongoing | completed | cancelled
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists results (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete set null,
  club_id uuid references clubs(id) on delete set null,
  competition text not null,
  category text,
  result_date date not null,
  summary text,
  placings jsonb not null default '[]', -- [{position, player, club, score}]
  pdf_url text,
  created_at timestamptz not null default now()
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null,
  featured_image_url text,
  category text not null default 'news', -- news | tournament-report | international | club-news | announcement
  author text,
  event_id uuid references events(id) on delete set null,
  club_id uuid references clubs(id) on delete set null,
  tags text[] not null default '{}',
  social_caption text,
  social_image_url text,
  status text not null default 'draft', -- draft | scheduled | published | archived
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null default 'general', -- rules | governance | forms | policies | general
  file_url text not null,
  version text,
  doc_date date,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists gallery_albums (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  album_date date,
  event_id uuid references events(id) on delete set null,
  cover_image_url text,
  is_historical boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references gallery_albums(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists council_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  email text,
  photo_url text,
  sort_order int not null default 0
);

create table if not exists rankings (
  id uuid primary key default gen_random_uuid(),
  discipline text not null, -- AC | GC
  player_name text not null,
  world_rank int,
  grade numeric,
  games int,
  wins int,
  win_pct numeric,
  last_updated date,
  sort_order int not null default 0
);

create table if not exists handicaps (
  id uuid primary key default gen_random_uuid(),
  discipline text not null, -- AC | GC
  player_name text not null,
  handicap numeric,
  last_updated date,
  sort_order int not null default 0
);

create index if not exists idx_articles_status_published on articles (status, published_at desc);
create index if not exists idx_events_start_date on events (start_date);
create index if not exists idx_results_date on results (result_date desc);
create index if not exists idx_clubs_county on clubs (county);
create index if not exists idx_rankings_discipline on rankings (discipline, sort_order);
create index if not exists idx_handicaps_discipline on handicaps (discipline, sort_order);
