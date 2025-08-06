// year.mjs
// Sets the current year in the span with class 'year'

export function setCurrentYear() {
    const yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
