import { format } from 'date-fns';
import { Timestamp } from '../types/Portfolio';

export const convertTimestampToDate = ({
	_seconds,
	_nanoseconds
}: Timestamp) => {
	const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;

	const date = new Date(milliseconds);

	const formattedDate = format(date, 'MM/dd/yyyy');

	return formattedDate;
};
