import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './CarouselItem.scss';

function CarouselItem({
    image,
    bannerImage,
    path,
    isSelected,
    styles,
    focusHandler,
}) {
    return (
        <Link className="carousel-link" to={path} style={styles} onFocus={focusHandler}>
            <img
                alt="Carousel Item"
                className={`carousel-image ${isSelected ? 'selected' : ''}`}
                src={image || bannerImage}
            />
        </Link>
    );
}

CarouselItem.defaultProps = {
    image: '',
    bannerImage: '',
    isSelected: false,
    styles: {},
    focusHandler: () => {},
};
CarouselItem.propTypes = {
    path: PropTypes.string.isRequired,
    image: PropTypes.string,
    bannerImage: PropTypes.string,
    isSelected: PropTypes.bool,
    styles: PropTypes.any,
    focusHandler: PropTypes.func,
};

export default CarouselItem;
