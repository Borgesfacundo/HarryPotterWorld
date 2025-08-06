import { mainDisplay } from "./mainDisplay.mjs";
import { displayHouseDetails } from "./displayHouseDetails.mjs";
import { mainFetch } from "./fetchingData.mjs";
import { setupSearchBar } from "./searchBar.mjs";
import { setupWelcomeMessage } from "./welcomeMessage.mjs";
import { setupDarkModeToggle } from "./darkmode.mjs";
import { setupWandCursor } from "./wandCursor.mjs";
import { setupLuckyButton } from "./luckyButton.mjs";

const mainUrl = "https://potterapi-fedeperin.vercel.app/en/books";
const houseUrl = "https://potterapi-fedeperin.vercel.app/en/houses";

// Welcome message
setupWelcomeMessage();

window.addEventListener('DOMContentLoaded', async () => {
    setupDarkModeToggle();
    setupWandCursor();
    setupLuckyButton();
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