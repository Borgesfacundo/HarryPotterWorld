// Function to display fetched data in the HTML
// This function assumes that the data is an array of objects with properties like title, cover, image, name, fullName, etc.
export function mainDisplay(data) {
    const container = document.getElementById('content-display');
    container.innerHTML = ''; // Clear previous content

    data.forEach(element => {
        const item = document.createElement('div');
        item.className = 'item';
        // Detect type and show image and main name
        let imgSrc = '';
        let name = '';
        if (element.cover) {
            // Book
            imgSrc = element.cover;
            name = element.title || element.originalTitle || 'No title';
        } else if (element.image) {
            // Character
            imgSrc = element.image;
            name = element.fullName || element.name || 'No name';
        } else if (element.spell) {
            // Spell
            imgSrc = 'images/logo.webp';
            name = element.spell;
        } else if (element.title) {
            // Book without cover
            imgSrc = 'images/logo.webp';
            name = element.title;
        } else if (element.fullName || element.name) {
            // Character or spell without image
            imgSrc = 'images/logo.webp';
            name = element.fullName || element.name;
        } else {
            imgSrc = 'images/logo.webp';
            name = 'No name';
        }
        item.innerHTML = `
            <img src="${imgSrc}" alt="${name}" />
            <h2>${name}</h2>
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

export function displayHouseDetails(houses) {
    const houseDetails = document.getElementById('house-details');

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