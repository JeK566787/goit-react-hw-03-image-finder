import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, setLargeImageURL }) => {
  return (
    <ul className="gallery">
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
