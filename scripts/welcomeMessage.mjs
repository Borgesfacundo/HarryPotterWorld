const gryffindor = document.getElementById("house-button gryffindor");
const hufflepuff = document.getElementById("house-button hufflepuff");
const ravenclaw = document.getElementById("house-button ravenclaw");
const slytherin = document.getElementById("house-button slytherin");

export function setupWelcomeMessage() {
    gryffindor.addEventListener("click", () => {
        const welcomeContainer = document.querySelector(".welcome-container");
        welcomeContainer.innerHTML = `<h2>“Not Slytherin, eh?...Are you sure? You could be great, you know, it's all here in your head, and Slytherin will help you on the way to greatness, no doubt about that no? Well, if you're sure...better by... GRYFFINDOR!”<br>― J.K. Rowling</h2>`;
    });
    hufflepuff.addEventListener("click", () => {
        const welcomeContainer = document.querySelector(".welcome-container");
        welcomeContainer.innerHTML = `<h2>“You might belong in Hufflepuff, where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil.”<br>― J.K. Rowling</h2>`;
    });
    ravenclaw.addEventListener("click", () => {
        const welcomeContainer = document.querySelector(".welcome-container");
        welcomeContainer.innerHTML = `<h2>"If You Have To Ask, You'll Never Know. If You Know, You Need Only Ask."<br>― Helena Ravenclaw</h2>`;
    });
    slytherin.addEventListener("click", () => {
        const welcomeContainer = document.querySelector(".welcome-container");
        welcomeContainer.innerHTML = `<h2>"You could be great, you know, it's all here in your head, and Slytherin will help you on the way to greatness, no doubt about that no? Well, if you're sure...better by... SLYTHERIN!”<br>― J.K. Rowling</h2>`;
    });
}