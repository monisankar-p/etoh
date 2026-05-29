import { useLanguageStore, type LanguageCode, availableLanguages } from '../stores/useLanguageStore';
import { en } from './locales/en';
import { hi } from './locales/hi';
import { bn } from './locales/bn';
import { or } from './locales/or';
import { ta } from './locales/ta';
import { te } from './locales/te';
import { mr } from './locales/mr';

type TranslationMap = Record<string, string>;

const translations: Record<LanguageCode, TranslationMap> = {
  en,
  hi,
  bn,
  or,
  ta,
  te,
  mr,
};

/**
 * Lightweight translation hook.
 * Usage:
 *   const { t, language, setLanguage, languages } = useTranslation();
 *   <h1>{t('dashboard.title')}</h1>
 *   <p>{t('meds.remaining', { count: '14' })}</p>
 */
export function useTranslation() {
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  /**
   * Translate a key. Falls back to English if key is missing in target language.
   * Supports interpolation: t('key', { name: 'Alex' }) replaces {name} in the string.
   */
  const t = (key: string, params?: Record<string, string>): string => {
    const map = translations[language] || translations.en;
    let value = map[key] ?? translations.en[key] ?? key;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
      });
    }

    return value;
  };

  return {
    t,
    language,
    setLanguage,
    languages: availableLanguages,
  };
}

export { availableLanguages, type LanguageCode };
