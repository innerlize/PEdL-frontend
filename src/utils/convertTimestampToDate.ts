import { format, toZonedTime } from 'date-fns-tz';
import { Timestamp } from '../types/Portfolio';

export const convertTimestampToDate = ({
	_seconds,
	_nanoseconds
}: Timestamp) => {
	const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;

	const date = new Date(milliseconds);

	const zonedDate = toZonedTime(date, 'UTC');

	const formattedDate = format(zonedDate, 'MM/dd/yyyy');

	return formattedDate;
};
