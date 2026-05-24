import { useTranslation } from 'react-i18next';
import './search.scss';

interface SearchProps {
  valueSearch: string;
  setValue: (v: string) => void;
}

const Search = ({ valueSearch, setValue }: SearchProps) => {
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
