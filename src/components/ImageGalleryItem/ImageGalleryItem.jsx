export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  setLargeImageURL,
  alt,
}) => {
  return (
    <li class="gallery-item">
      <img
        src={webformatURL}
        alt={alt}
        onClick={() => setLargeImageURL(largeImageURL)}
      />
    </li>
  );
};
