export function createCardElement(imageName) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.card = imageName;

    // Etupuoli
    const imgFront = document.createElement("img");
    imgFront.classList.add("card-front");
    imgFront.src = `./muisti_kuvat/${imageName}`;

    // Takapuoli
    const imgBack = document.createElement("img");
    imgBack.classList.add("card-back");
    imgBack.src = "./muisti_kuvat/card-back.png";

    // Lisää kuvat kortin sisälle
    cardElement.appendChild(imgFront);
    cardElement.appendChild(imgBack);

    return cardElement;
}