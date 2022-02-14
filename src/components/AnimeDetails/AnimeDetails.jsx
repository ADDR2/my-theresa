import {
    useContext,
    useEffect,
    useState,
} from 'react';
import AppContext from '../App/Context';
import { ReactComponent as StarOutline } from '../../assets/star-outline.svg';
import { ReactComponent as StarFilled } from '../../assets/star-filled.svg';
import WishlistHandler from '../../services/WishListHandler';
import './AnimeDetails.scss';

function AnimeDetails() {
    const [{ lastAnimeDetails }] = useContext(AppContext);
    const [isInWishList, setInWishList] = useState(false);

    useEffect(
        () => {
            if (lastAnimeDetails) setInWishList(WishlistHandler.isInWishList(lastAnimeDetails.id));
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
        WishlistHandler.addToWishList('media', { name, id });
        setInWishList(true);
    }

    function removeFromWishList() {
        WishlistHandler.removeFromWishList(id);
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
                { ` ${episodes}` }
            </p>

            <h3 className="anime-genres-title">List of genres</h3>
            <ul className="anime-genres">
                { genres.map((genre) => (<li key={genre} className="genre">{ genre }</li>)) }
            </ul>
        </section>
    );
}

export default AnimeDetails;
