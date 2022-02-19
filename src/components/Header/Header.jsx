import { Link } from 'react-router-dom';
import { APP_LOGO_TEXT, WISH_LIST_LINK_TEXT } from '../../constants';
import './Header.scss';

function Header() {
    return (
        <div className="header-container">
            <Link className="header-logo" to="/">{APP_LOGO_TEXT}</Link>
            <Link className="wish-list-link" to="/wishlist">{WISH_LIST_LINK_TEXT}</Link>
        </div>
    );
}

export default Header;
