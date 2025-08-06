// wandCursor.mjs
// Cambia el cursor de la página por una varita mágica

export function setupWandCursor() {
    // Usa una imagen .cur para máxima compatibilidad
    const wandUrl = 'images/cursors/wand-cursor.cur';
    document.body.style.cursor = `url('${wandUrl}'), auto`;
}
