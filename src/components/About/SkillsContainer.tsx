import { skills } from '../../data/skills';
import { SkillTip } from './SkillTip';

export const SkillsContainer: React.FC = () => {
	return (
		<div className='flex flex-col gap-[130px] xl:flex-row'>
			<TechnicalSkills />

			<LeadershipSkills />
		</div>
	);
};
