import http from './httpService';

export function get() {
  return http.get('/genres');
}
