import Typewriter from 'typewriter-effect';
import { typewriterStrings } from '../../data/typewriterStrings';
import { getRandomTypewriterString } from '../../utils/getRandomTypewriterString';
import { HomeHeader } from '../../components/Admin/HomeHeader';
import { CTACard } from '../../components/Admin/CTACard';
import { FaProjectDiagram } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { StatCard } from '../../components/Admin/StatCard';
import { Link } from 'react-router-dom';

const AdminHomePage: React.FC = () => {
	const title = (
		<h1 className=''>
			Hi <span className='text-primary'>Pablo</span>!
		</h1>
	);

	const subtitle = (
		<Typewriter
			options={{
				strings: getRandomTypewriterString(typewriterStrings),
				autoStart: true,
				delay: 40
			}}
			component={'span'}
		/>
	);

	return (
		<div className='flex flex-col min-w-screen min-h-screen p-[30px] bg-neutral font-roboto text-white text-center md:p-[70px] xl:py-[52px] xl:px-[127px] 2xl:p-[70px]'>
			<HomeHeader title={title} subtitle={subtitle} />

			<div className='flex flex-col gap-[30px] mt-[] md:items-center md:mt-[100px] xl:max-xl:mt-[50px] xl:flex-row xl:justify-center xl:gap-[50px]'>
				<CTACard
					title='Add a project'
					subtitle='Got something cool? Add your latest creation!'
					icon={<FaProjectDiagram className='size-full' />}
					backgroundColor='bg-primary'
					hoverBackgroundColor='bg-[#00C886]'
				/>

				<CTACard
					title='Add a partner'
					subtitle='Got a new business buddy? Add them to the crew!'
					icon={<FaHandshakeSimple className='size-full' />}
					backgroundColor='bg-secondary'
					hoverBackgroundColor='bg-[#00A9E5]'
				/>
			</div>

			<div className='flex justify-center gap-5 text-[15px] text-semibold mt-[40px] underline md:max-xl:text-xl md:mt-[50px]'>
				<Link to='/admin-panel/portfolio' className='cursor-pointer'>
					View my projects
				</Link>

				<Link to='/admin-panel/partners' className='cursor-pointer'>
					View my partners
				</Link>
			</div>

			<div className='flex justify-center gap-2.5 mt-auto'>
				<StatCard label='Total projects' value={10} />

				<StatCard label='Total partners' value={7} />
			</div>
		</div>
	);
};

export default AdminHomePage;
