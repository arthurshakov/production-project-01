import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: 'ru', // default language for tests
		fallbackLng: 'ru', // fallback language if a translation is missing
		// ns: ['translationsNS'], // common namespace used in the app
		// defaultNS: 'translationsNS', // default namespace
		debug: false, // set to true for debugging in test environment if needed
		interpolation: {
			escapeValue: false, // React already escapes values, so no need for i18next to do it
		},
		resources: {
			ru: {
				translations: {},
			},
			// You can add other languages with their respective translations if needed for specific tests
		},
	});

export default i18n;
