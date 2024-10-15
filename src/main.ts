/**
import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Poke Me";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// init counter
let counter1: number = 0;
let growthRate: number = 0;

// clicker counter display
const counter1Div = document.createElement("div");
counter1Div.textContent = `${counter1} pokes`;
app.append(counter1Div);

// Create growth rate display (+++)
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth rate: ${growthRate.toFixed(1)} pokes/sec`;
app.append(growthRateDiv);

// clicker button
const button1 = document.createElement("button");
button1.id = "button1";
button1.textContent = '👉Poke Me!👈';
app.append(button1);

// click event: button adds +1 to counter
button1.addEventListener("click", () => {
    counter1++;
    updatePurchaseButtonState();
    counter1Div.textContent = `${counter1} pokes`;
});

// upgrade item data
const upgrades = [
    { name: "Faster Clicking", cost: 10, rate: 0.1, count: 0, button: null as HTMLButtonElement | null },
    { name: "Advanced Reflex Training", cost: 100, rate: 2.0, count: 0, button: null as HTMLButtonElement | null },
    { name: "Cybernetic Enhancements", cost: 1000, rate: 50.0, count: 0, button: null as HTMLButtonElement | null }
];

// create and display upgrade buttons
upgrades.forEach((upgrade) => {
    const purchaseButton = document.createElement("button");
    purchaseButton.textContent = `Buy ${upgrade.name} (cost: ${upgrade.cost} pokes)`;
    purchaseButton.disabled = true;
    app.append(purchaseButton);

    upgrade.button = purchaseButton;
    
    // respective upgrade count display
    const upgradeStatusDiv = document.createElement("div");
    upgradeStatusDiv.textContent = `${upgrade.name} purchased: ${upgrade.count}`;
    app.append(upgradeStatusDiv);

    // buy event
    purchaseButton.addEventListener("click", () => {
        if (counter1 >= upgrade.cost) {
            counter1 -= upgrade.cost; // deduct cost
            growthRate += upgrade.rate; // increase growth rate
            upgrade.count++; // add to count for the respective upgrade

            // display update
            counter1Div.textContent = `${counter1} pokes`;
            upgradeStatusDiv.textContent = `${upgrade.name} purchased: ${upgrade.count}`;
            growthRateDiv.textContent = `Growth rate: ${growthRate.toFixed(1)} pokes/sec`;

            updatePurchaseButtonState();
        }
    });
});

// button state for upgrades to make sure you have enough 'pokes'
const updatePurchaseButtonState = () => {
    upgrades.forEach((upgrade) => {
        if (upgrade.button) {
            upgrade.button.disabled = counter1 < upgrade.cost;
        }
    });
};

// variable for requestAnimationFrame
let lastTime: number = 0;

// animation loop using requestAnimationFrame
const updateCounter = (timestamp: number) => {
    if (lastTime) {
        const elapsed = (timestamp - lastTime) / 1000;
        counter1 += elapsed * growthRate; // increments counter based on growth rate
        counter1Div.textContent = `${Math.floor(counter1)} pokes`; // display as integer
    }
    lastTime = timestamp;

    requestAnimationFrame(updateCounter);
};

// starts animationloop
requestAnimationFrame(updateCounter);
**/

import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Poke Me";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// init counter
let counter1: number = 0;
let growthRate: number = 0;

// clicker counter display
const counter1Div = document.createElement("div");
counter1Div.textContent = `${counter1} pokes`;
app.append(counter1Div);

// Create growth rate display (+++)
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth rate: ${growthRate.toFixed(1)} pokes/sec`;
app.append(growthRateDiv);

// clicker button
const button1 = document.createElement("button");
button1.id = "button1";
button1.textContent = '👉Poke Me!👈';
app.append(button1);

// click event: button adds +1 to counter
button1.addEventListener("click", () => {
    counter1++;
    updatePurchaseButtonState();
    counter1Div.textContent = `${counter1} pokes`;
});

// upgrade item data
const upgrades = [
    { name: "Faster Clicking", cost: 10, rate: 0.1, count: 0, button: null as HTMLButtonElement | null },
    { name: "Advanced Reflex Training", cost: 100, rate: 2.0, count: 0, button: null as HTMLButtonElement | null },
    { name: "Cybernetic Enhancements", cost: 1000, rate: 50.0, count: 0, button: null as HTMLButtonElement | null }
];

// create and display upgrade buttons in a row
const upgradeContainer = document.createElement("div");
upgradeContainer.classList.add("upgrade-container");
app.append(upgradeContainer);

upgrades.forEach((upgrade) => {
    const upgradeBox = document.createElement("div");
    upgradeBox.classList.add("upgrade-box");

    // upgrade name
    const upgradeTitle = document.createElement("div");
    upgradeTitle.classList.add("upgrade-title");
    upgradeTitle.textContent = upgrade.name;

    // upgrade count display
    const upgradeCount = document.createElement("div");
    upgradeCount.classList.add("upgrade-count");
    upgradeCount.textContent = `(${upgrade.count})`;

    // upgrade purchase button
    const purchaseButton = document.createElement("button");
    purchaseButton.textContent = `Buy (cost: ${upgrade.cost} pokes)`;
    purchaseButton.disabled = true;

    upgrade.button = purchaseButton;

    // Append elements in order
    upgradeBox.append(upgradeTitle, upgradeCount, purchaseButton);
    upgradeContainer.append(upgradeBox);

    // buy event
    purchaseButton.addEventListener("click", () => {
        if (counter1 >= upgrade.cost) {
            counter1 -= upgrade.cost; // deduct cost
            growthRate += upgrade.rate; // increase growth rate
            upgrade.count++; // add to count for the respective upgrade

            // display update
            counter1Div.textContent = `${counter1} pokes`;
            upgradeCount.textContent = `(${upgrade.count})`;
            growthRateDiv.textContent = `Growth rate: ${growthRate.toFixed(1)} pokes/sec`;

            updatePurchaseButtonState();
        }
    });
});

// button state for upgrades to make sure you have enough 'pokes'
const updatePurchaseButtonState = () => {
    upgrades.forEach((upgrade) => {
        if (upgrade.button) {
            upgrade.button.disabled = counter1 < upgrade.cost;
        }
    });
};

// variable for requestAnimationFrame
let lastTime: number = 0;

// animation loop using requestAnimationFrame
const updateCounter = (timestamp: number) => {
    if (lastTime) {
        const elapsed = (timestamp - lastTime) / 1000;
        counter1 += elapsed * growthRate; // increments counter based on growth rate
        counter1Div.textContent = `${Math.floor(counter1)} pokes`; // display as integer
    }
    lastTime = timestamp;

    requestAnimationFrame(updateCounter);
};

// starts animationloop
requestAnimationFrame(updateCounter);
