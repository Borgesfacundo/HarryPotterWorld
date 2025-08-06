// Imports the module to show the students dialog
import { showHouseStudentsDialog } from './houseDialog.mjs';

// ...existing code...
export function displayHouseDetails(houses, hpApiCharacters = []) {
    const houseDetails = document.getElementById('house-details');
    houseDetails.innerHTML = `<h1 class="house-section-title">Casas de Hogwarts</h1>`;
    houses.forEach(house => {
        const item = document.createElement('div');
        item.className = 'house-item';
        item.innerHTML = `
            <h2>${house.house}</h2>
            <p><strong>House Colors:</strong> ${house.colors}</p>
            <p><strong>Founder:</strong> ${house.founder}</p>
            <p><strong>Animal:</strong> ${house.animal} ${house.emoji}</p>
            <button class="show-students">Ver estudiantes</button>
        `;
        // Button to open the students dialog
        const btn = item.querySelector('.show-students');
        btn.style.display = 'inline-block';
        btn.addEventListener('click', () => {
            let dialog = document.getElementById('house-students-dialog');
            if (!dialog) {
                dialog = document.createElement('dialog');
                dialog.id = 'house-students-dialog';
                document.body.appendChild(dialog);
            }
            dialog.showModal();
            showHouseStudentsDialog(house.house, dialog, hpApiCharacters);
        });
        houseDetails.appendChild(item);
    });
}
// ...existing code...
