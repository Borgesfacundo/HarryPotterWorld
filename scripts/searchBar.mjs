import { mainDisplay, displayHouseDetails } from "./mainDisplay.mjs";
import { mainFetch } from "./fetchingData.mjs";

const mainUrl = "https://potterapi-fedeperin.vercel.app/en/books";
const houseUrl = "https://potterapi-fedeperin.vercel.app/en/houses";
const hpApiCharacters = "https://hp-api.onrender.com/api/characters";
const hpApiSpells = "https://hp-api.onrender.com/api/spells";

export function setupSearchBar() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        // Fetch all APIs in paralelo
        const [books, houses, characters, spells] = await Promise.all([
            mainFetch(mainUrl),
            mainFetch(houseUrl),
            mainFetch(hpApiCharacters),
            mainFetch(hpApiSpells)
        ]);

        // filter books
        const filteredBooks = books.filter(book =>
            (book.title && book.title.toLowerCase().includes(query)) ||
            (book.originalTitle && book.originalTitle.toLowerCase().includes(query))
        );

        // filter houses
        const filteredHouses = houses.filter(house =>
            (house.house && house.house.toLowerCase().includes(query)) ||
            (house.founder && house.founder.toLowerCase().includes(query)) ||
            (house.animal && house.animal.toLowerCase().includes(query)) ||
            (typeof house.colors === 'string' && house.colors.toLowerCase().includes(query)) ||
            (Array.isArray(house.colors) && house.colors.some(color => typeof color === 'string' && color.toLowerCase().includes(query)))
        );

        // Filter characters
        const filteredCharacters = characters.filter(char =>
            (char.name && char.name.toLowerCase().includes(query)) ||
            (char.house && char.house.toLowerCase().includes(query)) ||
            (char.species && char.species.toLowerCase().includes(query))
        );

        // Filter Spells
        const filteredSpells = spells.filter(spell =>
            (spell.name && spell.name.toLowerCase().includes(query)) ||
            (spell.description && spell.description.toLowerCase().includes(query))
        );

        // Clear Displays
        const container = document.getElementById('content-display');
        container.innerHTML = '';
        const houseDetails = document.getElementById('house-details');
        houseDetails.innerHTML = "<h2>Houses' Information</h2>";

        // Show Results
        mainDisplay(filteredBooks);
        displayHouseDetails(filteredHouses);

        // Show Characters
        if (filteredCharacters.length > 0) {
            filteredCharacters.forEach(char => {
                const item = document.createElement('div');
                item.className = 'item';
                item.innerHTML = `
                    <img src="${char.image || 'images/logo.webp'}" alt="${char.name}" />
                    <h2>${char.name}</h2>
                    <p><strong>House:</strong> ${char.house || 'Unknown'}</p>
                    <p><strong>Species:</strong> ${char.species || 'Unknown'}</p>
                    <a href="#" class="open-dialog">Ver más</a>
                `;
                // Crear el dialog vacío
                const dialog = document.createElement('dialog');
                dialog.className = 'info-dialog';
                dialog.innerHTML = '<p></p>';
                item.appendChild(dialog);
                // Evento para abrir el dialog
                item.querySelector('.open-dialog').addEventListener('click', (e) => {
                    e.preventDefault();
                    dialog.showModal();
                });
                // Evento para cerrar el dialog al hacer click fuera
                dialog.addEventListener('click', () => {
                    dialog.close();
                });
                container.appendChild(item);
            });
        }
        // Mostrar hechizos
        if (filteredSpells.length > 0) {
            filteredSpells.forEach(spell => {
                const item = document.createElement('div');
                item.className = 'item';
                item.innerHTML = `
                    <h2>${spell.name}</h2>
                    <p><strong>Description:</strong> ${spell.description}</p>
                    <a href="#" class="open-dialog">Ver más</a>
                `;
                // Crear el dialog vacío
                const dialog = document.createElement('dialog');
                dialog.className = 'info-dialog';
                dialog.innerHTML = '<p></p>';
                item.appendChild(dialog);
                // Evento para abrir el dialog
                item.querySelector('.open-dialog').addEventListener('click', (e) => {
                    e.preventDefault();
                    dialog.showModal();
                });
                // Evento para cerrar el dialog al hacer click fuera
                dialog.addEventListener('click', () => {
                    dialog.close();
                });
                container.appendChild(item);
            });
        }
    });
}
