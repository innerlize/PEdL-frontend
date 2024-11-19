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
	category: Category;
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

export enum Category {
	MOVIE = 'Movie',
	GAME = 'Game',
	OTHER = 'other'
}

interface OrderByApp extends Record<AppName, number> {}

interface VisibilityByApp extends Record<AppName, boolean> {}

interface Link {
	label: string;
	url: string;
}
