export default function SizeGuideModal({ onClose, image }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__inner size-guide" onClick={(e) => e.stopPropagation()}>
        <img src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`} />
      </div>
    </div>
  );
}
