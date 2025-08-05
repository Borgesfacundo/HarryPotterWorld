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
        `;
        container.appendChild(item);
    });
}