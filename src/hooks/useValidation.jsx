import { useEffect, useState } from "react";

export default function useValidation({ value, type, required }) {
  const [errorMesage, setErrorMesage] = useState("");
  const [isInputReseted, setIsInputReseted] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const validator = {
    url: {
      urlRegex:
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
    },
    "long-text": { minLength: 2, maxLength: 200 },
    "short-text": { minLength: 2, maxLength: 30 },
  };

  function checkIsEmpty() {
    if (required && !value.length) {
      setErrorMesage("Это поле обязательно для заполнения");
      return false;
    }
    return true;
  }

  function checkMinLength() {
    if (!!value.length && value.length < validator[type].minLength) {
      setErrorMesage(
        `Минимальное количество символов: ${validator[type].minLength}. Сейчас: ${value.length}.`
      );
      return false;
    }
    return true;
  }

  function checkUrl() {
    if (!!value.length && !value.match(validator[type].urlRegex)) {
      setErrorMesage("Введите валидный url-адрес.");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (type === "long-text" || type === "short-text") {
      if (checkIsEmpty() && checkMinLength()) {
        setIsValid(true);
        setErrorMesage("");
      } else {
        setIsValid(false);
      }
    }

    if (type === "url") {
      if (checkIsEmpty() && checkUrl()) {
        setIsValid(true);
        setErrorMesage("");
      } else {
        setIsValid(false);
      }
    }
  }, [value]);

  return {
    isValid,
    errorMesage,
    MaxLength: validator[type].maxLength,
    setIsInputReseted,
    isInputReseted,
  };
}
