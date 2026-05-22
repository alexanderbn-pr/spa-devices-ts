import './header.scss';
import logo from '../../assets/icons/logo.png';
import cart from '../../assets/icons/cart.png';
import Breadcrumbs from '../breadcrumb/Breadcrumb';
import { useCart } from '../../hooks/useCart';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { cartItemsCount } = useCart();
  const location = useLocation();
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
      <aside className="header-cart">
        <img alt="cart icon" src={cart} />
        {cartItemsCount > 0 && (
          <span className="header-cart-count">{cartItemsCount}</span>
        )}
      </aside>
    </header>
  );
};

export default Header;
