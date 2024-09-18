import { PuffLoader } from 'react-spinners';

interface SpinnerProps {
	color: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ color }) => {
	return <PuffLoader color={color} />;
};
