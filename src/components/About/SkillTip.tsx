import { FaCircle } from 'react-icons/fa';
import { TypeOfSkill } from '../../types/About';

interface SkillTipProps {
	typeOfSkill: TypeOfSkill;
	text: string;
}

export const SkillTip: React.FC<SkillTipProps> = ({ typeOfSkill, text }) => {
	const isTechnicalSkill: boolean = typeOfSkill === 'Technical';

	return (
		<div className='flex gap-[18px]'>
			<FaCircle
				data-test={`skill-tip-icon`}
				className={`size-[25px] md:max-xl:size-[30px] ${isTechnicalSkill ? 'text-primary' : 'text-secondary'}`}
			/>
			<p className='flex-1 font-roboto text-xl leading-[23px] md:max-xl:text-2xl md:max-xl:leading-7'>
				{text}
			</p>
		</div>
	);
};
