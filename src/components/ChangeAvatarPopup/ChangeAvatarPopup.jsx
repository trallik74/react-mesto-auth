import { useRef, useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useValidation from "../../hooks/useValidation";

export default function ChangeAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();
  const [urlValue, setUrlValue] = useState("");
  const urlValidation = useValidation({
    value: urlValue,
    type: "url",
    required: true,
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current.value = "";
      urlValidation.setIsInputReseted(true);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  function handleValidation() {
    setUrlValue(inputRef.current.value);
    urlValidation.setIsInputReseted(false);
  }

  return (
    <PopupWithForm
      name={"avatar-change"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isEnabled={!urlValidation.isInputReseted && urlValidation.isValid}
    >
      <input
        id="avatar-url"
        className={
          urlValidation.isInputReseted
            ? "popup__input popup__input_type_url"
            : urlValidation.isValid
            ? "popup__input popup__input_type_url popup__input_type_correct"
            : "popup__input popup__input_type_url popup__input_type_error"
        }
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar-url-input"
        ref={inputRef}
        onChange={handleValidation}
      />
      <span className="avatar-url-error popup__input-error">
        {!urlValidation.isInputReseted && urlValidation.errorMesage}
      </span>
    </PopupWithForm>
  );
}
