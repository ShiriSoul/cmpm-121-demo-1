import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Poke Me";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Init counter
let counter1: number = 0;
let growthRate: number = 0;

// Clicker counter display
const counter1Div = document.createElement("div");
counter1Div.textContent = `${counter1} pokes`;
app.append(counter1Div);

// Growth rate display creation
const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `${growthRate.toFixed(1)} pokes/sec`;
app.append(growthRateDiv);

// Clicker button with emoji
const button1 = document.createElement("button");
button1.id = "button1";

// Create a span for the emoji
const emojiDisplay = document.createElement("span");
emojiDisplay.textContent = "😰"; // Starting emoji
emojiDisplay.style.fontSize = "500px"; // Set size to 500px
button1.appendChild(emojiDisplay);
app.append(button1);

// Click event: button adds +1 to counter and change emoji
button1.addEventListener("click", () => {
    counter1++;
    emojiDisplay.textContent = "😫"; // Change to second emoji
    updatePurchaseButtonState();
    counter1Div.textContent = `${counter1} pokes`;

    // Revert emoji after 1 sec
    setTimeout(() => {
        emojiDisplay.textContent = "😰"; // Revert back to the first emoji
    }, 1000);
});

// Upgrade item data
const upgrades = [
    { name: "Faster Pokes", cost: 10, rate: 0.1, count: 0, button: null as HTMLButtonElement | null },
    { name: "Strong Touch", cost: 100, rate: 2.0, count: 0, button: null as HTMLButtonElement | null },
    { name: "Perfect Pokes", cost: 1000, rate: 50.0, count: 0, button: null as HTMLButtonElement | null }
];

// Create and display upgrade buttons in a row
const upgradeContainer = document.createElement("div");
upgradeContainer.classList.add("upgrade-container");
app.append(upgradeContainer);

upgrades.forEach((upgrade) => {
    const upgradeBox = document.createElement("div");
    upgradeBox.classList.add("upgrade-box");

    // Upgrade name
    const upgradeTitle = document.createElement("div");
    upgradeTitle.classList.add("upgrade-title");
    upgradeTitle.textContent = upgrade.name;

    // Upgrade count display
    const upgradeCount = document.createElement("div");
    upgradeCount.classList.add("upgrade-count");
    upgradeCount.textContent = `(${upgrade.count})`;

    // Upgrade purchase button
    const purchaseButton = document.createElement("button");
    purchaseButton.textContent = `Buy (cost: ${upgrade.cost.toFixed(1)} pokes)`;
    purchaseButton.disabled = true;
    purchaseButton.classList.add('disabled');

    upgrade.button = purchaseButton;

    // Append elements in order
    upgradeBox.append(upgradeTitle, upgradeCount, purchaseButton);
    upgradeContainer.append(upgradeBox);

    // Buy event
    purchaseButton.addEventListener("click", () => {
        if (counter1 >= upgrade.cost) {
            counter1 -= upgrade.cost; // Deduct cost
            growthRate += upgrade.rate; // Increase growth rate
            upgrade.count++; // Add to count for the respective upgrade

            // Increase cost by factor of 1.15 after purchase
            upgrade.cost = upgrade.cost * 1.15;

            // Display update
            counter1Div.textContent = `${counter1} pokes`;
            upgradeCount.textContent = `(${upgrade.count})`;
            growthRateDiv.textContent = `Growth rate: ${growthRate.toFixed(1)} pokes/sec`;
            purchaseButton.textContent = `Buy (cost: ${upgrade.cost.toFixed(1)} pokes)`; // Update cost display

            updatePurchaseButtonState();
        }
    });
});

// Button state for upgrades to make sure you have enough 'pokes'
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

// Variable for requestAnimationFrame
let lastTime: number = 0;

// Animation loop using requestAnimationFrame
const updateCounter = (timestamp: number) => {
    if (lastTime) {
        const elapsed = (timestamp - lastTime) / 1000;
        counter1 += elapsed * growthRate; // Increments counter based on growth rate
        counter1Div.textContent = `${Math.floor(counter1)} pokes`; // Display as integer
    }
    lastTime = timestamp;

    requestAnimationFrame(updateCounter);
};

// Starts animation loop
requestAnimationFrame(updateCounter);
