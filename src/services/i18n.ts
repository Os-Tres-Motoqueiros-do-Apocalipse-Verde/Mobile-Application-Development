import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import pt from '../locales/pt.json';
import en from '../locales/en.json';
import es from '../locales/es.json';

const systemLang =
  Localization.getLocales()[0]?.languageCode || 'en';

i18n.use(initReactI18next).init({
  lng: systemLang, // idioma padrão = do sistema
  fallbackLng: 'en',
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
