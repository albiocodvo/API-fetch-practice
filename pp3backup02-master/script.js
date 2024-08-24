const apiKey = "wyBQ3Og6L7PdFVlq9lCkYFgnfKbuVKqArXx9U35Db59grJFfyrR2uYb5";
let currentPage = 1; 
let searchQuery = '';

async function fetchImage(page = 1) {
    searchQuery = document.getElementById('imageName').value;
    const url = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=12&page=${page}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });
        const data = await response.json();
        console.log(data);
        displayResults(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayResults(data) {
    const resultsRow = document.getElementById('resultsRow');
    const seeMoreButton = document.getElementById('seeMoreButton');
    const body = document.body;
    const container = document.querySelector('.container');
    const resultsToShow = data.photos || [];

    if (resultsToShow.length > 0) {
        resultsToShow.forEach(photo => {
            const imageCard = document.createElement('div');
            imageCard.className = 'col-md-4 mb-4';

            imageCard.innerHTML = `
                <div class="card">
                    <img src="${photo.src.medium || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${photo.alt}">
                    <div class="card-body">
                        <h4 class="card-title">${photo.id}</h4>
                        <h5 class="card-title">${photo.photographer}</h5>
                        <p class="card-text">Source: <a href="${photo.url}" target="_blank">View on Pexels</a></p>
                        <p class="card-text">${photo.alt}</p>
                    </div>
                </div>
            `;

            resultsRow.appendChild(imageCard);
        });

        
        seeMoreButton.classList.remove('d-none');

        
        adjustBodyHeight();
    } else {
        
        seeMoreButton.classList.add('d-none');
    }
}

function adjustBodyHeight() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const resultsRowHeight = document.getElementById('resultsRow').offsetHeight;
    const seeMoreButtonHeight = document.getElementById('seeMoreButton').offsetHeight;
    const viewportHeight = window.innerHeight;

    
    const requiredHeight = headerHeight + resultsRowHeight + seeMoreButtonHeight + 50; // Add some padding

    
    document.body.style.height = `${Math.max(viewportHeight, requiredHeight)}px`;
}

function loadMoreImages() {
    currentPage++;
    fetchImage(currentPage);
}
