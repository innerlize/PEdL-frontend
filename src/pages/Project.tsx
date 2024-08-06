import { Link, useLocation } from 'react-router-dom';
import { Section } from '../components/Project/Section';
import { LinksList } from '../components/Project/LinksList';
import { ImagesCarousel } from '../components/Project/ImagesCarousel';
import { useQuery } from '@tanstack/react-query';
import { getProject } from '../api/projects';
import { convertTimestampToDate } from '../utils/convertTimestampToDate';
import { Spinner } from '../components/Spinner';
import { Fragment } from 'react';

const ProjectPage: React.FC = () => {
	const projectId = useLocation().state;

	const {
		data: project,
		isLoading,
		error
	} = useQuery({
		queryKey: ['projects', projectId],
		queryFn: () => getProject(projectId)
	});

	return (
		<div className='relative flex flex-col min-w-screen min-h-screen p-[30px] font-roboto text-white bg-neutral md:p-[70px] xl:py-[52px] xl:px-[127px] 2xl:py-[60px] 2xl:px-[295px]'>
			{isLoading && (
				<div className='flex justify-center items-center flex-1'>
					<Spinner />
				</div>
			)}

			{error && <div>Error loading project!</div>}

			{project && (
				<>
					<div className='fixed bg-primary rounded-[5px] cursor-pointer transition-colors hover:bg-[#00C886] xl:top-[50px] xl:left-[50px]'>
						<Link
							to='/portfolio'
							className='inline-block px-[25px] py-[10px] text-2xl font-bold uppercase'>
							Back
						</Link>
					</div>

					<div className='flex flex-col gap-[115px] pt-[98px] md:max-xl:gap-[72px]'>
						<div className='flex flex-col items-center md:gap-5'>
							<h1 className='text-[64px] font-bold text-primary text-center uppercase md:text-8xl'>
								{project.name}
							</h1>

							<div className='text-xl md:text-2xl'>
								<span data-test='project-start_date'>
									{convertTimestampToDate(project.start_date)}
								</span>{' '}
								-{' '}
								<span data-test='project-end_date'>
									{convertTimestampToDate(project.end_date)}
								</span>
							</div>
						</div>

						<div className='flex flex-col gap-[50px] xl:flex-row xl:gap-[100px] 2xl:gap-[130px]'>
							<div className='flex flex-col gap-[50px] xl:flex-1'>
								<Section title='Customer'>
									<p>
										This project was developed for{' '}
										<span className='font-medium'>{project.customer}</span>,
										addressing their specific needs and requirements. The
										collaboration focused on delivering a tailored solution to
										enhance their business operations.
									</p>
								</Section>

								<Section title='Softwares'>
									<p>
										The development of this project utilized a range of software
										tools, including{' '}
										{project.softwares.map((software, index) => (
											<Fragment key={index}>
												<span className='font-medium'>{software}</span>
												{index < project.softwares.length - 2 && ', '}
												{index === project.softwares.length - 2 && ' and '}
											</Fragment>
										))}
										. These tools were crucial in ensuring a seamless and
										efficient development process.
									</p>
								</Section>

								{project.links && (
									<Section title='Links'>
										<>
											<p>
												For additional information, resources, and references
												related to this project, please visit the following
												link(s):
											</p>

											<LinksList links={project.links} />
										</>
									</Section>
								)}
							</div>

							<div className='flex flex-col gap-[50px] xl:w-[600px] 2xl:w-[800px]'>
								<Section title='Description'>
									<p>{project.description}</p>
								</Section>

								{project.media && (
									<Section title='Media'>
										<>
											<p>
												Explore visual assets and interactive content.{' '}
												<span className='font-medium'>
													Click images for full-screen view!
												</span>
											</p>

											{project.media && (
												<div
													data-test='project-media-container'
													className='flex flex-col gap-[20px]'>
													{project.media.videos &&
														project.media.videos.map((video, index) => (
															<Fragment
																data-test={`embed-video-${index}`}
																key={index}>
																<iframe
																	src={video}
																	title='YouTube video player'
																	frameBorder='0'
																	allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
																	referrerPolicy='strict-origin-when-cross-origin'
																	allowFullScreen
																	className='size-full outline-none rounded-[3px] aspect-video'
																/>
															</Fragment>
														))}

													{project.media.images && (
														<ImagesCarousel images={project.media.images} />
													)}
												</div>
											)}
										</>
									</Section>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ProjectPage;
