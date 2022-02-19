import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import WishListHandler from '../../services/WishListHandler';
import { ReactComponent as RemoveIcon } from '../../assets/remove-icon.svg';

import './WishList.scss';
import { NO_DATA_FOUND_MESSAGE } from '../../constants';

function WishList() {
    const [wishList, setWishList] = useState(WishListHandler.getWishList());

    const wishListArray = useMemo(
        () => Object.values(wishList),
        [wishList],
    );

    function removeFromWishList(type, id) {
        WishListHandler.removeFromWishList(type, id);
        setWishList(WishListHandler.getWishList());
    }

    if (wishListArray.length <= 0) {
        return (
            <div role="wish-list-empty-container" className="wish-list-empty-page">
                <h1 className="no-data-message">{NO_DATA_FOUND_MESSAGE}</h1>
            </div>
        );
    }

    return (
        <div className="wish-list-page">
            { wishListArray.map(
                ({
                    name,
                    type,
                    id,
                }) => (
                    <div key={`${type}-${id}`} className="wish-list-item">
                        <Link to={`/${type}/${id}`} className="wish-list-link">{ name }</Link>
                        <RemoveIcon
                            className="wish-list-remove-icon"
                            onClick={() => removeFromWishList(type, id)}
                        />
                    </div>
                ),
            )}
        </div>
    );
}

export default WishList;
