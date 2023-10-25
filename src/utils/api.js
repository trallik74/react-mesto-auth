class Api {
  constructor({ url, header }) {
    this._url = url;
    this._header = header;
  }

  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.status);
    });
  }

  getCardsList() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._header,
    });
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: this._header,
    });
  }

  updateUserInfo({ name, about }) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({ name, about }),
    });
  }

  createCard({ name, link }) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({ name, link }),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._removeLikeFromCard(id);
    } else {
      return this._likeCard(id);
    }
  }

  deleteCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    });
  }

  _likeCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._header,
    });
  }

  _removeLikeFromCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._header,
    });
  }

  changeAvatar(avatar) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({ avatar }),
    });
  }
}

const optionsApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-75",
  header: {
    "Content-Type": "application/json",
    authorization: "812a01a3-2950-48a6-a5f0-d81cd717d41e",
  },
};

export const api = new Api(optionsApi);
