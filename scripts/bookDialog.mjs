import { mainFetch } from "./fetchingData.mjs";

export async function showBookDialog(element, dialog) {
    let apiUrl = `https://api.potterdb.com/v1/books?filter[title]=${encodeURIComponent(element.title || element.originalTitle || '')}`;
    try {
        const result = await mainFetch(apiUrl);
        let book = null;
        if (result && result.data && result.data.length > 0) {
            const searchTitle = (element.title || element.originalTitle || '').toLowerCase();
            book = result.data.find(b => {
                const apiTitle = b.attributes.title ? b.attributes.title.toLowerCase() : '';
                return apiTitle === searchTitle || apiTitle.includes(searchTitle);
            });
            if (!book) {
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
    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
}
