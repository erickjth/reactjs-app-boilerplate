import { parsePhoneNumberFromString } from 'libphonenumber-js';

const DEVICE_COUNTRY = 'US'; // @TODO: Use a right way to detect the device country

export const isPhoneNumber = (value, userCountry = DEVICE_COUNTRY) => {
	const parsedInfo = parsePhoneNumberFromString(String(value), userCountry);
	return parsedInfo?.isValid() ?? false;
};

/**
 * Pseudo validation for US zip code.
 *
 * @param {string} value
 */
export const isZipCode = value => /^[0-9]{5}(?:-[0-9]{4})?$/gm.test(value);
