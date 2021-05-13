// http://www.omdbapi.com/?i=tt3896198&apikey=cdc0bda4

const search = document.querySelector('.search');
const movies = document.querySelector('.movies');

const getMovieInfo = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  // console.log(data.Search);

  return data;
}

const renderOneMovie = (detail) => {
  movies.insertAdjacentHTML('beforeend',
  `<div class="oneMovie">
    <img class="poster" src="${detail.Poster}" alt="">
    <div class="info">
      <h4 class="title">${detail.Title}</h4>
      <h5 class="year">${detail.Year}</h5>
      <p class="plot">${detail.Plot}</p>
    </div>
  </div>`
  )
}

const renderHTML = function(data) {
  const items = data.Search;
  movies.innerHTML = '';
  items.forEach(item => {
    // console.log(item.imdbID);
    const url = `https://www.omdbapi.com/?i=${item.imdbID}&apikey=cdc0bda4`;
    getMovieInfo(url)
    .then(detail => renderOneMovie(detail))
    .catch(err=>console.log(err));
  })
}

search.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    let description = event.target.closest('input').value;
    if (description.trim().length > 0) {
      const url = `https://www.omdbapi.com/?s=${description}&r=json&apikey=cdc0bda4`;
      getMovieInfo(url)
      .then(data => renderHTML(data))
      .catch(err => console.log(err));

      event.target.closest('input').value = '';
    }
    event.preventDefault();
  }
})

const firstUrl = `https://www.omdbapi.com/?s=batman&r=json&apikey=cdc0bda4`
getMovieInfo(firstUrl)
.then(data => renderHTML(data))
.catch(err => console.log(err));
