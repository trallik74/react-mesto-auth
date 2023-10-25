export default function ImagePopup({ onClose, isOpen, selectedCard }) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_image popup_opened`
          : `popup popup_type_image`
      }
      onClick={onClose}
    >
      <div className="popup__wrapper" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup__button popup__button_type_close"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src={selectedCard.link} alt={selectedCard.name} />
          <figcaption className="popup__image-caption">{selectedCard.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
