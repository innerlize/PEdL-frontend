import { useContext } from 'react';
import { ConfirmModalContext } from '../contexts/ConfirmModalContext';

export const useConfirmModal = () => {
	const context = useContext(ConfirmModalContext);

	if (!context) {
		throw new Error(
			'useConfirmModal must be used within a ConfirmModalProvider'
		);
	}

	return context;
};
