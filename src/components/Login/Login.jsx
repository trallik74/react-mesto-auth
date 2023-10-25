import { useState } from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { authorize } from "../../utils/auth";
import errorHandler from "../../utils/errorHandler";

export default function Login({ handleNotification, handleLogin, setEmail }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(evt) {
    setValues((values) => ({ ...values, [evt.target.name]: evt.target.value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    authorize(values["password"], values["email"])
      .then((res) => {
        if (res.token) {
          handleLogin();
          setEmail(values.email);
          navigate("/", { replace: true });
          setValues({
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        handleNotification({ message: errorHandler(err), isCorrect: false });
      });
  }

  return (
    <div className="page__content">
      <Header>
        <Link className="menu__item" to="/sign-up">
          Регистрация
        </Link>
      </Header>
      <section className="define-section">
        <h2 className="define-section__title">Вход</h2>
        <form
          className="define-form"
          action="submit"
          name="define-form"
          noValidate
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
              value={values["password"]}
              onChange={handleInputChange}
              placeholder="Пароль"
            />
          </label>
          <button
            className="define-form__submit-button"
            aria-label="Кнопка отправки формы"
            type="submit"
          >
            Войти
          </button>
        </form>
      </section>
    </div>
  );
}
