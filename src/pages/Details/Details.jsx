import { useContext } from 'react';
import AppContext from '../../components/App/Context';
import './Details.scss';

function Details() {
    const [{ currentDetails: { title } }] = useContext(AppContext);

    return (
        <div className="details-page">
            <h1 className="details-title">{ title }</h1>
        </div>
    );
}

export default Details;
