import { ProjectCard } from './ProjectCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { Project } from '../../types/Portfolio';

interface ProjectsContainerProps {
	projects: Project[];
}

export const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
	projects
}) => {
	return (
		<div className='mx-[-30px] md:mx-[-70px] xl:mx-[-127px] 2xl:mx-[-227px]'>
			<Swiper
				slidesPerView={'auto'}
				spaceBetween={25}
				breakpoints={{
					0: {
						slidesOffsetAfter: 30,
						slidesOffsetBefore: 30
					},
					1280: {
						slidesOffsetAfter: 127,
						slidesOffsetBefore: 127
					},
					1536: {
						slidesOffsetAfter: 227,
						slidesOffsetBefore: 227
					}
				}}
				modules={[FreeMode]}
				freeMode
				touchEventsTarget='container'>
				{projects.map(project => (
					<SwiperSlide
						key={project.id}
						className='w-[250px] h-[330px] md:w-[350px] md:h-[460px] xl:w-[220px] xl:h-[280px] 2xl:w-[340px] 2xl:h-[475px]'>
						<ProjectCard
							key={project.id}
							id={project.id}
							name={project.name}
							thumbnail={project.thumbnail}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
