import { useState, useEffect, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useValidation from "../../hooks/useValidation";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [values, setValues] = useState({
    "edit-title-input": "",
    "edit-subtitle-input": "",
  });
  const currentUser = useContext(CurrentUserContext);
  const nameValidation = useValidation({
    value: values["edit-title-input"],
    type: "short-text",
    required: true,
  });
  const aboutValidation = useValidation({
    value: values["edit-subtitle-input"],
    type: "long-text",
    required: true,
  });
  const isFormEnabled =
    !(nameValidation.isInputReseted && aboutValidation.isInputReseted) &&
    nameValidation.isValid &&
    aboutValidation.isValid;

  useEffect(() => {
    if (isOpen) {
      setValues((values) => ({
        ...values,
        "edit-title-input": currentUser.name,
        "edit-subtitle-input": currentUser.about,
      }));
      nameValidation.setIsInputReseted(true);
      aboutValidation.setIsInputReseted(true);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    nameValidation.setIsInputReseted(false);
    aboutValidation.setIsInputReseted(false);
    onUpdateUser({
      name: values["edit-title-input"],
      about: values["edit-subtitle-input"],
    });
  }

  function handleInputChange(evt) {
    setValues((values) => ({ ...values, [evt.target.name]: evt.target.value }));
  }

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isEnabled={isFormEnabled}
    >
      <input
        id="name"
        className={
          nameValidation.isInputReseted
            ? "popup__input popup__input_type_title"
            : nameValidation.isValid
            ? "popup__input popup__input_type_title popup__input_type_correct"
            : "popup__input popup__input_type_title popup__input_type_error"
        }
        placeholder="Имя"
        type="text"
        name="edit-title-input"
        value={values["edit-title-input"]}
        onChange={(evt) => {
          handleInputChange(evt);
          nameValidation.setIsInputReseted(false);
        }}
        maxLength={nameValidation.MaxLength}
      />
      <span className="name-error popup__input-error">
        {nameValidation.errorMesage}
      </span>
      <input
        id="about"
        className={
          aboutValidation.isInputReseted
            ? "popup__input popup__input_type_subtitle"
            : aboutValidation.isValid
            ? "popup__input popup__input_type_subtitle popup__input_type_correct"
            : "popup__input popup__input_type_subtitle popup__input_type_error"
        }
        placeholder="О себе"
        type="text"
        name="edit-subtitle-input"
        value={values["edit-subtitle-input"]}
        onChange={(evt) => {
          handleInputChange(evt);
          aboutValidation.setIsInputReseted(false);
        }}
        maxLength={aboutValidation.MaxLength}
      />
      <span className="about-error popup__input-error">
        {aboutValidation.errorMesage}
      </span>
    </PopupWithForm>
  );
}
