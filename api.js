const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const countryContainer = document.getElementById('country-container');

const errorMsg = document.getElementById('error-msg');

const countryDetails = document.getElementById('country-details');

searchBtn.addEventListener('click', function(){
    const searchValue = searchInput.value;
    
    // error handler
    if(searchValue === ''){
        errorMsg.innerText = 'Search Field Empty';
        return;
    }

    // clear
    countryContainer.innerHTML = '';
    countryDetails.innerHTML = '';

    const url = `https://restcountries.eu/rest/v2/name/${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showSearchResult(data))
    .finally(() => {
        searchInput.value = '';
    })
})

const showSearchResult = countries => {
    // error handling
    if(countries.status === 404){
        errorMsg.innerText = "This Country Don't Exist";
    }
    else{
        errorMsg.innerText = '';
    }

    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${country.flag}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${country.name}</h5>
                    <p class="card-text">Region: ${country.region}</p>
                </div>
                <button onclick="showDetails('${country.alpha3Code}')" class="bg-dark text-white border-0">Learn More</button>
            </div>
        `;
        countryContainer.appendChild(div);
    })
}

const showDetails = alpha3Code => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
    .then(res => res.json())
    .then(data => countryInfo(data))
} 

const countryInfo = country =>{
    countryDetails.innerHTML = `
    <h5>Name: ${country.name}</h5>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Currency: ${country.currencies[0].name}</p>
    <p>Language: ${country.languages[0].name}</p>
    `;
}