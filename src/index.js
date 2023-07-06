import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

function populateBreedSelect(breeds) {
  const breedSelect = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    const optionHTML = `<option value="${breed.id}">${breed.name}</option>`;
    breedSelect.insertAdjacentHTML('beforeend', optionHTML);
  });
}

function displayCatInfo(cat) {
  const catInfoContainer = document.querySelector('.cat-info');
  catInfoContainer.innerHTML = '';

  const img = document.createElement('img');
  img.src = cat[0].url;

  const name = document.createElement('p');
  name.textContent = `Breed Name: ${cat[0].breeds[0].name}`;

  const description = document.createElement('p');
  description.textContent = `Description: ${cat[0].breeds[0].description}`;

  const temperament = document.createElement('p');
  temperament.textContent = `Temperament: ${cat[0].breeds[0].temperament}`;

  catInfoContainer.appendChild(img);
  catInfoContainer.appendChild(name);
  catInfoContainer.appendChild(description);
  catInfoContainer.appendChild(temperament);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
    })
    .catch(error => {
      console.error(error);
    });

  const breedSelect = document.querySelector('.breed-select');
  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        displayCatInfo(cat);
      })
      .catch(error => {
        console.error(error);
      });
  });
});