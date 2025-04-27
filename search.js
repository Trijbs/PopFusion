const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

const performSearch = (query) => {
    if (!query || query.trim() === "") {
        return [];
    }
    const lowerQuery = query.toLowerCase();
    return musicData.filter(item => {
        return (
            (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
            (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
            (item.artist && item.artist.toLowerCase().includes(lowerQuery)) ||
            (item.genre && item.genre.toLowerCase().includes(lowerQuery)) ||
            (item.description && item.description.toLowerCase().includes(lowerQuery))
        );
    });
};

const displayResults = (results) => {
    const resultsContainer = document.getElementById("results-grid");
    if (!resultsContainer) return;

    resultsContainer.innerHTML = "";
    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.forEach(result => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
            <img src="${result.image}" alt="${result.name || result.title || result.artist}">
            <h3>${result.name || result.title || result.artist}</h3>
            <p>${result.description}</p>
            <button class="listen-now">Listen Now</button>
        `;
        resultsContainer.appendChild(card);
    });
};

const initSearch = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.querySelector(".search-button");

    if (query) {
        document.getElementById("search-input").value = query;
        const results = performSearch(query);
        displayResults(results);
    }

    if (searchInput && searchButton) {
        const debouncedSearch = debounce((value) => {
            window.location.href = `search-results.html?query=${encodeURIComponent(value)}`;
        }, 300);

        searchInput.addEventListener("input", (e) => {
            debouncedSearch(e.target.value);
        });

        searchButton.addEventListener("click", () => {
            const value = searchInput.value;
            if (value) {
                window.location.href = `search-results.html?query=${encodeURIComponent(value)}`;
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", initSearch);