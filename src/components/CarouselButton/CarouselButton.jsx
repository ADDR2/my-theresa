import PropTypes from 'prop-types';

import './CarouselButton.scss';

function CarouselButton({
    clickHandler,
    classes,
    styles,
    children,
}) {
    return (
        <button type="button" className={`carousel-button ${classes}`} style={styles} onClick={clickHandler}>
            { children }
        </button>
    );
}

CarouselButton.defaultProps = {
    classes: '',
    styles: {},
    clickHandler: () => {},
    children: null,
};
CarouselButton.propTypes = {
    classes: PropTypes.string,
    styles: PropTypes.any,
    clickHandler: PropTypes.func,
    children: PropTypes.any,
};

export default CarouselButton;
