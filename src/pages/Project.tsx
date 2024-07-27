import { Link } from 'react-router-dom';
import { Section } from '../components/Project/Section';
import { LinksList } from '../components/Project/LinksList';
import { ImagesCarousel } from '../components/Project/ImagesCarousel';

const ProjectPage: React.FC = () => {
	return (
		<div className='relative flex flex-col min-w-screen min-h-screen p-[30px] font-roboto text-white bg-neutral md:p-[70px] xl:py-[52px] xl:px-[127px] 2xl:py-[60px] 2xl:px-[295px]'>
			<div className='fixed bg-primary rounded-[5px] cursor-pointer transition-colors hover:bg-[#00C886] xl:top-[50px] xl:left-[50px]'>
				<Link
					to='/portfolio'
					className='inline-block px-[25px] py-[10px] text-2xl font-bold uppercase'>
					Back
				</Link>
			</div>

			<div className='flex flex-col gap-[115px] pt-[98px] md:max-xl:gap-[72px]'>
				<div className='flex flex-col items-center md:gap-5'>
					<h1 className='text-[64px] font-bold text-primary uppercase md:text-8xl'>
						Metegol
					</h1>

					<div className='text-xl md:text-2xl'>
						<span>01/05/2012</span> - <span>31/01/2013</span>
					</div>
				</div>

				<div className='flex flex-col gap-[50px] xl:flex-row xl:gap-[100px] 2xl:gap-[130px]'>
					<div className='flex flex-col gap-[50px] xl:flex-1'>
						<Section title='Customer'>
							<p>
								This project was developed for{' '}
								<span className='font-medium'>[Customer Name]</span>, addressing
								their specific needs and requirements. The collaboration focused
								on delivering a tailored solution to enhance their business
								operations.
							</p>
						</Section>

						<Section title='Softwares'>
							<p>
								The development of this project utilized a range of software
								tools, including{' '}
								<span className='font-medium'>[Software 1]</span>,{' '}
								<span className='font-medium'>[Software 2]</span>, and{' '}
								<span className='font-medium'>[Software 3]</span>. These tools
								were crucial in ensuring a seamless and efficient development
								process.
							</p>
						</Section>

						<Section title='Links'>
							<>
								<p>
									For additional information, resources, and references related
									to this project, please visit the following link(s):
								</p>

								<LinksList
									links={[
										{
											label: 'Link 1',
											href: 'https://example.com'
										},
										{
											label: 'Link 2',
											href: 'https://example.com'
										}
									]}
								/>
							</>
						</Section>
					</div>

					<div className='flex flex-col gap-[50px] xl:w-[600px] 2xl:w-[800px]'>
						<Section title='Description'>
							<p>
								Metegol the film, made in Argentina by the production companies
								Catmandu and 100 bars, in which I participated in the rig and
								pipeline sector. In addition to being part of the development of
								characters, objects and some tools for the work workflow.
							</p>
						</Section>

						<Section title='Media'>
							<>
								<p>
									Explore visual assets and interactive content.{' '}
									<span className='font-medium'>
										Click images for full-screen view!
									</span>
								</p>

								<div className='flex flex-col gap-[20px]'>
									<iframe
										src='https://www.youtube.com/embed/hp8ER0gbRH4?si=6yvah-Ld-fO7yzkv'
										title='YouTube video player'
										frameBorder='0'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
										referrerPolicy='strict-origin-when-cross-origin'
										allowFullScreen
										className='size-full outline-none rounded-[3px] aspect-video'
									/>

									<ImagesCarousel
										images={[
											'https://c4.wallpaperflare.com/wallpaper/553/854/434/1920x1080-px-digital-art-fantasy-art-landscape-long-hair-ryky-trees-wind-anime-death-note-hd-art-wallpaper-preview.jpg',
											'https://images.hdqwalls.com/download/new-memories-41-1920x1080.jpg',
											'https://wallpapers.com/images/featured/1080x1920-pictures-ugd930ckdcujq44s.jpg',
											'https://images.hdqwalls.com/download/far-from-tomorrow-fk-1920x1080.jpg',
											'https://images.hdqwalls.com/download/magic-night-with-you-9o-1920x1080.jpg',
											'https://i.pinimg.com/originals/ad/2c/7f/ad2c7fdc725cb3b9add7f14b7324ad76.jpg'
										]}
									/>
								</div>
							</>
						</Section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectPage;
