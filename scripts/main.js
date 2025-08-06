import { mainDisplay, displayHouseDetails } from "./mainDisplay.mjs"; 
import { mainFetch } from "./fetchingData.mjs";
import { setupSearchBar } from "./searchBar.mjs";

const mainUrl = "https://potterapi-fedeperin.vercel.app/en/books";
const houseUrl = "https://potterapi-fedeperin.vercel.app/en/houses";

window.addEventListener('DOMContentLoaded', async () => {
    // Potter API endpoints
    const books = await mainFetch(mainUrl);
    const characters = await mainFetch("https://potterapi-fedeperin.vercel.app/en/characters");
    const spells = await mainFetch("https://potterapi-fedeperin.vercel.app/en/spells");
    // HP-API characters and spells
    const hpApiCharacters = await mainFetch("https://hp-api.onrender.com/api/characters");
    const hpApiSpells = await mainFetch("https://hp-api.onrender.com/api/spells");

    // Mostrar libros, personajes y hechizos juntos en mainDisplay
    const combined = [
        ...books,
        ...characters,
        ...spells
    ];
    // Pasar PotterAPI characters como argumento extra para matching en dialogs
    mainDisplay(combined, hpApiCharacters, hpApiSpells, characters);

    // Mostrar casas en la sección de información
    const house = await mainFetch(houseUrl);
    displayHouseDetails(house);
    setupSearchBar();
});