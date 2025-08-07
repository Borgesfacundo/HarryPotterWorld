// houseDialog.mjs
// Shows a dialog with all students of a house using HP-API data

export function showHouseStudentsDialog(houseName, dialog, hpApiCharacters = []) {
    // Normalizes the house name for matching
    function normalizeHouse(str) {
        return (str || '').toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    }
    const normalizedHouse = normalizeHouse(houseName);
    // Filters students of the house
    const students = hpApiCharacters.filter(c => normalizeHouse(c.house || c.hogwartsHouse) === normalizedHouse);
    dialog.innerHTML = `
        <h2>Students of ${houseName}</h2>
        <ul>
            ${students.length > 0 ? students.map(s => `<li>${s.name || s.fullName}</li>`).join('') : '<li>No hay estudiantes encontrados.</li>'}
        </ul>
        <button class="close-dialog">Close</button>
    `;
    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
}
