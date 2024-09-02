import { FreeMode } from 'swiper/modules';
import { Partner } from '../../../types/Partner';
import { AdminPartnerCard } from './PartnerCard';
import { Swiper, SwiperSlide } from 'swiper/react';

interface AdminPartnersCarouselProps {
	partners: Partner[];
}

export const AdminPartnersCarousel: React.FC<AdminPartnersCarouselProps> = ({
	partners
}) => {
	return (
		<div className='mx-[-30px] md:mx-[-70px] xl:mx-[-127px] 2xl:mx-[-227px]'>
			<Swiper
				slidesPerView={'auto'}
				spaceBetween={25}
				breakpoints={{
					0: {
						slidesOffsetAfter: 30,
						slidesOffsetBefore: 30
					},
					1280: {
						slidesOffsetAfter: 127,
						slidesOffsetBefore: 127
					},
					1536: {
						slidesOffsetAfter: 227,
						slidesOffsetBefore: 227
					}
				}}
				modules={[FreeMode]}
				freeMode
				touchEventsTarget='container'>
				{partners.map(partner => (
					<SwiperSlide
						key={partner.id}
						className='w-[200px] h-[200px] md:w-[260px] md:h-[260px] xl:w-[160px] xl:h-[160px] 2xl:w-[260px] 2xl:h-[260px]'>
						<AdminPartnerCard
							key={partner.id}
							id={partner.id}
							name={partner.name}
							thumbnail={partner.image}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
