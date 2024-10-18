import "./style.css";

// Define the Item interface
interface Item {
    name: string;
    cost: number;
    rate: number;
    description: string;
}

// Available items array
const availableItems: Item[] = [
    { name: "Speedy Reflexes 👆", cost: 10, rate: 0.1, description: "Quicker Movement for faster clicks. +0.1" },
    { name: "Strong Muscles 💪", cost: 100, rate: 2, description: "Powerful Pokes for efficient clicks. +2" },
    { name: "More Hands 🙎‍♂️", cost: 1000, rate: 50, description: "Another friend here to help. +50" },
    { name: "Goldly Pokes 🌟", cost: 10000, rate: 100, description: "Ascension in the art of poking. +100" },
    { name: "Midas Touch ⚖️", cost: 10, rate: 0, description: "Money hands. x2 click worth" }
];

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Poke Me";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// init counter
let counter1: number = 0;
let growthRate: number = 0;
let clickValue: number = 1;

// clicker counter display
const counter1Div = document.createElement("div");
counter1Div.textContent = `${counter1} pokes`;
app.append(counter1Div);

// growth rate display creation
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `${growthRate.toFixed(1)} pokes/sec`;
app.append(growthRateDiv);

// clicker button with emoji
const button1 = document.createElement("button");
button1.id = "button1";
button1.style.width = "256px";
button1.style.height = "256px";
button1.style.fontSize = "256px";
button1.style.display = "flex";
button1.style.alignItems = "center";
button1.style.justifyContent = "center";
button1.style.border = "none";
button1.style.backgroundColor = "transparent";
button1.style.cursor = "pointer";
button1.textContent = "😰";
app.append(button1);

// click event: button adds +1 to counter and change emojis
button1.addEventListener("click", () => {
    counter1 += clickValue; // Use the clickValue
    button1.textContent = "😫"; // change to second emoji
    updatePurchaseButtonState();
    counter1Div.textContent = `${Math.floor(counter1)} pokes`; // update display to show integer

    // revert emoji after 1 sec
    setTimeout(() => {
        button1.textContent = "😰";
    }, 500); // milliseconds (.5 secs)
});

// create and display upgrade buttons in a row
const upgradeContainer = document.createElement("div");
upgradeContainer.classList.add("upgrade-container");
app.append(upgradeContainer);

// create descr element
const descr = document.createElement("div");
descr.className = "descr";
descr.style.position = "absolute";
descr.style.display = "none";
descr.style.backgroundColor = "#333";
descr.style.color = "#fff";
descr.style.padding = "5px";
descr.style.borderRadius = "5px";
app.append(descr);

// Use availableItems to create upgrades
const upgrades = availableItems.map(item => ({
    ...item,
    count: 0,
    button: null as HTMLButtonElement | null
}));

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
    purchaseButton.textContent = `cost: ${upgrade.cost.toFixed(1)} pokes`;
    purchaseButton.disabled = true;
    purchaseButton.classList.add('disabled');

    upgrade.button = purchaseButton;

    // append elements in order
    upgradeBox.append(upgradeTitle, upgradeCount, purchaseButton);
    upgradeContainer.append(upgradeBox);

    // buy event
    purchaseButton.addEventListener("click", () => {
        if (counter1 >= upgrade.cost) {
            counter1 -= upgrade.cost; // deduct cost

            if (upgrade.name === "Midas Touch ⚖️") {
                clickValue *= 2; // double the click value
            } else {
                growthRate += upgrade.rate; // increase growth rate for other upgrades
            }
            upgrade.count++; // add to count for the respective upgrade

            // increase cost by factor of 1.15
            upgrade.cost = upgrade.cost * 1.15;

            // display update
            counter1Div.textContent = `${Math.floor(counter1)} pokes`;
            upgradeCount.textContent = `(${upgrade.count})`;
            growthRateDiv.textContent = `${growthRate.toFixed(1)} pokes/sec`;
            purchaseButton.textContent = `cost: ${upgrade.cost.toFixed(1)} pokes`; // update cost display

            updatePurchaseButtonState();
        }
    });

    // show descr on hover
    purchaseButton.addEventListener("mouseover", () => {
        descr.textContent = upgrade.description; // set descr text
        descr.style.display = "block"; // show descr
    });

    purchaseButton.addEventListener("mousemove", (e) => {
        descr.style.left = `${e.pageX + 10}px`; // position descr near mouse
        descr.style.top = `${e.pageY + 10}px`;
    });

    purchaseButton.addEventListener("mouseout", () => {
        descr.style.display = "none"; // hide descr
    });
});

// button state for upgrades to make sure you have enough pokes
const updatePurchaseButtonState = () => {
    upgrades.forEach((upgrade) => {
        if (upgrade.button) {
            if (counter1 >= upgrade.cost) {
                upgrade.button.disabled = false;
                upgrade.button.classList.remove('disabled');
                upgrade.button.classList.add('enabled');
            } else {
                upgrade.button.disabled = true;
                upgrade.button.classList.remove('enabled');
                upgrade.button.classList.add('disabled');
            }
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
        counter1Div.textContent = `${Math.floor(counter1)} pokes`; // displays as integer
    }
    lastTime = timestamp;

    requestAnimationFrame(updateCounter);
};

// starts animation loop
requestAnimationFrame(updateCounter);
