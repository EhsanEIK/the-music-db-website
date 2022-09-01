const loadArtists = (searchText) => {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showArtists(data.artists));
}
const showArtists = artists => {
    const artistsContainer = document.getElementById('artists-container');
    artistsContainer.innerHTML = '';
    const albumsContainer = document.getElementById('albums-container');
    albumsContainer.innerHTML = '';
    const warningMessage = document.getElementById('warning-message');
    if (artists === null) {
        warningMessage.classList.remove('d-none');
    }
    else {
        warningMessage.classList.add('d-none');

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
                    <button onclick="loadAlbums(${artist.idArtist})" class="btn btn-success">Albums</button>
                </div>
            </div>
            `;
            artistsContainer.appendChild(div);
        });
    }
    // loader end
    toggleSpinner(false);
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
    });
}

// show albums
const loadAlbums = id => {
    const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showAlbums(data.album));
}
const showAlbums = albums => {
    const albumsContainer = document.getElementById('albums-container');
    albumsContainer.innerHTML = '';

    // albumsContainer.parentNode.innerHTML = '<h1>All Albums</h1>';
    albums.forEach(album => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${album.strAlbumThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${album.strAlbum}</h5>
                <p>Band: ${album.strArtist ? album.strArtist : 'Not Given'}</p>
                <p>Genre: ${album.strGenre ? album.strGenre : 'No Genre Given'}</p>
                <p>Release Date: ${album.intYearReleased ? album.intYearReleased : 'Not Given'}</p>
                <p>Release Format: ${album.strReleaseFormat ? album.strReleaseFormat : 'Not Given'}</p>
                <p class="card-text">${album.strDescriptionEN ? album.strDescriptionEN.slice(0, 300) : 'No Details Given'}...</p>
            </div>
        </div>
        `;
        albumsContainer.appendChild(div);
    })
}


// common function to get input value for searching
const processFunction = () => {
    // loader start
    toggleSpinner(true);
    const searchInputField = document.getElementById('search-input-field');
    const searchValue = searchInputField.value;
    loadArtists(searchValue);
}

// search option by artist name [input text]
document.getElementById('search-input-field').addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        processFunction();
    }
})

// search option by artist name [button]
document.getElementById('btn-search').addEventListener('click', function () {
    processFunction();
})

// loader/spinner
const toggleSpinner = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}