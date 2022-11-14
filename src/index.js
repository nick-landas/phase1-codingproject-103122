document.addEventListener('DOMContentLoaded',() => {
const resultsDiv = document.querySelector('#results');
const apiSearchForm = document.querySelector('#api-search');

apiSearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = encodeURI(e.target.search.value)
    console.log(query)
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=10`)
    .then(res => res.json())    
    .then(data =>console.log(data))

})




















})
