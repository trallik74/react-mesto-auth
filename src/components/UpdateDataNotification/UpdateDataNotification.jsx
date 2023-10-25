export default function UpdateDataNotification({ onClose, settings }) {
  return (
    <div
      className={
        settings.correct
          ? "notification notitfication_type_correct"
          : "notification notitfication_type_error"
      }
      onClick={onClose}
    >
      <button
        type="button"
        className={
          settings.correct
            ? "notification__close-button notification__close-button_type_correct"
            : "notification__close-button notification__close-button_type_error"
        }
      />
      <h2 className="notification__title">
        {settings.correct ? "Успешно" : "Ошибка"}
      </h2>
      <p className="notification__text">{settings.message}</p>
    </div>
  );
}
