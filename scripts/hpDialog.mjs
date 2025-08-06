export function showHPDialog(element, dialog, spellsArray = []) {
    console.log('Showing HP Dialog for:', element);
    // Character dialog (HP-API fields only)
    if (element.name && element.dateOfBirth !== undefined) {
        const dob = element.dateOfBirth || 'Unknown';
        const actor = element.actor || 'Unknown';
        dialog.innerHTML = `
            <h2>${element.name}</h2>
            <img src="${element.image || 'images/logo.webp'}" alt="${element.name}" />
            <p><strong>Alternate Names:</strong> ${element.alternate_names || 'Unknown'}</p>
            <p><strong>House:</strong> ${element.house || 'Unknown'}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
            <p><strong>Species:</strong> ${element.species || 'Unknown'}</p>
            <p><strong>Gender:</strong> ${element.gender || 'Unknown'}</p>
            <p><strong>Wizard:</strong> ${element.wizard ? 'Yes' : 'No'}</p>
            <p><strong>Ancestry:</strong> ${element.ancestry || 'Unknown'}</p>
            <p><strong>Patronus:</strong> ${element.patronus || 'Unknown'}</p>
            <p><strong>Eye Colour:</strong> ${element.eyeColour || 'Unknown'}</p>
            <p><strong>Hair Colour:</strong> ${element.hairColour || 'Unknown'}</p>
            <p><strong>Actor:</strong> ${actor}</p>
            <p><strong>Wand:</strong> ${element.wand ? `${element.wand.wood || ''} ${element.wand.core || ''} ${element.wand.length || ''}` : 'Unknown'}</p>
            <button class="close-dialog">Close</button>
        `;
        dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
    }
    // Spell dialog (Potter DB API, local array)
    else if (element.spell || element.name) {
        // Prefer PotterAPI spell name, fallback to HP-API name
        const requestedRaw = (element.spell || element.name);
        const normalize = str => (str || '').toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
        const requested = normalize(requestedRaw);
        console.log('Potter DB spells array:', spellsArray);
        let spell = null;
        if (Array.isArray(spellsArray)) {
            spell = spellsArray.find(s => {
                const spellNorm = normalize(s.name);
                if (spellNorm === requested) return true;
                // Fuzzy: compare first 3 and last 4 chars
                return spellNorm.slice(0,3) === requested.slice(0,3) && spellNorm.slice(-4) === requested.slice(-4);
            });
        }
        if (spell) {
            dialog.innerHTML = `
                <h2>${spell.name}</h2>
                <p><strong>Type:</strong> ${spell.type || 'Unknown'}</p>
                <p><strong>Incantation:</strong> ${spell.incantation || 'Unknown'}</p>
                <p><strong>Effect:</strong> ${spell.effect || 'Unknown'}</p>
                <p><strong>Light:</strong> ${spell.light || 'Unknown'}</p>
                <p><strong>Creator:</strong> ${spell.creator || 'Unknown'}</p>
                <p><strong>Wiki:</strong> <a href="${spell.wiki || '#'}" target="_blank">Más info</a></p>
                <button class="close-dialog">Close</button>
            `;
        } else {
            dialog.innerHTML = `<p>No info found for this spell in Potter DB API.</p><button class="close-dialog">Close</button>`;
        }
        dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
    }
}
