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

    // Helper to get currently displayed items (books + characters)
    function getCurrentDisplayItems() {
        // For now, always use potterApiBooks + potterApiCharacters as the current display
        // If you want to filter only what is visible, you can add logic here
        return [...potterApiBooks, ...potterApiCharacters];
    }

    function runSearch() {
        const query = searchInput.value.trim().toLowerCase();
        console.log('Search query:', query);
        contentDisplay.innerHTML = '';
        if (!query) {
            // Si el input está vacío, mostrar el display principal con todos los datos
            const allItems = [
                ...potterApiBooks,
                ...potterApiCharacters,
                ...potterDbSpells
            ];
            mainDisplay(
                allItems,
                window.hpApiCharacters || [],
                window.potterDbSpells || [],
                window.potterApiCharacters || []
            );
            return;
        }
        // Filtrar entre todos los datos mostrados en el mainDisplay (books, PotterAPI characters, PotterDB spells)
        const allItems = [
            ...potterApiBooks,
            ...potterApiCharacters,
            ...potterDbSpells
        ];
        const normalize = str => (str || '').toLowerCase().trim();
        const filteredAll = allItems.filter(item => {
            // Books
            if (item.title) return normalize(item.title).includes(query);
            // PotterAPI Characters
            if (item.fullName || item.name) return normalize(item.fullName || item.name).includes(query);
            // PotterDB Spells
            if (item.name && item.incantation) return normalize(item.name).includes(query) || normalize(item.incantation).includes(query);
            // Fallback
            return false;
        });
        // Usar mainDisplay para mostrar los filtrados
        mainDisplay(
            filteredAll,
            window.hpApiCharacters || [],
            window.potterDbSpells || [],
            window.potterApiCharacters || []
        );
    }

    searchInput.addEventListener('input', runSearch);
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', runSearch);
    }
    console.log('Search listeners added');
}
