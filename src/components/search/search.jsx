import './search.scss';
import PropTypes from 'prop-types';

const Search = ({ valueSearch, setValue }) => {
  return (
    <form className="search-container">
      <input
        type="text"
        placeholder="Buscar dispositivos"
        value={valueSearch}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
        aria-label="Buscar libro"
      />
    </form>
  );
};

Search.propTypes = {
  valueSearch: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Search;
