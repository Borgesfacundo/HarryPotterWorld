export function showHPDialog(element, dialog, hpApiCharacters = []) {
    console.log('showHPDialog received data:', element);
    console.log('Showing HP Dialog for:', element);
    // Detects if it is a PotterDB spell
    function isPotterDBSpell(obj) {
        return ('category' in obj && 'effect' in obj);
    }

    if (isPotterDBSpell(element)) {
        // Special dialog for PotterDB spells
        dialog.innerHTML = `
            <div class="spell-dialog">
                ${element.image ? `<img src="${element.image}" alt="${element.name}" style="max-width:120px;max-height:120px;" />` : ''}
                <h2>${element.name || ''}</h2>
                <p><strong>Incantation:</strong> ${element.incantation || 'Unavailable'}</p>
                <p><strong>Category:</strong> ${element.category || 'Unavailable'}</p>
                <p><strong>Effect:</strong> ${element.effect || 'Unavailable'}</p>
                <p><strong>Creator:</strong> ${element.creator || 'Unavailable'}</p>
                <p><strong>Hand:</strong> ${element.hand || 'Unavailable'}</p>
                <p><strong>Light:</strong> ${element.light || 'Unavailable'}</p>
                <p><strong>Slug:</strong> ${element.slug || 'Unavailable'}</p>
                <p><strong>Wiki:</strong> <a href="${element.wiki || '#'}" target="_blank">${element.wiki || ''}</a></p>
            </div>
            <button class="close-dialog">Close</button>
        `;
        dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
        return;
    }

    // If it is a character (HP-API or PotterAPI)
    const hasName = element.name || element.fullName;
    if (hasName) {
        // If the object is PotterAPI, search for matching in HP-API
        let hpChar = null;
        // If the full array is not passed, try to use the global
        if (!Array.isArray(hpApiCharacters) || hpApiCharacters.length === 0) {
            if (window && Array.isArray(window.hpApiCharacters)) {
                hpApiCharacters = window.hpApiCharacters;
            }
        }
        if (Array.isArray(hpApiCharacters) && hpApiCharacters.length > 0) {
            console.log('hpApiCharacters count:', hpApiCharacters.length);
            // Normalizes names for matching (same as mainDisplay)
            function normalizeName(str) {
                return (str || '').toLowerCase()
                    .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
                    .replace(/[^a-z0-9\s]/g, '')
                    .replace(/\s+/g, ' ').trim();
            }
            // PotterAPI: main name
            const potterName = normalizeName(element.fullName || element.name || '');
            console.log('PotterAPI name (normalized):', potterName);
            hpApiCharacters.forEach(c => {
                const hpName = normalizeName(c.name || c.fullName || '');
                const alternates = Array.isArray(c.alternate_names) ? c.alternate_names.map(normalizeName) : [];
                if (c.nickname) alternates.push(normalizeName(c.nickname));
                console.log('Comparando con HP-API:', hpName, alternates);
            });
            hpChar = hpApiCharacters.find(c => {
                const hpName = normalizeName(c.name || c.fullName || '');
                // Alternate names
                const alternates = Array.isArray(c.alternate_names) ? c.alternate_names.map(normalizeName) : [];
                // HP-API nickname
                if (c.nickname) alternates.push(normalizeName(c.nickname));
                // Direct match
                if (hpName.includes(potterName) || potterName.includes(hpName)) return true;
                // Match with alternates
                return alternates.some(alt => alt.includes(potterName) || potterName.includes(alt));
            });
        }
        // If there is a match in HP-API, show HP-API dialog
        if (hpChar) {
            const dob = hpChar.dateOfBirth || hpChar.dateofBirth || 'Unknown';
            const actor = hpChar.actor || hpChar.interpretedBy || 'Unknown';
            dialog.innerHTML = `
                <h2>${hpChar.name || hpChar.fullName}</h2>
                <img src="${hpChar.image || 'images/logo.webp'}" alt="${hpChar.name || hpChar.fullName}" />
                <p><strong>Alternate Names:</strong> ${hpChar.alternate_names || hpChar.nickname || 'Unknown'}</p>
                <p><strong>House:</strong> ${hpChar.house || hpChar.hogwartsHouse || 'Unknown'}</p>
                <p><strong>Date of Birth:</strong> ${dob}</p>
                <p><strong>Species:</strong> ${hpChar.species || 'Unknown'}</p>
                <p><strong>Gender:</strong> ${hpChar.gender || 'Unknown'}</p>
                <p><strong>Wizard:</strong> ${hpChar.wizard ? 'Yes' : 'No'}</p>
                <p><strong>Ancestry:</strong> ${hpChar.ancestry || 'Unknown'}</p>
                <p><strong>Patronus:</strong> ${hpChar.patronus || 'Unknown'}</p>
                <p><strong>Eye Colour:</strong> ${hpChar.eyeColour || hpChar.eyeColor || 'Unknown'}</p>
                <p><strong>Hair Colour:</strong> ${hpChar.hairColour || hpChar.hairColor || 'Unknown'}</p>
                <p><strong>Actor:</strong> ${actor}</p>
                <p><strong>Wand:</strong> ${hpChar.wand ? `${hpChar.wand.wood || ''} ${hpChar.wand.core || ''} ${hpChar.wand.length || ''}` : 'Unknown'}</p>
                <button class="close-dialog">Close</button>
            `;
            dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
            return;
        }
        // If there is no match, show data from the original object (PotterAPI)
        if ('image' in element || 'actor' in element || 'wand' in element) {
            const dob = element.dateOfBirth || element.dateofBirth || 'Unknown';
            const actor = element.actor || element.interpretedBy || 'Unknown';
            dialog.innerHTML = `
                <h2>${element.name || element.fullName}</h2>
                <img src="${element.image || 'images/logo.webp'}" alt="${element.name || element.fullName}" />
                <p><strong>Alternate Names:</strong> ${element.alternate_names || element.nickname || 'Unknown'}</p>
                <p><strong>House:</strong> ${element.house || element.hogwartsHouse || 'Unknown'}</p>
                <p><strong>Date of Birth:</strong> ${dob}</p>
                <p><strong>Species:</strong> ${element.species || 'Unknown'}</p>
                <p><strong>Gender:</strong> ${element.gender || 'Unknown'}</p>
                <p><strong>Wizard:</strong> ${element.wizard ? 'Yes' : 'No'}</p>
                <p><strong>Ancestry:</strong> ${element.ancestry || 'Unknown'}</p>
                <p><strong>Patronus:</strong> ${element.patronus || 'Unknown'}</p>
                <p><strong>Eye Colour:</strong> ${element.eyeColour || element.eyeColor || 'Unknown'}</p>
                <p><strong>Hair Colour:</strong> ${element.hairColour || element.hairColor || 'Unknown'}</p>
                <p><strong>Actor:</strong> ${actor}</p>
                <p><strong>Wand:</strong> ${element.wand ? `${element.wand.wood || ''} ${element.wand.core || ''} ${element.wand.length || ''}` : 'Unknown'}</p>
                <button class="close-dialog">Close</button>
            `;
        } else {
            dialog.innerHTML = `
                <h2>${element.fullName || element.name}</h2>
                <p><strong>House:</strong> ${element.house || 'Unknown'}</p>
                <p><strong>Role:</strong> ${element.role || 'Unknown'}</p>
                <p><strong>Blood Status:</strong> ${element.bloodStatus || 'Unknown'}</p>
                <p><strong>Species:</strong> ${element.species || 'Unknown'}</p>
                <p><strong>School:</strong> ${element.school || 'Unknown'}</p>
                <p><strong>Birthday:</strong> ${element.birthday || 'Unknown'}</p>
                <p><strong>Death:</strong> ${element.death || 'Unknown'}</p>
                <p><strong>Patronus:</strong> ${element.patronus || 'Unknown'}</p>
                <p><strong>Wand:</strong> ${element.wand || 'Unknown'}</p>
                <button class="close-dialog">Close</button>
            `;
        }
        dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
        return;
    }

    // If it is neither spell nor character, show message
    dialog.innerHTML = `<p>Tipo de entidad desconocido.</p><button class="close-dialog">Close</button>`;
    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
}
