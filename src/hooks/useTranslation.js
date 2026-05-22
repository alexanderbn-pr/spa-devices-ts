import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * Custom wrapper hook for react-i18next
 * Provides cleaner component usage with type-safe translations
 */
export const useTranslation = () => {
  const { t, i18n, changeLanguage, language } = useI18nTranslation();

  return {
    t, // Translation function: t('key')
    i18n, // i18n instance for advanced usage
    changeLanguage, // Function to switch language
    language, // Current language code
  };
};

export default useTranslation;