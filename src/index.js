import { fetchBreeds } from './cat-api.js';

function populateBreedSelect(breeds) {
  const breedSelect = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    const optionHTML = `<option value="${breed.id}">${breed.name}</option>`;
    breedSelect.insertAdjacentHTML('beforeend', optionHTML);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
    })
    .catch(error => {
      console.error(error);
    });
});