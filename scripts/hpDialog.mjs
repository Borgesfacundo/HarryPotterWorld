export function showHPDialog(element, dialog, spellsArray = []) {
    console.log('showHPDialog received data:', element);
    console.log('Showing HP Dialog for:', element);
    // Detecta si es spell PotterDB
    function isPotterDBSpell(obj) {
        return ('category' in obj && 'effect' in obj);
    }

    if (isPotterDBSpell(element)) {
        // Dialog especial para spells PotterDB
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

    // Si es character (HP-API)
    const hasName = element.name || element.fullName;
    const dob = element.dateOfBirth || element.dateofBirth || 'Unknown';
    const actor = element.actor || element.interpretedBy || 'Unknown';
    if (hasName) {
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
        dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
        return;
    }

    // Si no es spell ni character, mostrar mensaje
    dialog.innerHTML = `<p>Tipo de entidad desconocido.</p><button class="close-dialog">Close</button>`;
    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
}
