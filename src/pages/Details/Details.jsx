import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';
import AppContext from '../../components/App/Context';
import './Details.scss';

function Details({ children }) {
    const [{
        currentDetails: {
            title,
            image,
            description,
        },
    }] = useContext(AppContext);

    return (
        <div className="details-page">
            <h1 className="details-title">{ title }</h1>

            <section className="profile">
                <img
                    alt="Profile"
                    className="profile-image"
                    src={image}
                />
                { children }
            </section>

            <section className="description-section">
                <h2 className="description-title">Description:</h2>
                <ReactMarkdown className="description" children={description} remarkPlugins={[remarkGfm]} />
            </section>
        </div>
    );
}

Details.defaultProps = { children: null };
Details.propTypes = { children: PropTypes.any };

export default Details;
