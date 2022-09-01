const loadArtists = (searchText) => {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showArtists(data.artists));
}
const showArtists = artists => {
    const artistsContainer = document.getElementById('artists-container');
    artistsContainer.innerHTML = '';
    const warningMessage = document.getElementById('warning-message');
    if (artists === null) {
        warningMessage.classList.remove('d-none');
    }
    else {
        warningMessage.classList.add('d-none');
    }
    artists.forEach(artist => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${artist.strArtistThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${artist.strArtist}</h5>
                <p class="card-text">${artist.strBiographyEN.slice(0, 200)}...</p>
                <button onclick="loadArtistDetails(${artist.idArtist})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#artistDetailsModal">More Details</button>
            </div>
        </div>
        `;
        artistsContainer.appendChild(div);
    })
}
loadArtists('');

// show artist details
const loadArtistDetails = async id => {
    const url = `https://theaudiodb.com/api/v1/json/2/artist.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showArtistDetails(data.artists);
}
const showArtistDetails = artist => {
    artist.forEach(details => {
        console.log(details)
        const artistTitle = document.getElementById('artistDetailsModalLabel');
        artistTitle.innerText = details.strArtist;

        const artistDetailsBody = document.getElementById('artist-details-modal-body');
        artistDetailsBody.innerHTML = `
        <h5>Country: ${details.strCountry}</h5>
        <h5>Born: ${details.intBornYear}</h5>
        <h5>Member: ${details.intMembers}</h5>
        <h5>Genre: ${details.strGenre}</h5>
        <h5>Song Types: ${details.strMood}</h5>
        <h5>Label: ${details.strLabel ? details.strLabel : 'No Label'}</h5>
        <p>${details.strBiographyEN}</p>

        `;
    })
}

// common function to get input value for searching
const processFunction = () => {
    const searchInputField = document.getElementById('search-input-field');
    const searchValue = searchInputField.value;
    loadArtists(searchValue);
}

// search option by artist name [input text]
document.getElementById('search-input-field').addEventListener('keyup', function (event) {
    processFunction();
})

// search option by artist name [button]
document.getElementById('btn-search').addEventListener('click', function () {
    processFunction();
})