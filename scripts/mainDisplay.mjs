import { mainFetch } from "./fetchingData.mjs";
import { showBookDialog } from "./bookDialog.mjs";
import { showHPDialog } from "./hpDialog.mjs";
// Function to display fetched data in the HTML
// This function assumes that the data is an array of objects with properties like title, cover, image, name, fullName, etc.
export function mainDisplay(data) {
    const container = document.getElementById('content-display');
    container.innerHTML = ''; // Clear previous content

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
        // Character or Spell (HP-API)
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
            } else {
                showHPDialog(element, dialog);
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