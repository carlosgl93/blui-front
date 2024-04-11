import { Comuna } from './Comuna';

export type Prestador = {
  id?: string;
  rut?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  comuna_id?: number | null;
  service_id?: number;
  speciality_id?: number;
  availability?: string[];
  average_review?: number;
  imageUrl?: string;
  description?: string;
  total_reviews?: number;
  token?: string;
  role?: string;
  comunas: string[] | Comuna[];
  offers_free_meet_greet?: boolean;
};
