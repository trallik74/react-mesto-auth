export default function InfoTooltip({ isOpen, onClose, isCorrect }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__container popup__container_type_tooltip " onClick={(e) => e.stopPropagation()}>
        <button
          className="popup__button popup__button_type_close"
          type="button"
          aria-label="Кнопка закрытия попапа"
          onClick={onClose}
        />
        <div className="tooltip">
          <div className={`tooltip__image ${isCorrect ? "tooltip__image_type_correct" : "tooltip__image_type_error"}`}  />
          <p className="tooltip__text">{isCorrect ? 'Вы успешно зарегистрировались!': 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        </div>
      </div>
    </div>
  );
}
