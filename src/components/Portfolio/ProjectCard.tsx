import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
	id: string;
	name: string;
	thumbnail: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
	id,
	name,
	thumbnail
}) => {
	const [isLoaded, setIsLoaded] = useState(false);

	const handleImageLoad = () => {
		setIsLoaded(true);
	};

	return (
		<div data-test={`project-card-${id}`} className='size-full'>
			<Link to={`/project/${id}`}>
				<img
					src={thumbnail}
					alt={isLoaded ? `${name}'s project thumbnail` : ''}
					loading='lazy'
					className='size-full object-cover rounded-[5px]'
					onLoad={handleImageLoad}
				/>

				<div className='swiper-lazy-preloader' />
			</Link>
		</div>
	);
};
