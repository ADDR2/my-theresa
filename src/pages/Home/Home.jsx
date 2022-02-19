import { useContext } from 'react';
import { NO_DATA_FOUND_MESSAGE } from '../../constants';
import AppContext from '../../components/App/Context';
import Carousel from '../../components/Carousel/Carousel';
import './Home.scss';

function Home() {
    const [{
        media = [],
        staff = [],
        characters = [],
    }] = useContext(AppContext);

    if (media.length + staff.length + characters.length <= 0) {
        return (
            <div role="home-empty-container" className="home-empty-page">
                <h1 className="no-data-message">{NO_DATA_FOUND_MESSAGE}</h1>
            </div>
        );
    }

    return (
        <div role="home-container" className="home-page">
            {media.length ? <Carousel title="Anime" items={media} linkPath="/anime/" hasBanners /> : null}
            {staff.length ? <Carousel title="Staff" items={staff} linkPath="/staff/" /> : null}
            {characters.length ? <Carousel title="Anime Characters" items={characters} linkPath="/character/" /> : null}
        </div>
    );
}

export default Home;
