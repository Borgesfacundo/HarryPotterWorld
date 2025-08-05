import { mainFetch } from "./fetchingData.mjs";
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
            // If it's a book, fetch extra info from Potter DB API
            if (element.cover || element.title) {
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
        // Create the empty dialog
        const dialog = document.createElement('dialog');
        dialog.className = 'info-dialog';
        dialog.innerHTML = '<p>Loading...</p>';
        item.appendChild(dialog);
        // Event to open the dialog
        item.querySelector('.open-dialog').addEventListener('click', async (e) => {
            e.preventDefault();
            // If it's a book, fetch extra info from Potter DB API
            if (element.cover || element.title) {
            } else if (element.image || element.fullName || element.name) {
                // Character from HP-API
                dialog.innerHTML = `
                    <h2>${element.fullName || element.name}</h2>
                    <img src="${element.image || 'images/logo.webp'}" alt="${element.fullName || element.name}" />
                    <p><strong>House:</strong> ${element.house || 'Unknown'}</p>
                    <p><strong>Species:</strong> ${element.species || 'Unknown'}</p>
                    <p><strong>Gender:</strong> ${element.gender || 'Unknown'}</p>
                    <p><strong>Date of Birth:</strong> ${element.dateOfBirth || 'Unknown'}</p>
                    <p><strong>Wizard:</strong> ${element.wizard ? 'Yes' : 'No'}</p>
                    <p><strong>Ancestry:</strong> ${element.ancestry || 'Unknown'}</p>
                    <p><strong>Patronus:</strong> ${element.patronus || 'Unknown'}</p>
                    <p><strong>Actor:</strong> ${element.actor || 'Unknown'}</p>
                    <button class="close-dialog">Close</button>
                `;
                dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
            } else if (element.spell) {
                // Spell from HP-API
                dialog.innerHTML = `
                    <h2>${element.spell}</h2>
                    <p><strong>Type:</strong> ${element.type || 'Unknown'}</p>
                    <p><strong>Effect:</strong> ${element.effect || 'Unknown'}</p>
                    <p><strong>Light:</strong> ${element.light || 'Unknown'}</p>
                    <button class="close-dialog">Close</button>
                `;
                dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
                // Potter DB API: https://api.potterdb.com/v1/books
                let apiUrl = `https://api.potterdb.com/v1/books?filter[title]=${encodeURIComponent(element.title || element.originalTitle || '')}`;
                try {
                    const result = await mainFetch(apiUrl);
                    console.log('Potter DB API result:', result);
                    let book = null;
                    if (result && result.data && result.data.length > 0) {
                        // Buscar el libro que más se parezca al título
                        const searchTitle = (element.title || element.originalTitle || '').toLowerCase();
                        book = result.data.find(b => {
                            const apiTitle = b.attributes.title ? b.attributes.title.toLowerCase() : '';
                            return apiTitle === searchTitle || apiTitle.includes(searchTitle);
                        });
                        if (!book) {
                            // Si no hay coincidencia exacta, tomar el primero
                            book = result.data[0];
                        }
                        book = book.attributes;
                        dialog.innerHTML = `
                            <h2>${book.title}</h2>
                            <p><strong>Author:</strong> ${book.author || 'Unknown'}</p>
                            <img src="${book.cover || 'images/logo.webp'}" alt="${book.title}" />
                            <p><strong>Dedication:</strong> ${book.dedication || 'No dedication available.'}</p>
                            <p><strong>Pages:</strong> ${book.pages}</p>
                            <p><strong>Release Date:</strong> ${book.release_date || 'Unknown'}</p>
                            <p><strong>Summary:</strong> ${book.summary || 'No summary available.'}</p>
                            <a href="${book.wiki || '#'}" target="_blank">More Info</a>
                            <button class="close-dialog">Close</button>
                        `;
                    } else {
                        dialog.innerHTML = `<p>No extra info found for this book.</p><button class="close-dialog">Close</button>`;
                    }
                } catch (err) {
                    dialog.innerHTML = `<p>Error loading book info.</p><button class="close-dialog">Close</button>`;
                }
                // Add close button event
                dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
            }
            dialog.showModal();
        });
        // Event to close the dialog when clicking outside
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