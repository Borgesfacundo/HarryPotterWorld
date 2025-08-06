import { showHPDialog } from "./hpDialog.mjs";
import { mainDisplay } from "./mainDisplay.mjs";

export function setupSearchBar() {
    console.log('setupSearchBar called');
    const searchInput = document.getElementById('search-input');
    const contentDisplay = document.getElementById('content-display');
    if (!searchInput || !contentDisplay) return;
    // Store PotterAPI and PotterDB data globally for search
    const potterApiBooks = window.potterApiBooks || [];
    const potterApiCharacters = window.potterApiCharacters || [];
    const potterDbSpells = window.potterDbSpells || [];

    function runSearch() {
        const query = searchInput.value.trim().toLowerCase();
        console.log('Search query:', query);
        contentDisplay.innerHTML = '';
        if (!query) return;

        // Filtrar libros y personajes
        const filteredBooks = potterApiBooks.filter(b => (b.title || '').toLowerCase().includes(query));
        const filteredChars = potterApiCharacters.filter(c => (c.fullName || c.name || '').toLowerCase().includes(query));
        // Filtrar spells
        const filteredSpells = potterDbSpells.filter(s => (s.name || '').toLowerCase().includes(query));

        // Usar mainDisplay para mostrar libros, personajes y spells con las mismas cartas y dialogs
        mainDisplay([...filteredBooks, ...filteredChars, ...filteredSpells], window.potterApiCharacters || [], potterDbSpells, window.potterApiCharacters || []);
    }

    searchInput.addEventListener('input', runSearch);
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', runSearch);
    }
    console.log('Search listeners added');
}
