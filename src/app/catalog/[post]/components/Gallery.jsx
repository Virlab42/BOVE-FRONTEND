export default function Gallery({ images, onOpen }) {
  return (
    <div className="product-page__gallery">

      <div className="gallery__main">
        <img src={images[0]} onClick={() => onOpen(0)} />
      </div>

      <div className="gallery__grid">
        {images.slice(1).map((src, i) => (
          <img
            key={i}
            src={src}
            onClick={() => onOpen(i + 1)}
          />
        ))}
      </div>

    </div>
  );
}
