import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * Custom wrapper hook for react-i18next
 * Provides cleaner component usage with type-safe translations
 */
export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  return {
    t,
    i18n,
    changeLanguage: i18n.changeLanguage,
    language: i18n.language,
  };
};

export default useTranslation;
