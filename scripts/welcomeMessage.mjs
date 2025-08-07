const gryffindor = document.getElementById("house-button gryffindor");
const hufflepuff = document.getElementById("house-button hufflepuff");
const ravenclaw = document.getElementById("house-button ravenclaw");
const slytherin = document.getElementById("house-button slytherin");

export function setupWelcomeMessage() {
    gryffindor.addEventListener("click", () => {
        const welcomeContainer = document.querySelector(".welcome-container");
        welcomeContainer.innerHTML = `<h2>“Not Slytherin, eh?...Are you sure? You could be great, you know, it's all here in your head, and Slytherin will help you on the way to greatness, no doubt about that no? Well, if you're sure...better by... GRYFFINDOR!”<br>― J.K. Rowling</h2>`;
        localStorage.setItem('selectedHouse', 'gryffindor');
        welcomeContainer.classList.remove('welcome-animate');
        void welcomeContainer.offsetWidth;
        welcomeContainer.classList.add('welcome-animate');
    });
    hufflepuff.addEventListener("click", () => {
        const welcomeContainer = document.querySelector(".welcome-container");
        welcomeContainer.innerHTML = `<h2>“You might belong in Hufflepuff, where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil.”<br>― J.K. Rowling</h2>`;
        localStorage.setItem('selectedHouse', 'hufflepuff');
        welcomeContainer.classList.remove('welcome-animate');
        void welcomeContainer.offsetWidth;
        welcomeContainer.classList.add('welcome-animate');
    });
    ravenclaw.addEventListener("click", () => {
        const welcomeContainer = document.querySelector(".welcome-container");
        welcomeContainer.innerHTML = `<h2>"If You Have To Ask, You'll Never Know. If You Know, You Need Only Ask."<br>― Helena Ravenclaw</h2>`;
        localStorage.setItem('selectedHouse', 'ravenclaw');
        welcomeContainer.classList.remove('welcome-animate');
        void welcomeContainer.offsetWidth;
        welcomeContainer.classList.add('welcome-animate');
    });
    slytherin.addEventListener("click", () => {
        const welcomeContainer = document.querySelector(".welcome-container");
        welcomeContainer.innerHTML = `<h2>"You could be great, you know, it's all here in your head, and Slytherin will help you on the way to greatness, no doubt about that no? Well, if you're sure...better by... SLYTHERIN!”<br>― J.K. Rowling</h2>`;
        localStorage.setItem('selectedHouse', 'slytherin');
        welcomeContainer.classList.remove('welcome-animate');
        void welcomeContainer.offsetWidth;
        welcomeContainer.classList.add('welcome-animate');
    });
    // On page load, restore house selection and welcome message
    window.addEventListener('DOMContentLoaded', () => {
        const welcomeContainer = document.querySelector('.welcome-container');
        const selectedHouse = localStorage.getItem('selectedHouse');
        if (selectedHouse) {
            let message = '';
            switch (selectedHouse) {
                case 'gryffindor':
                    message = `<h2>“Not Slytherin, eh?...Are you sure? You could be great, you know, it's all here in your head, and Slytherin will help you on the way to greatness, no doubt about that no? Well, if you're sure...better by... GRYFFINDOR!”<br>― J.K. Rowling</h2>`;
                    break;
                case 'hufflepuff':
                    message = `<h2>“You might belong in Hufflepuff, where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil.”<br>― J.K. Rowling</h2>`;
                    break;
                case 'ravenclaw':
                    message = `<h2>"If You Have To Ask, You'll Never Know. If You Know, You Need Only Ask."<br>― Helena Ravenclaw</h2>`;
                    break;
                case 'slytherin':
                    message = `<h2>"You could be great, you know, it's all here in your head, and Slytherin will help you on the way to greatness, no doubt about that no? Well, if you're sure...better by... SLYTHERIN!”<br>― J.K. Rowling</h2>`;
                    break;
            }
            welcomeContainer.innerHTML = message;
            welcomeContainer.classList.remove('welcome-animate');
            void welcomeContainer.offsetWidth;
            welcomeContainer.classList.add('welcome-animate');
        }
    });
}