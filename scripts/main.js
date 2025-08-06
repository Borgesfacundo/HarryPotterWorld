import { mainDisplay } from "./mainDisplay.mjs";
import { displayHouseDetails } from "./displayHouseDetails.mjs";
import { mainFetch } from "./fetchingData.mjs";
import { setupSearchBar } from "./searchBar.mjs";
import { setupWelcomeMessage } from "./welcomeMessage.mjs";
import { setupDarkModeToggle } from "./darkmode.mjs";
import { setupWandCursor } from "./wandCursor.mjs";
import { setupLuckyButton } from "./luckyButton.mjs";
import { setCurrentYear } from "./year.mjs";

const mainUrl = "https://potterapi-fedeperin.vercel.app/en/books";
const houseUrl = "https://potterapi-fedeperin.vercel.app/en/houses";

// Welcome message
setupWelcomeMessage();

window.addEventListener('DOMContentLoaded', async () => {
    setupDarkModeToggle();
    setupWandCursor();
    setupLuckyButton();
    setCurrentYear();
    // Restore search input from localStorage
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const savedSearch = localStorage.getItem('searchInput');
        if (savedSearch) {
            searchInput.value = savedSearch;
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
        }
        searchInput.addEventListener('input', () => {
            localStorage.setItem('searchInput', searchInput.value);
        });
    }
    // Restore dark mode from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('darkmode');
        const toggleBtn = document.querySelector('.toggle-icon');
        if (toggleBtn) toggleBtn.textContent = '☀️';
    } else if (savedTheme === 'light') {
        document.body.classList.remove('darkmode');
        const toggleBtn = document.querySelector('.toggle-icon');
        if (toggleBtn) toggleBtn.textContent = '🌙';
    }
    // Potter API endpoints
    const books = await mainFetch(mainUrl);
    const characters = await mainFetch("https://potterapi-fedeperin.vercel.app/en/characters");
    const spells = await mainFetch("https://potterapi-fedeperin.vercel.app/en/spells");
    // HP-API characters
    const hpApiCharacters = await mainFetch("https://hp-api.onrender.com/api/characters");
    window.hpApiCharacters = hpApiCharacters;
    // Potter DB spells
    const potterDbSpellsResp = await mainFetch("https://api.potterdb.com/v1/spells");
    const potterDbSpells = potterDbSpellsResp && potterDbSpellsResp.data ? potterDbSpellsResp.data.map(s => s.attributes) : [];

    // Show books, characters, and spells in mainDisplay
    const combined = [
        ...books,
        ...characters,
        ...potterDbSpells
    ];
    // Save global data for the searchBar
    window.potterApiBooks = books;
    window.potterApiCharacters = characters;
    window.potterDbSpells = potterDbSpells;
    // Pass PotterAPI characters as an extra argument for matching in dialogs
    mainDisplay(combined, hpApiCharacters, potterDbSpells, characters);

    // Mostrar casas en la sección de información
    const house = await mainFetch(houseUrl);
    displayHouseDetails(house, hpApiCharacters);
    // Llama a setupSearchBar cuando el DOM y los datos globales estén listos
    setupSearchBar();
});