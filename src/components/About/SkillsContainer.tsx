import { skills } from '../../data/skills';
import { SkillTip } from './SkillTip';

export const SkillsContainer: React.FC = () => {
	return (
		<div className='flex flex-col gap-[130px] mt-[100px] xl:flex-row xl:mt-[130px]'>
			<TechnicalSkills />

			<LeadershipSkills />
		</div>
	);
};

const TechnicalSkills: React.FC = () => {
	return (
		<div
			data-test='technical-skills'
			className='flex flex-col gap-10 xl:flex-1'>
			{skills.technical.map((skill, index) => (
				<SkillTip key={index} typeOfSkill='Technical' text={skill} />
			))}
		</div>
	);
};

const LeadershipSkills: React.FC = () => {
	return (
		<div
			data-test='leadership-skills'
			className='flex flex-col gap-10 xl:flex-1'>
			{skills.leadership.map((skill, index) => (
				<SkillTip key={index} typeOfSkill='Leadership' text={skill} />
			))}
		</div>
	);
};
