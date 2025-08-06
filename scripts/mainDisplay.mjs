// Logging moved inside mainDisplay
import { mainFetch } from "./fetchingData.mjs";
import { showBookDialog } from "./bookDialog.mjs";
import { showHPDialog } from "./hpDialog.mjs";
// Function to display fetched data in the HTML
// This function assumes that the data is an array of objects with properties like title, cover, image, name, fullName, etc.
export function mainDisplay(data) {
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
        const item = document.createElement('div');
        item.className = 'item';
        let imgSrc = '';
        let name = '';
        // Book
        if (element.cover || element.title) {
            imgSrc = element.cover || 'images/logo.webp';
            name = element.title || element.originalTitle || 'No title';
        }
        // Character or Spell
        else if (element.image || element.fullName || element.name || element.spell) {
            imgSrc = element.image || 'images/logo.webp';
            name = element.fullName || element.name || element.spell || 'Unknown';
        }
        // Card content
        item.innerHTML = `
            <img src="${imgSrc}" alt="${name}" />
            <h3>${name}</h3>
            <a href="#" class="open-dialog">Ver más</a>
        `;
        // Dialog setup
        const dialog = document.createElement('dialog');
        item.appendChild(dialog);
        item.querySelector('.open-dialog').addEventListener('click', async (e) => {
            e.preventDefault();
            if (element.cover || element.title) {
                await showBookDialog(element, dialog);
            } else if (element.spell || (element.name && element.type)) {
                showHPDialog(element, dialog, hpApiSpells);
            } else if (element.name || element.fullName) {
                // Fuzzy matching for HP-API characters
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
                    const hpName = normalizeName(c.name);
                    return potterNames.some(n => {
                        if (!n) return false;
                        // Fuzzy: compare first 3 and last 4 chars
                        const nFirst3 = n.slice(0, 3);
                        const nLast4 = n.slice(-4);
                        const hpFirst3 = hpName.slice(0, 3);
                        const hpLast4 = hpName.slice(-4);
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
            }
            dialog.showModal();
        });
        // Event to close the dialog when clicking outside
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.close();
        });
        container.appendChild(item);
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