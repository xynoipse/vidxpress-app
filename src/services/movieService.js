import http from './httpService';

const API = 'movies'

export function get() {
  return http.get(API);
}

export function save(movie) {
  if (movie._id) {
    const data = { ...movie };
    delete data._id
    return http.put(`${API}/${movie._id}`, data);
  }

  return http.post(API, movie);
}

export function show(movieId) {
  return http.get(`${API}/${movieId}`);
}

export function destroy(movieId) {
  return http.delete(`${API}/${movieId}`);
}
