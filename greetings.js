// Array of greetings
const greetingsArray = [
    "Hello!",
    "Hi there!",
    "Ciao!",
    "Konnichiwa",
    "Aloha!",
    "Hey!",
    "Good day!",
    "Howdy!",
    "Whattap dawg?",
    "Bonjour!",
    "Hola!",
    "Mabuhay!"
];

// Function to get a random greeting
const getRandomGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetingsArray.length);
    return greetingsArray[randomIndex];
};

// Exports the function
module.exports = getRandomGreeting;