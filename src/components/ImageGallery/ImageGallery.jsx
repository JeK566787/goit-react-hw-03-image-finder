import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, setLargeImageURL }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(el => {
        return (
          <ImageGalleryItem
            key={el.id}
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
            alt={el.tags}
            setLargeImageURL={setLargeImageURL}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  setLargeImageURL: PropTypes.func,
};
