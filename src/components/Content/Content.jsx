import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddCardPopup from "../AddCardPopup/AddCardPopup";
import ChangeAvatarPopup from "../ChangeAvatarPopup/ChangeAvatarPopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import ConfirmPopup from "../ConfirmPopup/СonfirmPopup";
import ImagePopup from "../ImagePopup/ImagePopup";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import errorHandler from "../../utils/errorHandler";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { IsLoadingContext } from "../../context/IsLoadingContext";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

export default function Content({ email, handleLogot, ...props }) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Пользователь",
    about: "Описание",
    avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
  });
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    id: "",
  });
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  function signOut() {
    handleLogot();
    navigate("/react-mesto-auth/sign-in", { replace: true });
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardsList()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
        props.handleNotification({
          message: "При загрузке произошла ошибка. " + errorHandler(err),
          isCorrect: false,
        });
      })
      .finally(() => {
        setIsRender(true);
      });
  }, []);

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo({ name, about })
      .then((user) => {
        props.handleNotification({
          message: "Информация о пользователе обновлена",
          isCorrect: true,
        });
        setCurrentUser(user);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        props.handleNotification({
          message: errorHandler(err),
          isCorrect: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((user) => {
        props.handleNotification({
          message: "Аватар обновлен",
          isCorrect: true,
        });
        setCurrentUser(user);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        props.handleNotification({
          message: errorHandler(err),
          isCorrect: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .createCard({ name, link })
      .then((newCard) => {
        props.handleNotification({
          message: "Карточка добавлена",
          isCorrect: true,
        });
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        props.handleNotification({
          message: errorHandler(err),
          isCorrect: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        props.handleNotification({
          message: "Карточка удалена",
          isCorrect: true,
        });
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        props.handleNotification({
          message: errorHandler(err),
          isCorrect: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onEditProfile() {
    setIsEditProfilePopupOpen(true);
  }

  function onAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function onConfirm(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
          <Header>
            <ul className="menu">
              <li className="menu__item menu__item_type_email">{email}</li>
              <li>
                <button className="menu__item menu__button" onClick={signOut}>
                  Выйти
                </button>
              </li>
            </ul>
          </Header>
          <Main
            cards={cards}
            isRender={isRender}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onConfirm={onConfirm}
            handleCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
          <Footer />
        </div>
        <IsLoadingContext.Provider value={[isLoading, setIsLoading]}>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddCardPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
          />
          <ChangeAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            selectedCard={selectedCard}
            onCardDelete={handleCardDelete}
          />
        </IsLoadingContext.Provider>
        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          selectedCard={selectedCard}
        />
      </CurrentUserContext.Provider>
    </>
  );
}
