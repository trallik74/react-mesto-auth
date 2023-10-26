export default function errorHandler(error) {
  const errorMap = {
    "Error: 400": "Ошибка 400: Допущена синтаксическая ошибка.",
    "Error: 400a": "Ошибка 400: Некорректно заполнено одно из полей.",
    "Error: 400c": "Ошибка 400: Токен не передан или передан не в том формате.",
    "Error: 400r":
      "Ошибка 400: Некорректно заполнено одно из полей или данный email уже используется.",
    "Error: 401": "Ошибка 401: Пользователь не авторизован.",
    "Error: 401a": "Ошибка 401: Логин или пароль введены неверно.",
    "Error: 401c": "Ошибка 401: Переданный токен некорректен.",
    "Error: 403": "Ошибка 403: У вас недостаточно прав пользователя.",
    "Error: 404": "Ошибка 404: Запрошенный ресурс не существует.",
    "Error: 500": "Ошибка 500: На сервере произошла ошибка.",
  };

  function getErrorMessage(err) {
    if (typeof err === "object") {
      console.log(err.message || errorMap[err.status] || err.status);
      return errorMap[err.status] || err.message || "Что-то пошло не так...";
    } else {
      console.log(errorMap[err] || err);
      return errorMap[err] || "Что-то пошло не так...";
    }
  }

  return getErrorMessage(error);
}
