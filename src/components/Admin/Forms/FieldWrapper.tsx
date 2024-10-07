interface AdminFieldWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export const AdminFieldWrapper: React.FC<AdminFieldWrapperProps> = ({
	children,
	...props
}) => (
	<div className='flex flex-col gap-4' {...props}>
		{children}
	</div>
);
