// Define your word options
const wordOptions = {
    "going": ["going", "go", "goes"],
    "buy": ["buy", "bye", "by"],
    "schoes": ["schoes", "schools", "echoes"]
};

// Initialize an empty string to store user corrections
let userCorrections = "";

// Function to wrap misspelled words in <span> elements
function highlightMisspelledWords() {
    const sentenceElement = document.getElementById("sentence");
    const sentence = sentenceElement.textContent;
    const words = sentence.split(/\b/); // Split by word boundaries
    const correctedWords = words.map(word => {
        const trimmedWord = word.replace(/[.,!?]/g, ''); // Remove punctuation
        const correctedWord = wordOptions[trimmedWord.toLowerCase()];
        if (correctedWord) {
            const punctuation = word.replace(/[A-Za-z]+/g, ''); // Extract punctuation
            return `<span class="red" data-word="${trimmedWord}">${correctedWord[0] + punctuation}</span>`;
        }
        return word;
    });
    sentenceElement.innerHTML = correctedWords.join("");
}

// Function to handle word correction
function handleWordCorrection(event) {
    const clickedWord = event.target.dataset.word;
    if (clickedWord) {
        const correctionOptions = wordOptions[clickedWord.toLowerCase()];
        if (correctionOptions) {
            const popupDiv = document.createElement("div");
            popupDiv.classList.add("popup");
            const optionsList = document.createElement("ul");

            correctionOptions.forEach(option => {
                if (option !== clickedWord) { // Exclude the original word
                    const listItem = document.createElement("li");
                    listItem.textContent = option;
                    listItem.addEventListener("click", () => {
                        const punctuation = clickedWord.replace(/[A-Za-z]+/g, ''); // Extract punctuation
                        const correctedWord = option + punctuation;
                        event.target.textContent = correctedWord;
                        event.target.classList.remove("red");
                        popupDiv.remove();

                        // Add the user's correction to the string
                        if (userCorrections === "") {
                            userCorrections = correctedWord;
                        } else {
                            userCorrections += "," + correctedWord;
                        }

                        // Update the content of the userCorrectionsDisplay div
                        const userCorrectionsDisplay = document.getElementById("userCorrectionsDisplay");
                        userCorrectionsDisplay.textContent = "User Corrections: " + userCorrections;
                    });
                    optionsList.appendChild(listItem);
                }
            });

            // Add the "Other" option with a text input field
            const otherOption = document.createElement("li");
            const inputField = document.createElement("input");
            inputField.setAttribute("placeholder", "Other");
            inputField.style.width = "50%";
            inputField.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    const customWord = inputField.value.trim();
                    if (customWord) {
                        const punctuation = clickedWord.replace(/[A-Za-z]+/g, ''); // Extract punctuation
                        const correctedWord = customWord + punctuation;
                        event.target.textContent = correctedWord;
                        event.target.classList.remove("red");
                        popupDiv.remove();

                        // Add the user's correction to the string
                        if (userCorrections === "") {
                            userCorrections = correctedWord;
                        } else {
                            userCorrections += "," + correctedWord;
                        }

                        // Update the content of the userCorrectionsDisplay div
                        const userCorrectionsDisplay = document.getElementById("userCorrectionsDisplay");
                        userCorrectionsDisplay.textContent = "User Corrections: " + userCorrections;
                    }
                }
            });
            otherOption.appendChild(inputField);

            // Add the "<ignore>" option as the last one
            const ignoreOption = document.createElement("li");
            ignoreOption.innerHTML = "//ignore//";
            ignoreOption.addEventListener("click", () => {
                event.target.classList.remove("red"); // Remove the "red" class
                popupDiv.remove();
            });
            optionsList.appendChild(otherOption);
            optionsList.appendChild(ignoreOption);

            popupDiv.appendChild(optionsList);
            document.body.appendChild(popupDiv);
        }
    }
}

// Call the highlight function on page load
highlightMisspelledWords();

// Attach click event listeners to misspelled words
const misspelledWords = document.querySelectorAll(".red");
misspelledWords.forEach(word => {
    word.addEventListener("click", handleWordCorrection);
});
