// darkMode.mjs
// Alterna entre modo claro y oscuro y cambia el ícono del botón

export function setupDarkModeToggle() {
    const toggleBtn = document.querySelector('.toggle-icon');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('darkmode');
        if (document.body.classList.contains('darkmode')) {
            toggleBtn.textContent = '☀️';
        } else {
            toggleBtn.textContent = '🌙';
        }
    });
}
