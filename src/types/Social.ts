export interface Social {
	type: SocialType;
	link: string;
	icon: JSX.Element;
}

export type SocialType =
	| 'LinkedIn'
	| 'YouTube'
	| 'IMDb'
	| 'GitHub'
	| 'Twitter'
	| 'WhatsApp';
