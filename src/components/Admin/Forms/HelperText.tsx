interface AdminHelperTextProps {
	children: React.ReactNode;
}

export const AdminHelperText: React.FC<AdminHelperTextProps> = ({
	children
}) => (
	<div className='flex flex-col gap-3 text-[14px] leading-4 md:text-base'>
		{children}
	</div>
);
