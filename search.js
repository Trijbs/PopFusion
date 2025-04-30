/**
 * Search functionality for PopFusion
 */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');
    const spotifyGrid = document.getElementById('spotify-grid');

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (spotifyGrid) {
            // Trigger Spotify filter (handled in spotify.js)
            const event = new Event('input');
            searchInput.dispatchEvent(event);
        } else {
            // Placeholder for other pages
            console.log(`Searching for: ${query}`);
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
});