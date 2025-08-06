// houseDialog.mjs
// Muestra un dialog con todos los estudiantes de una house usando datos de HP-API

export function showHouseStudentsDialog(houseName, dialog, hpApiCharacters = []) {
    // Normaliza el nombre de la casa para matching
    function normalizeHouse(str) {
        return (str || '').toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    }
    const normalizedHouse = normalizeHouse(houseName);
    // Filtra estudiantes de la casa
    const students = hpApiCharacters.filter(c => normalizeHouse(c.house || c.hogwartsHouse) === normalizedHouse);
    dialog.innerHTML = `
        <h2>Estudiantes de ${houseName}</h2>
        <ul>
            ${students.length > 0 ? students.map(s => `<li>${s.name || s.fullName}</li>`).join('') : '<li>No hay estudiantes encontrados.</li>'}
        </ul>
        <button class="close-dialog">Cerrar</button>
    `;
    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
}
