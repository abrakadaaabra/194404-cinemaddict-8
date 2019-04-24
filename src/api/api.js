import AdapterFilm from '../adapters/adapter-film';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText} ${response.message}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

class API {
  constructor({
    endPoint,
    authorization
  }) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({
      url: `movies`
    })
      .then(toJSON)
      .then(AdapterFilm.parseFilms);
  }

  updateFilm({
    id,
    data
  }) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': `application/json`
      })
    })
      .then(toJSON)
      .then(AdapterFilm.parseFilm);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    const fetchUrl = `${this._endPoint}/${url}`;
    const fetchOptions = {
      method,
      body,
      headers
    };

    return fetch(fetchUrl, fetchOptions)
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

}

export default API;
