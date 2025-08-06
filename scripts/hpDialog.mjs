export function showHPDialog(element, dialog) {
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
    // Spell dialog (HP-API fields only)
    else if (element.name && element.description !== undefined) {
        dialog.innerHTML = `
            <h2>${element.name}</h2>
            <p><strong>Description:</strong> ${element.description || 'Unknown'}</p>
            <p><strong>Type:</strong> ${element.type || 'Unknown'}</p>
            <button class="close-dialog">Close</button>
        `;
        dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
    }
}
