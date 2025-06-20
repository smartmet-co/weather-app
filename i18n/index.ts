import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from "react-native-localize";

import { getItem, LOCALE } from '../src/utils/async_storage';
import en from './en.json';
import es from './es.json';

const languageResources = { en, es };

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();

  if (locales.length > 0) {
    return locales[0].languageTag;
  }

  return "en";
};


let systemLng = getDeviceLanguage().split('-')[0];

if (Object.keys(languageResources).indexOf(systemLng) < 0) {
  systemLng = "";
}

const languageDetector = <LanguageDetectorAsyncModule>{
  init: () => {},
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    const savedDataJSON = await getItem(LOCALE);
    const lng = savedDataJSON || null;
    const selectLanguage = lng || systemLng || 'en';
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: languageResources,
    ns: ['navigation'],
    defaultNS: 'navigation',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: false,
    },
  });

export default i18n;
