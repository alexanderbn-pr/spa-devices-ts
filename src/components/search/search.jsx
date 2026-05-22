import { useTranslation } from 'react-i18next';
import './search.scss';

const Search = ({ valueSearch, setValue }) => {
  const { t } = useTranslation();

  return (
    <form className="search-container">
      <input
        type="text"
        placeholder={t('search.placeholder')}
        value={valueSearch}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
        aria-label={t('search.placeholder')}
      />
    </form>
  );
};

export default Search;
