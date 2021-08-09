export default class Api {
    _checkResponse(res) {
        return res ? res.json() : Promise.reject(`Error: ${res.status}`)
    }

    getData() {
        return fetch('data.json')
            .then(this._checkResponse)
    }
}
        