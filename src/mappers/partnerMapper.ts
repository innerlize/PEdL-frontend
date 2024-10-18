import { PartnerFormValues, CreatePartnerRequest } from '../types/AddPartner';

export const mapPartnerFormValuesToRequest = (
	values: PartnerFormValues
): CreatePartnerRequest => {
	const requestData: CreatePartnerRequest = {
		name: values.partnerName,
		image: values.partnerLogo,
		links: values.links
	};

	return requestData;
};
