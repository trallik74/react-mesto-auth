import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../utils/auth";
import errorHandler from "../../utils/errorHandler";
import Loader from "../Loader/Loader";

export default function Register({ setTooltipData }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(evt) {
    setValues((values) => ({ ...values, [evt.target.name]: evt.target.value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    register(values["password"], values["email"])
      .then((res) => {
        setTooltipData((data) => ({
          ...data,
          isOpen: true,
          isCorrect: true,
          message: "Вы успешно зарегистрировались!",
        }));
        navigate("/sign-in", { replace: true });
        setValues({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        setTooltipData((data) => ({
          ...data,
          isOpen: true,
          isCorrect: false,
          message: errorHandler(err),
        }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="page__content">
        <Header>
          <Link className="menu__item" to="/sign-in">
            Войти
          </Link>
        </Header>
        <section className="define-section">
          <h2 className="define-section__title">Регистрация</h2>
          <form
            className="define-form"
            action="submit"
            name="define-form"
            onSubmit={handleSubmit}
          >
            <label
              className="define-form__label define-form__label_type_email"
              htmlFor="email"
            >
              <input
                className="define-form__input define-form__input_type_email"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={values["email"]}
                onChange={handleInputChange}
              />
              <span className="define-form__input-error"></span>
            </label>
            <label
              className="define-form__label define-form__label_type_password"
              htmlFor="password"
            >
              <input
                className="define-form__input define-form__input_type_password"
                type="password"
                id="password"
                name="password"
                placeholder="Пароль"
                value={values["password"]}
                onChange={handleInputChange}
              />
              <span className="define-form__input-error"></span>
            </label>
            <button
              className="define-form__submit-button"
              aria-label="Кнопка отправки формы"
              type="submit"
            >
              {isLoading ? <Loader isColored={true} /> : "Зарегистрироваться"}
            </button>
          </form>
          <Link className="define-section__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </section>
      </div>
    </>
  );
}
