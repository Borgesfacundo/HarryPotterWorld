// darkMode.mjs
// Toggles between light and dark mode and changes the button icon

export function setupDarkModeToggle() {
    const toggleBtn = document.querySelector('.toggle-icon');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('darkmode');
        if (document.body.classList.contains('darkmode')) {
            toggleBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}
