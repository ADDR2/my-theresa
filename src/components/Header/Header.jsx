import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <div className="header-container">
            <Link className="header-logo" to="/">My Theresa App</Link>
        </div>
    );
}

export default Header;
