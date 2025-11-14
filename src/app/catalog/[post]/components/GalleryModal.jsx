export default function GalleryModal({ images, index, setIndex, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__inner" onClick={e => e.stopPropagation()}>

        <div className="modal__thumbs">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              className={i === index ? 'active' : ''}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div className="modal__viewer">
          <img src={images[index]} />
        </div>

      </div>
    </div>
  );
}
