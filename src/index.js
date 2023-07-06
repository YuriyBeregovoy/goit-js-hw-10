import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

function populateBreedSelect(breeds) {
  const breedSelect = document.querySelector('.breed-select');
  breedSelect.style.marginBottom = '20px';

  breeds.forEach(breed => {
    const optionHTML = `<option value="${breed.id}">${breed.name}</option>`;
    breedSelect.insertAdjacentHTML('beforeend', optionHTML);
  });
}

function displayCatInfo(cat) {
  const catInfoContainer = document.querySelector('.cat-info');
  catInfoContainer.innerHTML = '';

  const html = `
    <img src="${cat[0].url}" width = "400">
    <p>Breed Name: ${cat[0].breeds[0].name}</p>
    <p>Description: ${cat[0].breeds[0].description}</p>
    <p>Temperament: ${cat[0].breeds[0].temperament}</p>
  `;

  catInfoContainer.insertAdjacentHTML('beforeend', html);
}

function hideError() {
  const error = document.querySelector('.error');
  error.style.display = 'none';
}

function showError() {
  const error = document.querySelector('.error');
  error.style.display = 'block';
}

  const breedSelect = document.querySelector('.breed-select');
  const catInfoContainer = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');

  hideError();
  loader.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
      breedSelect.classList.remove('hidden');
    })
    .catch(error => {
      console.error(error);
      breedSelect.classList.remove('hidden');
      showError();
    });

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    catInfoContainer.classList.add('hidden');
    loader.style.display = 'block';
    hideError();

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        displayCatInfo(cat);
        catInfoContainer.style.display = 'block';
      })
      .catch(error => {
        console.error(error);
        catInfoContainer.style.display = 'block';
        showError();
      })
      .finally(() => {
        loader.style.display = 'none';
      });
  });
