import React, { createContext, useState, ReactNode } from 'react';
import { ConfirmModal } from '../components/Admin/ConfirmModal';

interface ConfirmModalContextValues {
	isVisible: boolean;
	modalContent: React.ReactNode;
	loading: boolean;
	showModal: (content: ReactNode, onConfirm: () => Promise<void>) => void;
	hideModal: () => void;
	handleConfirm: () => Promise<void>;
}

export const ConfirmModalContext = createContext<
	ConfirmModalContextValues | undefined
>(undefined);

interface ConfirmModalProviderProps {
	children: ReactNode;
}

const ConfirmModalProvider: React.FC<ConfirmModalProviderProps> = ({
	children
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [modalContent, setModalContent] = useState<ReactNode>(null);
	const [loading, setLoading] = useState(false);
	const [onConfirm, setOnConfirm] = useState<() => Promise<void> | null>(
		() => null
	);

	const showModal = (content: ReactNode, confirmFunc: () => Promise<void>) => {
		setModalContent(content);
		setOnConfirm(() => confirmFunc);
		setIsVisible(true);
	};

	const hideModal = () => {
		setIsVisible(false);
		setModalContent(null);
		setLoading(false);
	};

	const handleConfirm = async () => {
		if (onConfirm) {
			setLoading(true);
			await onConfirm();
			setLoading(false);
			hideModal();
		}
	};

	return (
		<ConfirmModalContext.Provider
			value={{
				isVisible,
				modalContent,
				loading,
				showModal,
				hideModal,
				handleConfirm
			}}>
			{children}

			{isVisible && <ConfirmModal />}
		</ConfirmModalContext.Provider>
	);
};

export default ConfirmModalProvider;
