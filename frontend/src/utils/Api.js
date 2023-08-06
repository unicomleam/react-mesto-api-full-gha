export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getInitialCards() {
        return this._sendRequest(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers
        })
    }

    getUserInfo() {
        return this._sendRequest(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers
        });
    }

    getDataArray() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    patchUserInfo({ name, about }) {
        return this._sendRequest(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }
    
    patchUserAvatar({ avatar }) {
        return this._sendRequest(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this._putLike(cardId) : this._deleteLike(cardId);
    }

    _putLike(cardId) {
        return this._sendRequest(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers
        });
    }

    _deleteLike(cardId) {
        return this._sendRequest(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers
        });
    }

    postNewCard({ name, link }) {
        return this._sendRequest(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                "name": name,
                "link": link
            })
        });
    }

    deleteCard(cardId) {
        return this._sendRequest(`${this.baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: this.headers
        });
    }

    _sendRequest(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
          return res.json();
        } else { return Promise.reject(`Ошибка ${res.status}`) }
    }

    getJwt(){
        return this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    }
}

const api = new Api({
    baseUrl: "https://api.unicomleam.nomoreparties.co",
    headers: {
      "Content-Type": "application/json"
    }
});

export default api;