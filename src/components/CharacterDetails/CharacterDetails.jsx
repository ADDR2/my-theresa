import {
    useContext,
    useEffect,
    useState,
} from 'react';
import AppContext from '../App/Context';
import { ReactComponent as StarOutline } from '../../assets/star-outline.svg';
import { ReactComponent as StarFilled } from '../../assets/star-filled.svg';
import WishListHandler from '../../services/WishListHandler';
import './CharacterDetails.scss';

const RESOURCE_TYPE = 'character';

function CharacterDetails() {
    const [{ lastCharacterDetails }] = useContext(AppContext);
    const [isInWishList, setInWishList] = useState(false);

    useEffect(
        () => {
            if (lastCharacterDetails) setInWishList(WishListHandler.isInWishList(RESOURCE_TYPE, lastCharacterDetails.id));
        },
        [lastCharacterDetails],
    );

    if (!lastCharacterDetails) return <div />;

    const {
        name: { full: name },
        id,
        gender,
        age,
    } = lastCharacterDetails;

    function saveInWishList() {
        WishListHandler.addToWishList(RESOURCE_TYPE, { name, id });
        setInWishList(true);
    }

    function removeFromWishList() {
        WishListHandler.removeFromWishList(RESOURCE_TYPE, id);
        setInWishList(false);
    }

    return (
        <section className="character-details-container">
            <div className="title-section">
                <h2 className="character-details-title">Character Info</h2>
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
            <p className="character-gender">
                <b>Gender:</b>
                { ` ${gender || '<Not defined>'}` }
            </p>
            <p className="character-age">
                <b>Age:</b>
                { ` ${age || '<Not defined>'}` }
            </p>
        </section>
    );
}

export default CharacterDetails;
