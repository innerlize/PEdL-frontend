interface AdminFormPageHeader {
	title: string;
}

export const AdminFormPageHeader: React.FC<AdminFormPageHeader> = ({
	title
}) => {
	return (
		<h2 className='text-xl font-roboto font-semibold uppercase leading-[23px] text-center md:text-4xl'>
			{title}
		</h2>
	);
};
