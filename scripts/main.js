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

    // Mostrar libros, personajes y hechizos juntos en mainDisplay
    const combined = [
        ...books,
        ...characters,
        ...spells
    ];
    mainDisplay(combined);

    // Mostrar casas en la sección de información
    const house = await mainFetch(houseUrl);
    displayHouseDetails(house);
    setupSearchBar();
});