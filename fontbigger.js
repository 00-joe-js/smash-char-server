const h1 = document.querySelector("h1");
let starting = 12;
setInterval(() => {
    starting += 5;
    h1.style.fontSize = `${starting}px`
}, 1000);