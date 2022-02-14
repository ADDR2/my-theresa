import {
    useContext,
    useEffect,
    useState,
} from 'react';
import AppContext from '../App/Context';
import { ReactComponent as StarOutline } from '../../assets/star-outline.svg';
import { ReactComponent as StarFilled } from '../../assets/star-filled.svg';
import WishListHandler from '../../services/WishListHandler';
import './AnimeDetails.scss';

const RESOURCE_TYPE = 'anime';

function AnimeDetails() {
    const [{ lastAnimeDetails }] = useContext(AppContext);
    const [isInWishList, setInWishList] = useState(false);

    useEffect(
        () => {
            if (lastAnimeDetails) setInWishList(WishListHandler.isInWishList(RESOURCE_TYPE, lastAnimeDetails.id));
        },
        [lastAnimeDetails],
    );

    if (!lastAnimeDetails) return <div />;

    const {
        title: { english: name },
        id,
        genres,
        episodes,
    } = lastAnimeDetails;

    function saveInWishList() {
        WishListHandler.addToWishList(RESOURCE_TYPE, { name, id });
        setInWishList(true);
    }

    function removeFromWishList() {
        WishListHandler.removeFromWishList(RESOURCE_TYPE, id);
        setInWishList(false);
    }

    return (
        <section className="anime-details-container">
            <div className="title-section">
                <h2 className="anime-details-title">Anime Info</h2>
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
            <p className="anime-episodes">
                <b>Number of episodes:</b>
                { ` ${episodes || '<Not defined>'}` }
            </p>

            <h3 className="anime-genres-title">List of genres</h3>
            <ul className="anime-genres">
                { genres.map((genre) => (<li key={genre} className="genre">{ genre }</li>)) }
            </ul>
        </section>
    );
}

export default AnimeDetails;
