import axios from 'axios';

export function fetchBreeds() {
  axios.defaults.headers.common['x-api-key'] = 'live_EHGuSkwEAO32u8HCB0B5Vq4Ri8Z9ACSXmEO1I4EChDLw8YLKX6O5igct7Z8Vvybw';

  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw new Error('Failed to fetch cat breeds.');
    });
}