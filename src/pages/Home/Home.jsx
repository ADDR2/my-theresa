import { useContext } from 'react';
import AppContext from '../../components/App/Context';
import Carousel from '../../components/Carousel/Carousel';
import './Home.scss';

function Home() {
    const [{
        media,
        staff,
        characters,
    }] = useContext(AppContext);

    return (
        <div role="home-container" className="home-page">
            <Carousel title="Anime" items={media} linkPath="/anime/" hasBanners />
            <Carousel title="Staff" items={staff} linkPath="/staff/" />
            <Carousel title="Anime Characters" items={characters} linkPath="/character/" />
        </div>
    );
}

export default Home;
