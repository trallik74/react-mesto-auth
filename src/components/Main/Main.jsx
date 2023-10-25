import { useContext } from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Skeleton from "../Skeleton/Skeleton";

export default function Main({
  cards,
  isRender,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onConfirm,
  handleCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          {isRender ? (
            <img
              className="profile__avatar"
              alt="Аватар профиля"
              src={currentUser.avatar}
            />
          ) : (
            <Skeleton element={"avatar"} />
          )}
          <button
            className={
              isRender ? "profile__edit-avatar" : "profile__edit-avatar hidden"
            }
            type="button"
            aria-label="Кнопка изменения аватара"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          {isRender ? (
            <h1 className="profile__title">{currentUser.name}</h1>
          ) : (
            <Skeleton element={"title"} />
          )}
          <button
            className={
              isRender ? "profile__edit-button" : "profile__edit-button hidden"
            }
            type="button"
            aria-label="Кнопка изменения профиля"
            onClick={onEditProfile}
          />
          {isRender ? (
            <p className="profile__subtitle">{currentUser.about}</p>
          ) : (
            <Skeleton element={"subtitle"} />
          )}
        </div>
        <button
          className={
            isRender ? "profile__add-button" : "profile__add-button hidden"
          }
          type="button"
          aria-label="Кнопка добавления карточки"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Карточки с фотографиями">
        {isRender ? (
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onConfirm}
            />
          ))
        ) : (
          <Skeleton element={"cards"} />
        )}
      </section>
    </main>
  );
}
