export function showHPDialog(element, dialog) {
    // Character dialog
    if (element.image || element.fullName || element.name) {
        const dob = element.dateOfBirth || element.date_of_birth || 'Unknown';
        const actor = element.actor || element.actor_name || 'Unknown';
        dialog.innerHTML = `
            <h2>${element.fullName || element.name}</h2>
            <img src="${element.image || 'images/logo.webp'}" alt="${element.fullName || element.name}" />
            <p><strong>House:</strong> ${element.house || 'Unknown'}</p>
            <p><strong>Species:</strong> ${element.species || 'Unknown'}</p>
            <p><strong>Gender:</strong> ${element.gender || 'Unknown'}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
            <p><strong>Wizard:</strong> ${element.wizard ? 'Yes' : 'No'}</p>
            <p><strong>Ancestry:</strong> ${element.ancestry || 'Unknown'}</p>
            <p><strong>Patronus:</strong> ${element.patronus || 'Unknown'}</p>
            <p><strong>Actor:</strong> ${actor}</p>
            <button class="close-dialog">Close</button>
        `;
        dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
    }
    // Spell dialog
    else if (element.spell) {
        dialog.innerHTML = `
            <h2>${element.spell}</h2>
            <p><strong>Type:</strong> ${element.type || 'Unknown'}</p>
            <p><strong>Effect:</strong> ${element.effect || 'Unknown'}</p>
            <p><strong>Light:</strong> ${element.light || 'Unknown'}</p>
            <button class="close-dialog">Close</button>
        `;
        dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
    }
}
