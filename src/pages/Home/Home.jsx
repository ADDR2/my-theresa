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
            <Carousel items={media} linkPath="/anime/" hasBanners />
            <Carousel items={staff} linkPath="/staff/" />
            <Carousel items={characters} linkPath="/characters/" />
        </div>
    );
}

export default Home;
