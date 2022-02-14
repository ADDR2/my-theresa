import {
    useContext,
    useEffect,
    useState,
} from 'react';
import AppContext from '../App/Context';
import { ReactComponent as StarOutline } from '../../assets/star-outline.svg';
import { ReactComponent as StarFilled } from '../../assets/star-filled.svg';
import WishListHandler from '../../services/WishListHandler';
import './StaffDetails.scss';

function StaffDetails() {
    const [{ lastStaffDetails }] = useContext(AppContext);
    const [isInWishList, setInWishList] = useState(false);

    useEffect(
        () => {
            if (lastStaffDetails) setInWishList(WishListHandler.isInWishList(lastStaffDetails.id));
        },
        [lastStaffDetails],
    );

    if (!lastStaffDetails) return <div />;

    const {
        name: { full: name },
        id,
        homeTown,
        age,
    } = lastStaffDetails;

    function saveInWishList() {
        WishListHandler.addToWishList('staff', { name, id });
        setInWishList(true);
    }

    function removeFromWishList() {
        WishListHandler.removeFromWishList(id);
        setInWishList(false);
    }

    return (
        <section className="staff-details-container">
            <div className="title-section">
                <h2 className="staff-details-title">Staff Info</h2>
                {!isInWishList
                    ? (
                        <StarOutline
                            className="star-outline"
                            onClick={() => saveInWishList()}
                        />
                    )
                    : (
                        <StarFilled
                            className="star-filled"
                            onClick={() => removeFromWishList()}
                        />
                    )}
            </div>
            <p className="staff-home-town">
                <b>Home town:</b>
                { ` ${homeTown}` }
            </p>
            <p className="staff-age">
                <b>Age:</b>
                { ` ${age}` }
            </p>
        </section>
    );
}

export default StaffDetails;
