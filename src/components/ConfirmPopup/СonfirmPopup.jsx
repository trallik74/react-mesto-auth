import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function ConfirmPopup({
  isOpen,
  onClose,
  selectedCard,
  onCardDelete,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(selectedCard);

  }

  return (
    <PopupWithForm
      name={"confirm"}
      title={"Вы уверены?"}
      buttonText={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isEnabled={true}
    />
  );
}
