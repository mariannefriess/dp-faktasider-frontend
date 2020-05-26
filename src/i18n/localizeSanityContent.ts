import { SupportedLanguage } from './supportedLanguages';

export const defaultLang = 'no';

// Kopiert fra https://www.sanity.io/docs/localization
function localizeSanityContent(value: any, language: SupportedLanguage) {
  const languages = [language, defaultLang];

  if (Array.isArray(value)) {
    return value.map((v) => localizeSanityContent(v, language));
  } else if (value && typeof value == 'object') {
    if (/^locale[A-Z]/.test(value._type)) {
      const language = languages.find((lang) => value[lang]);
      return language ? value[language] : 'Translation not found.';
    }

    return Object.keys(value).reduce((result, key) => {
      result[key] = localizeSanityContent(value[key], language);
      return result;
    }, {});
  }

  return value;
}

export default localizeSanityContent;