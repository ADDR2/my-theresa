import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <div className="header-container">
            <Link className="header-logo" to="/">My Theresa App</Link>
            <Link className="wish-list-link" to="/wishlist">Wish List</Link>
        </div>
    );
}

export default Header;
