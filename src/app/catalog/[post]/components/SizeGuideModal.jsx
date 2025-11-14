export default function SizeGuideModal({ onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__inner size-guide" onClick={(e) => e.stopPropagation()}>
        <img src="/img/size-guide.jpg" />
      </div>
    </div>
  );
}
