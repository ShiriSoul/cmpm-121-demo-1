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

// variable for requestAnimationFrame
let lastTime: number = 0;

// animation loop using requestAnimationFrame
const updateCounter = (timestamp: number) => {
    if (lastTime) {
        // calculates elapsed time in seconds
        const elapsed = (timestamp - lastTime) / 1000;
        
        // increments counter by elapsed time to be 1 per second
        counter1 += elapsed;
        
        // updates display
        counter1Div.textContent = `${Math.floor(counter1)} pokes`; // displays integers (whole nums)
    }
    lastTime = timestamp;

    requestAnimationFrame(updateCounter);
};
// starts animationloop
requestAnimationFrame(updateCounter);