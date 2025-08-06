// Logging moved inside mainDisplay
import { mainFetch } from "./fetchingData.mjs";
import { showBookDialog } from "./bookDialog.mjs";
import { showHPDialog } from "./hpDialog.mjs";
// Function to display fetched data in the HTML
// This function assumes that the data is an array of objects with properties like title, cover, image, name, fullName, etc.
export function mainDisplay(data) {
    // Utilidad para detectar spells PotterDB
    function isPotterDBSpell(element) {
        return (
            'category' in element && 'effect' in element
        );
    }

    // Renderiza una card de spell PotterDB
    function renderSpellCard(element) {
        const item = document.createElement('div');
        item.className = 'item spell-card';
        const imgSrc = element.image || 'images/logo.webp';
        const name = element.name || 'Unknown';
        item.innerHTML = `
            <img src="${imgSrc}" alt="${name}" />
            <h3>${name}</h3>
            <p><strong>Incantation:</strong> ${element.incantation}</p>
            <a href="#" class="open-dialog">Ver más</a>
        `;
        return item;
    }

    // Renderiza una card de libro
    function renderBookCard(element) {
        const item = document.createElement('div');
        item.className = 'item';
        const imgSrc = element.cover || 'images/logo.webp';
        const name = element.title || element.originalTitle || 'No title';
        item.innerHTML = `
            <img src="${imgSrc}" alt="${name}" />
            <h3>${name}</h3>
            <a href="#" class="open-dialog">Ver más</a>
        `;
        return item;
    }

    // Renderiza una card de personaje
    function renderCharacterCard(element) {
        const item = document.createElement('div');
        item.className = 'item';
        const imgSrc = element.image || 'images/logo.webp';
        const name = element.fullName || element.name || 'Unknown';
        item.innerHTML = `
            <img src="${imgSrc}" alt="${name}" />
            <h3>${name}</h3>
            <a href="#" class="open-dialog">Ver más</a>
        `;
        return item;
    }
    const args = arguments;
    const hpApiCharacters = args[1] || [];
    const hpApiSpells = args[2] || [];
    const charactersForDialog = args[3] || [];
    console.log('mainDisplay called with entities:', data);
    console.log('mainDisplay charactersForDialog:', charactersForDialog);
    const container = document.getElementById('content-display');
    container.innerHTML = ''; // Clear previous content

    // Accept HP-API characters and spells as optional arguments
    // ...existing code...
    data.forEach(element => {
        let item = null;
        if (isPotterDBSpell(element)) {
            item = renderSpellCard(element);
        } else if (element.cover || element.title) {
            item = renderBookCard(element);
        } else if (!isPotterDBSpell(element) && (element.image || element.fullName || element.name)) {
            item = renderCharacterCard(element);
        }
        // Solo agregar dialog y event listener si existe el enlace y el div tiene contenido
        if (item && item.innerHTML.trim() !== '') {
            const openDialogLink = item.querySelector('.open-dialog');
            if (openDialogLink) {
                const dialog = document.createElement('dialog');
                item.appendChild(dialog);
                openDialogLink.addEventListener('click', async (e) => {
                    e.preventDefault();
                    if (isPotterDBSpell(element)) {
                        showHPDialog(element, dialog, hpApiSpells);
                        dialog.showModal();
                        return;
                    }
                    if (element.cover || element.title) {
                        await showBookDialog(element, dialog);
                        dialog.showModal();
                        return;
                    }
                    if (!isPotterDBSpell(element) && (element.image || element.fullName || element.name)) {
                        function normalizeName(str) {
                            return (str || '')
                                .toLowerCase()
                                .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
                                .replace(/[^a-z\s]/g, '')
                                .replace(/\s+/g, ' ').trim();
                        }
                        let potterNames = [];
                        if (element.fullName) {
                            const parts = element.fullName.split(' ');
                            potterNames.push(normalizeName(parts[0] + ' ' + parts[parts.length - 1]));
                            potterNames.push(normalizeName(element.fullName));
                        }
                        if (element.name) potterNames.push(normalizeName(element.name));
                        if (element.nickname) potterNames.push(normalizeName(element.nickname));
                        if (element.interpretedBy) potterNames.push(normalizeName(element.interpretedBy));
                        const charData = hpApiCharacters.find(c => {
                            const hpName = normalizeName(c.name || c.fullName || '');
                            const hpFirst3 = hpName.slice(0, 3);
                            const hpLast4 = hpName.slice(-4);
                            return potterNames.some(n => {
                                if (!n) return false;
                                const nFirst3 = n.slice(0, 3);
                                const nLast4 = n.slice(-4);
                                if (hpName === n || hpName.includes(n) || n.includes(hpName)) return true;
                                if (nFirst3 === hpFirst3 && nLast4 === hpLast4) return true;
                                return false;
                            }) || (Array.isArray(c.alternate_names) && c.alternate_names.some(alt => {
                                const altNorm = normalizeName(alt);
                                return potterNames.some(n => {
                                    if (!n) return false;
                                    const nFirst3 = n.slice(0, 3);
                                    const nLast4 = n.slice(-4);
                                    const altFirst3 = altNorm.slice(0, 3);
                                    const altLast4 = altNorm.slice(-4);
                                    if (altNorm === n || altNorm.includes(n) || n.includes(altNorm)) return true;
                                    if (nFirst3 === altFirst3 && nLast4 === altLast4) return true;
                                    return false;
                                });
                            }));
                        });
                        if (charData) {
                            showHPDialog(charData, dialog, hpApiSpells);
                        } else {
                            showHPDialog(element, dialog, hpApiSpells);
                        }
                        dialog.showModal();
                        return;
                    }
                    // Si no matchea nada, no mostrar dialog
                    return;
                });
                dialog.addEventListener('click', (e) => {
                    if (e.target === dialog) dialog.close();
                });
            }
            container.appendChild(item);
        }
    });
}


export function displayHouseDetails(houses) {
    const houseDetails = document.getElementById('house-details');
    houseDetails.innerHTML = '';
    houses.forEach(house => {
        const item = document.createElement('div');
        item.className = 'house-item';
        item.innerHTML = `
            <h2>${house.house}</h2>
            <p><strong>House Colors:</strong> ${house.colors}</p>
            <p><strong>Founder:</strong> ${house.founder}</p>
            <p><strong>Animal:</strong> ${house.animal} ${house.emoji}</p>
        `;
        houseDetails.appendChild(item);
    });
}