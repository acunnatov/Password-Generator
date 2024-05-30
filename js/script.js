const passwordText = document.querySelector('.display > p');
const passwordLength = document.querySelector("#password-length");
const generateBtn = document.querySelector('.generate-btn');
const elements = document.querySelectorAll(".properties ul li input");

const CHAR_SETS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()?/|\\+_-'
};

const check = {
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false
};

document.addEventListener('DOMContentLoaded', () => {
    elements.forEach(item => check[item.id] = item.checked);
});

passwordLength.addEventListener('input', (event) => {
    document.querySelector(".password > p").textContent = event.target.value;
});

document.querySelector(".display svg").addEventListener("click", () => {
    navigator.clipboard.writeText(passwordText.textContent);
});

elements.forEach(item => {
    item.addEventListener("input", () => {
        check[item.id] = item.checked;
    });
});

generateBtn.addEventListener('click', () => {
    const characters = checkScanner();
    generatePassword(characters);
});

function generatePassword(characters) {
    let result = '';
    const length = passwordLength.value;
    if (characters.length > 0) {
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        passwordText.textContent = result;
    } else {
        console.log("Error: No character sets selected");
    }
}

function checkScanner() {
    return Object.keys(check).reduce((acc, key) => {
        return check[key] ? acc + CHAR_SETS[key] : acc;
    }, '');
}
