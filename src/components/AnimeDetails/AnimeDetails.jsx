import { useContext } from 'react';
import AppContext from '../App/Context';
import './AnimeDetails.scss';

function AnimeDetails() {
    const [{ lastAnimeDetails: { episodes, genres } }] = useContext(AppContext);

    return (
        <section className="anime-details-container">
            <h2 className="anime-details-title">Anime Info</h2>
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
