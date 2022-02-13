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
        <div className="home-page">
            <Carousel title="Anime" items={media} linkPath="/anime/" hasBanners />
            <Carousel title="Staff" items={staff} linkPath="/staff/" />
            <Carousel title="Anime Characters" items={characters} linkPath="/characters/" />
        </div>
    );
}

export default Home;
