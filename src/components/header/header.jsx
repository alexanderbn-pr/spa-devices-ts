import './header.scss';
import logo from '../../assets/icons/logo.png';
import cart from '../../assets/icons/cart.png';
import Breadcrumbs from '../breadcrumb/Breadcrumb';
import { useCart } from '../../hooks/useCart';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../ui/LanguageSelector';

const Header = () => {
  const { cartItemsCount } = useCart();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className="header">
      <Link
        to={location.pathname === '/device' ? undefined : '/device'}
        onClick={(e) => {
          if (location.pathname === '/device') e.preventDefault();
        }}
      >
        <img src={logo} alt="Logo" className="header-logo" />
      </Link>
      <Breadcrumbs />
      <div className="header-actions">
        <LanguageSelector />
        <button className="header-cart" aria-label={t('nav.shoppingCart')}>
          <img alt="ícono de carrito" src={cart} />
          {cartItemsCount > 0 && (
            <span className="header-cart-count">{cartItemsCount}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
