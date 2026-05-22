import { useTranslation } from 'react-i18next';
import './LanguageSelector.scss';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className="language-selector"
      onClick={toggleLanguage}
      aria-label={i18n.language === 'es' ? 'Cambiar a English' : 'Cambiar a Español'}
    >
      <span className="language-selector__flag" aria-hidden="true">
        {i18n.language === 'es' ? '🇬🇧' : '🇪🇸'}
      </span>
      <span className="language-selector__code">
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </span>
    </button>
  );
};

export default LanguageSelector;