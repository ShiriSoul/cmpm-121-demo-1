import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Truly An Amazing Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// init counter
let counter1: number = 0;

// clicker counter display
const counter1Div = document.createElement("div");
counter1Div.textContent = `${counter1} pokes`;
app.append(counter1Div);

// clicker button
const button1 = document.createElement("button");
button1.id = "button1";
button1.textContent = '👉Click Me!👈';
app.append(button1);

// click event: button adds +1 to counter
button1.addEventListener("click", () => {
    counter1++;
    counter1Div.textContent = `${counter1} pokes`;
});

// auto-clicker
setInterval(() => {
    counter1++;
    counter1Div.textContent = `${counter1} pokes`;
}, 1000);