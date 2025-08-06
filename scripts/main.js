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
    // HP-API characters
    const hpApiCharacters = await mainFetch("https://hp-api.onrender.com/api/characters");
    // Potter DB spells
    const potterDbSpellsResp = await mainFetch("https://api.potterdb.com/v1/spells");
    const potterDbSpells = potterDbSpellsResp && potterDbSpellsResp.data ? potterDbSpellsResp.data.map(s => s.attributes) : [];

    // Mostrar solo libros y personajes en mainDisplay
    const combined = [
        ...books,
        ...characters
    ];
    // Guardar datos globales para el searchBar
    window.potterApiBooks = books;
    window.potterApiCharacters = characters;
    window.potterDbSpells = potterDbSpells;
    // Pasar PotterAPI characters como argumento extra para matching en dialogs
    mainDisplay(combined, hpApiCharacters, potterDbSpells, characters);

    // Mostrar casas en la sección de información
    const house = await mainFetch(houseUrl);
    displayHouseDetails(house);
    // Llama a setupSearchBar cuando el DOM y los datos globales estén listos
    setupSearchBar();
});