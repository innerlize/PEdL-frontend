import ReactDOM from 'react-dom';
import { useConfirmModal } from '../../hooks/useConfirmModal';
import { PiWarningDiamondFill } from 'react-icons/pi';

const ConfirmModalContent: React.FC = () => {
	const {
		hideModal,
		modalContent: content,
		loading,
		handleConfirm
	} = useConfirmModal();

	return (
		<div
			data-test='confirm-modal-layer'
			className='absolute top-0 left-0 z-10 flex items-center justify-center w-screen h-screen font-montserrat backdrop-blur px-[30px]'>
			<div
				data-test='confirm-modal-content'
				className='flex flex-col items-center justify-center gap-5 bg-white rounded-[3px] py-[20px] md:gap-[30px] md:w-[428px]'>
				<div className='flex flex-col items-center justify-center gap-2.5'>
					<div>
						<PiWarningDiamondFill className='size-[50px] text-warning md:size-[60px]' />
					</div>

					<div
						data-test='confirm-modal-text'
						className='font-semibold text-xl text-center leading-6 tracking-tight md:text-2xl md:leading-[29px]'>
						{content}
					</div>
				</div>

				<div
					data-test='confirm-modal-buttons'
					className='flex gap-[30px] font-semibold md:gap-[40px] md:text-xl'>
					<button
						data-test='confirm-modal-cancel-button'
						className='w-[100px] h-[40px] rounded-[3px] text-neutral underline md:w-[110px] md:h-[44px]'
						onClick={hideModal}>
						Cancel
					</button>

					<button
						data-test='confirm-modal-confirm-button'
						className='flex justify-center items-center w-[100px] h-[40px] bg-warning rounded-[3px] text-white transition-colors hover:bg-red-500 md:w-[110px] md:h-[44px]'
						onClick={handleConfirm}
						disabled={loading}>
						{loading ? (
							<svg
								className='animate-spin h-5 w-5 text-white'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M12 4V1M12 4C14.4 4 16.68 5.55 17.97 7.97L20.78 4.67C18.32 1.87 14.7 0 10.5 0 6.67 0 3.39 2.1 1.72 5.47L4.56 9.4C5.82 6.4 8.35 4 12 4Z'
									fill='currentColor'
								/>
							</svg>
						) : (
							'Delete'
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export const ConfirmModal: React.FC = () => {
	return ReactDOM.createPortal(<ConfirmModalContent />, document.body);
};
