import { Link } from '../../types/Project';

interface LinksListProps {
	links: Link[];
}

export const LinksList: React.FC<LinksListProps> = ({ links }) => {
	return (
		<ul className='font-medium list-disc list-inside'>
			{links.map((link, index) => (
				<li key={index}>
					<a
						href={link.href}
						target='_blank'
						rel='noreferrer'
						className='text-secondary transition-colors hover:text-primary'>
						{link.label}
					</a>
				</li>
			))}
		</ul>
	);
};
