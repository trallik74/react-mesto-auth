export default function UpdateDataNotification({ onClose, settings }) {
  return (
    <div
      className={`notification ${
        settings.correct
          ? "notitfication_type_correct"
          : "notitfication_type_error"
      }`}
      onClick={onClose}
    >
      <button
        type="button"
        className={`notification__close-button ${
          settings.correct
            ? " notification__close-button_type_correct"
            : " notification__close-button_type_error"
        }`}
      />
      <h2 className="notification__title">
        {settings.correct ? "Успешно" : "Ошибка"}
      </h2>
      <p className="notification__text">{settings.message}</p>
    </div>
  );
}
