import { Social } from '../types/Social';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaImdb } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';

export const socials: Social[] = [
	{
		type: 'LinkedIn',
		link: 'https://www.linkedin.com/in/pabloemmanueldeleo/',
		icon: <FaLinkedinIn fill='white' size='100%' />
	},
	{
		type: 'YouTube',
		link: 'https://www.youtube.com/c/PabloEmmanuelDeLeo',
		icon: <FaYoutube fill='white' size='100%' />
	},
	{
		type: 'IMDb',
		link: 'https://www.imdb.com/name/nm4443723/',
		icon: <FaImdb fill='white' size='100%' />
	},
	{
		type: 'GitHub',
		link: 'https://github.com/pabloemmanueldeleo',
		icon: <FaGithub fill='white' size='100%' />
	},
	{
		type: 'WhatsApp',
		link: 'https://wa.me/+5491121587183',
		icon: <FaWhatsapp fill='white' size='100%' />
	},
	{
		type: 'Twitter',
		link: 'https://twitter.com/pabloemmanueldl',
		icon: <FaTwitter fill='white' size='100%' />
	}
];
