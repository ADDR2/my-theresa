import PropTypes from 'prop-types';
import SadFaceImage from '../../assets/sad-face.png';
import './Error.scss';

function ErrorPage({ message }) {
    return (
        <div className="error-page">
            <img
                alt="Sad Face"
                className="error-page-image"
                src={SadFaceImage}
            />
            <h1 className="error-page-message">{ message }</h1>
        </div>
    );
}

ErrorPage.defaultProps = { message: '' };
ErrorPage.propTypes = { message: PropTypes.string };

export default ErrorPage;
