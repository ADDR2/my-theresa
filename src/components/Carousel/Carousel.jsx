import PropTypes from 'prop-types';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import CarouselButton from '../CarouselButton/CarouselButton';
import CarouselItem from '../CarouselItem/CarouselItem';

import './Carousel.scss';

const PROFILE_IMAGE_WIDTH = 330;

function Carousel({
    items,
    linkPath,
    hasBanners,
    title,
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
        <section>
            <h1 className="carousel-title">{ title }</h1>
            <div className="carousel-container">
                {canMoveToLeft
                    ? (
                        <CarouselButton classes="carousel-move-left" clickHandler={getClickHandler(-1)}>
                            <div className="arrow-left" />
                        </CarouselButton>
                    )
                    : null}
                <div ref={carouselWindowRef} className="carousel-window">
                    <div className="carousel" style={carouselStyles}>
                        { items.map((item, index) => (
                            <CarouselItem
                                key={`carousel-image-${item.id}`}
                                path={`${linkPath}${item.id}`}
                                isSelected={index === selectedItem || !!item.bannerImage}
                                styles={{ width: item.image ? `${PROFILE_IMAGE_WIDTH}px` : (carouselWindowWidth || 'auto') }}
                                focusHandler={() => setSelected(() => index)}
                                {...item}
                            />
                        ))}
                    </div>
                </div>
                {canMoveToRight
                    ? (
                        <CarouselButton classes="carousel-move-right" clickHandler={getClickHandler(1)}>
                            <div className="arrow-right" />
                        </CarouselButton>
                    )
                    : null}
            </div>
        </section>
    );
}

Carousel.defaultProps = { hasBanners: false, items: [] };
Carousel.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string,
        bannerImage: PropTypes.string,
    })),
    linkPath: PropTypes.string.isRequired,
    hasBanners: PropTypes.bool,
};

export default Carousel;
