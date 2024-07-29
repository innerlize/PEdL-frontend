import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Image } from '../Image';
import { useMediaQuery } from 'react-responsive';

interface ImageCarouselProps {
	images: string[];
}

export const ImagesCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
	const isTablet = useMediaQuery({ minDeviceWidth: 800, maxDeviceWidth: 1280 });
	const isDesktop = useMediaQuery({ minDeviceWidth: 1280 });

	return (
		<div>
			<Swiper
				style={{
					'--swiper-navigation-size': `${isTablet ? '38px' : '28px'}`,
					'--swiper-navigation-color': '#ffffff',
					'--swiper-navigation-sides-offset': `${isTablet ? '68px' : isDesktop ? '0' : '28px'}`
				}}
				modules={[Navigation]}
				navigation
				breakpoints={{
					0: {
						slidesPerView: 1
					},
					800: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					1280: {
						slidesPerView: 3
					},
					1536: {
						slidesPerView: 4,
						spaceBetween: 20
					}
				}}
				touchEventsTarget='container'
				className={`${isTablet && 'images-carousel'} md:max-xl:px-[120px]`}>
				{images.map((image, index) => (
					<SwiperSlide key={index} className='flex justify-center'>
						<Image src={image} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
