import PropTypes from 'prop-types';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import CarouselItem from '../CarouselItem/CarouselItem';

import './Carousel.scss';

const PROFILE_IMAGE_WIDTH = 330;

function Carousel({
    items,
    linkPath,
    hasBanners,
}) {
    const [selectedItem, setSelected] = useState(0);
    const [carouselWindowWidth, setCarouselWidth] = useState(0);
    const carouselWindowRef = useRef(null);
    const canMoveToLeft = selectedItem > 0;
    const canMoveToRight = selectedItem < items.length - 1;
    const initialImageTranslation = (carouselWindowWidth / 2) - (PROFILE_IMAGE_WIDTH / 2);
    const bannerCarouselTranslation = `translateX(-${100 * selectedItem}%)`;
    const imageCarouselTranslation = `translateX(${initialImageTranslation - (PROFILE_IMAGE_WIDTH * selectedItem)}px)`;
    const carouselStyles = { transform: hasBanners ? bannerCarouselTranslation : imageCarouselTranslation };

    function getClickHandler(movement = 0) {
        return function clickHandler() {
            setSelected((currentSelected) => currentSelected + movement);
        }
    }

    useEffect(
        () => {
            if (carouselWindowRef?.current?.offsetWidth) setCarouselWidth(carouselWindowRef.current.offsetWidth);
        },
        [carouselWindowRef],
    );

    return (
        <div className="carousel-container">
            { canMoveToLeft ? <button type="button" className="carousel-move-left" onClick={getClickHandler(-1)} /> : null }
            <div ref={carouselWindowRef} className="carousel-window">
                <div className="carousel" style={carouselStyles}>
                    { items.map((item, index) => (
                        <CarouselItem
                            key={`carousel-image-${item.id}`}
                            path={`${linkPath}${item.id}`}
                            isSelected={index === selectedItem}
                            styles={{ width: item.bannerImage ? (carouselWindowWidth || 'auto') : `${PROFILE_IMAGE_WIDTH}px` }}
                            {...item}
                        />
                    ))}
                </div>
            </div>
            { canMoveToRight ? <button type="button" className="carousel-move-right" onClick={getClickHandler(1)} /> : null }
        </div>
    );
}

Carousel.defaultProps = { hasBanners: false };
Carousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string,
        bannerImage: PropTypes.string,
    })).isRequired,
    linkPath: PropTypes.string.isRequired,
    hasBanners: PropTypes.bool,
};

export default Carousel;
