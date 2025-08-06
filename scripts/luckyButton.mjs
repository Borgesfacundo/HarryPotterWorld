// luckyButton.mjs
// Handles the 'Feel Lucky' button logic: writes a random item to the search bar and triggers filtering

export function setupLuckyButton() {
    const luckyBtn = document.getElementById('lucky-btn');
    const searchInput = document.getElementById('search-input');
    if (!luckyBtn || !searchInput) return;
    luckyBtn.addEventListener('click', () => {
        // Collect all available objects from global arrays
        const books = window.potterApiBooks || [];
        const characters = window.potterApiCharacters || [];
        const spells = window.potterDbSpells || [];
        const allItems = [...books, ...characters, ...spells];
        if (allItems.length === 0) return;
        // Pick a random item
        const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
        // Choose a display name for the search bar
        let name = randomItem.title || randomItem.name || randomItem.fullName || randomItem.incantation || '';
        if (!name) name = 'Unknown';
        searchInput.value = name;
        // Trigger filtering
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
    });
}
