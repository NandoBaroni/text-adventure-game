// Import 'prompt-sync' for user input in Node.js
const prompt = require('prompt-sync')();

// Define the player's state
let playerState = {
    currentRoom: "forest",
    inventory: [],
    isAlive: true,
    hasWon: false
};

// Function to display the current room's description and options
function displayRoom() {
    if (playerState.currentRoom === "forest") {
        console.log("You are in a dense forest. There are trees all around and a path leading to the north and south.");
        console.log("1. Go North (towards the cave)");
        console.log("2. Go South (towards the castle)");
    } else if (playerState.currentRoom === "cave") {
        console.log("You are inside a dark cave. There is a shiny object on the ground and a narrow passage leading back south.");
        console.log("1. Pick up the shiny object (a key)");
        console.log("2. Go South (back to the forest)");
    } else if (playerState.currentRoom === "castle") {
        console.log("You have arrived at the gates of an ancient castle. The door is locked. There is a path going north.");
        console.log("1. Try to open the door.");
        console.log("2. Go North (back to the forest)");
    }
}

// Function to handle player choices in each room
function handleChoice(choice) {
    if (playerState.currentRoom === "forest") {
        if (choice === "1") {
            playerState.currentRoom = "cave";
        } else if (choice === "2") {
            playerState.currentRoom = "castle";
        }
    } else if (playerState.currentRoom === "cave") {
        if (choice === "1") {
            if (!playerState.inventory.includes("key")) {
                console.log("You pick up a shiny key.");
                playerState.inventory.push("key");
            } else {
                console.log("You already picked up the key.");
            }
        } else if (choice === "2") {
            playerState.currentRoom = "forest";
        }
    } else if (playerState.currentRoom === "castle") {
        if (choice === "1") {
            if (playerState.inventory.includes("key")) {
                console.log("You use the key to unlock the door and win the game!");
                playerState.hasWon = true;
            } else {
                console.log("The door is locked. You need a key to open it.");
            }
        } else if (choice === "2") {
            playerState.currentRoom = "forest";
        }
    }
}

// Main game loop
function gameLoop() {
    while (playerState.isAlive && !playerState.hasWon) {
        displayRoom();
        const choice = prompt("What do you want to do? ");
        handleChoice(choice);

        if (playerState.hasWon) {
            console.log("Congratulations! You've won the game.");
        }
    }
}

// Start the game
console.log("Welcome to the Adventure Game!");
gameLoop();
