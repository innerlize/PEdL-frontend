import Typewriter from 'typewriter-effect';
import { FaDownload } from 'react-icons/fa';
import homeImage from '../assets/images/Pablo.png';
import { SocialContainer } from '../components/Home/SocialContainer';
import { SocialType } from '../types/Social';
import { SvgElements } from '../components/Home/SvgElements';
import { ButtonsContainer } from '../components/Home/ButtonsContainer';

const socialsToDisplay: SocialType[] = [
	'LinkedIn',
	'YouTube',
	'IMDb',
	'GitHub',
	'Twitter'
];

const buttonsToDisplay = [
	{ innerText: 'Contact me', pathTo: '/contact' },
	{ innerText: 'About me', pathTo: '/about' },
	{
		innerText: 'Get Resume',
		pathTo: '/resume',
		icon: <FaDownload fill='white' size='100%' />
	},
	{ innerText: 'Portfolio', pathTo: '/portfolio' }
];

const HomePage: React.FC = () => {
	return (
		<div className='relative min-h-screen bg-neutral p-[30px] overflow-hidden md:p-[70px] xl:flex xl:flex-row-reverse xl:justify-center xl:items-center xl:py-[30px] xl:gap-[100px] 2xl:py-[45px] 2xl:justify-between 2xl:px-[216px]'>
			<div className='flex flex-col items-center gap-[74px] xl:w-[40%]'>
				<SocialContainer socialsToDisplay={socialsToDisplay} />

				<div
					data-test='home-image'
					className='hidden bg-primary size-[400px] rounded-full overflow-hidden xl:block 2xl:size-[600px]'>
					<img src={homeImage} className='size-full' />
				</div>
			</div>

			<div className='mt-[50px] md:mt-[143px] xl:w-[40%] xl:mt-0 2xl:w-[630px]'>
				<div className='flex flex-col gap-10 mb-[70px] md:mb-[120px] xl:mb-[60px] 2xl:gap-[63px] 2xl:mb-[100px]'>
					<h1 className='font-roboto text-[32px] font-bold text-white text-nowrap leading-[38px] md:text-6xl md:leading-[75px] xl:text-[42px] xl:leading-[50px] 2xl:text-[64px] 2xl:leading-[75px]'>
						Hi, I’m Pablo, <br /> and I’m a{' '}
						<Typewriter
							options={{
								strings: ['CG Supervisor', 'Pipeline TD', 'Tech Artist'],
								autoStart: true,
								loop: true,
								wrapperClassName: 'text-primary'
							}}
							component={'span'}
						/>
					</h1>

					<h2 className='font-roboto text-xl text-white leading-[23px] md:text-[32px] md:leading-[38px] xl:text-[20px] 2xl:text-[32px] 2xl:leading-[38px]'>
						What I love most in life is solving technical and non-technical
						problems.
					</h2>
				</div>

				<ButtonsContainer buttonsToDisplay={buttonsToDisplay} />
			</div>

			<SvgElements />
		</div>
	);
};

export default HomePage;
