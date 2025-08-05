// Function to display fetched data in the HTML
// This function assumes that the data is an array of objects with properties like title, cover,
export function mainDisplay(data) {
    const container = document.getElementById('content-display');
    container.innerHTML = ''; // Clear previous content

    data.forEach(element => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <img src="${element.cover}" alt="${element.originalTitle}" />
            <h2>${element.title}</h2>
            <p><strong>Book #</strong>${element.number}</p>
            <p><strong>Released:</strong> ${element.releaseDate}</p>
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