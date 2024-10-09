import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Truly An Amazing Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.textContent = '👉Click Me!👈';

app.append(button);
