// darkMode.mjs
// Toggles between light and dark mode and changes the button icon

export function setupDarkModeToggle() {
    const toggleContainer = document.querySelector('.dark-mode-toggle');
    const toggleIcon = document.querySelector('.toggle-icon');
    if (!toggleContainer || !toggleIcon) return;
    toggleContainer.addEventListener('click', () => {
        document.body.classList.toggle('darkmode');
        if (document.body.classList.contains('darkmode')) {
            toggleIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}
