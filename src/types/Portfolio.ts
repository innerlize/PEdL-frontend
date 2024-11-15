import { Link } from './Project';

export interface Project {
	id: string;
	name: string;
	customer: string;
	description: string;
	softwares: string[];
	thumbnail: string;
	media?: Media;
	start_date: Timestamp;
	end_date: Timestamp;
	links?: Link[];
	order: OrderByApp;
	visibility: VisibilityByApp;
}

interface Media {
	images?: string[];
	videos?: string[];
}

export interface Timestamp {
	_seconds: number;
	_nanoseconds: number;
}

export type AppName = 'pedl' | 'cofcof';

interface OrderByApp extends Record<AppName, number> {}

interface VisibilityByApp extends Record<AppName, boolean> {}
