import i18n, { TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './lang/en.json';

export function configureI18n(): Promise<TFunction> {
	return i18n
		.use(LanguageDetector)
		.use(initReactI18next) // passes i18n down to react-i18next
		.init({
			resources: {
				en: { translation: en },
			},
			lng: 'en',
			fallbackLng: 'en',
			interpolation: {
				escapeValue: false,
			},
		});
}
