export type Club = {
  id: string;
  slug: string;
  name: string;
  county: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  email: string | null;
  contact_person: string | null;
  website: string | null;
  facebook_url: string | null;
  lawns: string | null;
  croquet_types: string[];
  beginner_friendly: boolean;
  description: string | null;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
};

export type EventRow = {
  id: string;
  slug: string;
  name: string;
  start_date: string;
  end_date: string | null;
  start_time: string | null;
  end_time: string | null;
  venue: string | null;
  club_id: string | null;
  club_name?: string | null;
  competition_type: string | null;
  description: string | null;
  entry_info: string | null;
  registration_link: string | null;
  documents_url: string | null;
  status: string;
};

export type ResultRow = {
  id: string;
  event_id: string | null;
  club_id: string | null;
  club_name?: string | null;
  competition: string;
  category: string | null;
  result_date: string;
  summary: string | null;
  placings: { position?: string; title?: string; winner?: string; runner_up?: string }[];
  pdf_url: string | null;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  featured_image_url: string | null;
  category: string;
  author: string | null;
  event_id: string | null;
  club_id: string | null;
  tags: string[];
  social_caption: string | null;
  social_image_url: string | null;
  status: string;
  published_at: string | null;
};

export type DocumentRow = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  version: string | null;
  doc_date: string | null;
};

export type GalleryAlbum = {
  id: string;
  slug: string;
  title: string;
  album_date: string | null;
  event_id: string | null;
  cover_image_url: string | null;
  is_historical: boolean;
};

export type GalleryPhoto = {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
};

export type CouncilMember = {
  id: string;
  name: string;
  role: string;
  email: string | null;
  photo_url: string | null;
  sort_order: number;
};

export type RankingRow = {
  id: string;
  discipline: "AC" | "GC";
  player_name: string;
  world_rank: number | null;
  grade: number | null;
  games: number | null;
  wins: number | null;
  win_pct: number | null;
  last_updated: string | null;
};

export type HandicapRow = {
  id: string;
  discipline: "AC" | "GC";
  player_name: string;
  handicap: number | null;
  last_updated: string | null;
};
