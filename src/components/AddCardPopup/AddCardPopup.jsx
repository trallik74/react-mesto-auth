import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useEffect, useState } from "react";
import useValidation from "../useValidation";

export default function AddCardPopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [values, setValues] = useState({
    "add-title-input": "",
    "add-url-input": "",
  });
  const titleValidation = useValidation({
    value: values["add-title-input"],
    type: "short-text",
    required: true,
  });
  const urlValidation = useValidation({
    value: values["add-url-input"],
    type: "url",
    required: true,
  });
  const isFormEnabled =
    !(titleValidation.isInputReseted && urlValidation.isInputReseted) &&
    titleValidation.isValid &&
    urlValidation.isValid;

  useEffect(() => {
    if (isOpen) {
      setValues((values) => ({
        ...values,
        "add-title-input": "",
        "add-url-input": "",
      }));
      titleValidation.setIsInputReseted(true);
      urlValidation.setIsInputReseted(true);
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({
      name: values["add-title-input"],
      link: values["add-url-input"],
    });
  }

  function handleInputChange(evt) {
    setValues((values) => ({ ...values, [evt.target.name]: evt.target.value }));
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      buttonText={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isEnabled={isFormEnabled}
    >
      <input
        id="title"
        className={
          titleValidation.isInputReseted
            ? "popup__input popup__input_type_title"
            : titleValidation.isValid
            ? "popup__input popup__input_type_title popup__input_type_correct"
            : "popup__input popup__input_type_title popup__input_type_error"
        }
        type="text"
        placeholder="Название"
        name="add-title-input"
        value={values["add-title-input"]}
        onChange={(evt) => {
          titleValidation.setIsInputReseted(false);
          handleInputChange(evt);
        }}
        maxLength={titleValidation.MaxLength}
      />
      <span className="title-error popup__input-error">
        {!titleValidation.isInputReseted && titleValidation.errorMesage}
      </span>
      <input
        id="url"
        className={
          urlValidation.isInputReseted
            ? "popup__input popup__input_type_url"
            : urlValidation.isValid
            ? "popup__input popup__input_type_url popup__input_type_correct"
            : "popup__input popup__input_type_url popup__input_type_error"
        }
        type="url"
        placeholder="Ссылка на картинку"
        name="add-url-input"
        value={values["add-url-input"]}
        onChange={(evt) => {
          urlValidation.setIsInputReseted(false);
          handleInputChange(evt);
        }}
      />
      <span className="url-error popup__input-error">
        {!urlValidation.isInputReseted && urlValidation.errorMesage}
      </span>
    </PopupWithForm>
  );
}
