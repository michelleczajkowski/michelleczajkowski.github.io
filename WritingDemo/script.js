// Initialize tutA variable
let tutA = "";

// Declare sentenceElement as a global variable
let sentenceElement;

// Initialize userAnswers array to store user's answers
let userAnswers = [];

// Function to store corrected word in tutA
function storeCorrectedWord(originalWord, correctedWord) {
    if (tutA === "") {
        tutA = sentenceElement.textContent;
    }

    const updatedSentence = tutA.replace(originalWord, correctedWord);
    tutA = updatedSentence;
}

// Define your word options
const wordOptions = {
    // ... (Your word options remain unchanged) ...
};

let currentPopup = null; // Variable to keep track of the currently open pop-up

// Function to highlight misspelled words and show correction options
function highlightMisspelledWords() {
    sentenceElement = document.getElementById("sentence"); // Assign the global variable

    const misspelledWords = sentenceElement.querySelectorAll(".red");

    misspelledWords.forEach(word => {
        word.addEventListener("click", handleWordCorrection);
    });
}

// Function to handle word correction
function handleWordCorrection(event) {
    if (currentPopup) {
        currentPopup.remove(); // Close the current pop-up
    }

    const clickedWord = event.target;
    const originalWord = clickedWord.getAttribute("data-word");

    if (originalWord) {
        const correctionOptions = wordOptions[originalWord.toLowerCase()];
        if (correctionOptions) {
            // Calculate the position of the clicked word
            const rect = clickedWord.getBoundingClientRect();
            const wordTop = rect.top + window.scrollY;
            const wordLeft = rect.left + window.scrollX;

            const popupDiv = document.createElement("div");
            popupDiv.classList.add("popup");

            // Set the position of the pop-up box just below the word
            popupDiv.style.top = wordTop + rect.height + "px";
            popupDiv.style.left = wordLeft + "px";

            const optionsList = document.createElement("ul");

            correctionOptions.forEach(option => {
                if (option !== originalWord) { // Exclude the original word
                    const listItem = document.createElement("li");
                    listItem.textContent = option;
                    listItem.addEventListener("click", () => {
                        clickedWord.textContent = option;
                        clickedWord.classList.remove("red");
                        popupDiv.remove();

                        // Store the corrected word in tutA
                        storeCorrectedWord(originalWord, option);
                        userAnswers.push(option); // Store the user's answer
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
                        clickedWord.textContent = customWord;
                        clickedWord.classList.remove("red");
                        popupDiv.remove();

                        // Store the corrected word in tutA
                        storeCorrectedWord(originalWord, customWord);
                        userAnswers.push(customWord); // Store the user's answer
                    }
                }
            });
            otherOption.appendChild(inputField);

            // Add the "<ignore>" option as the last one
            const ignoreOption = document.createElement("li");
            ignoreOption.innerHTML = "(correct as is)";
            ignoreOption.addEventListener("click", () => {
                clickedWord.classList.remove("red"); // Remove the "red" class
                popupDiv.remove();

                // Store the original word in tutA
                storeCorrectedWord(originalWord, originalWord);
                userAnswers.push(originalWord); // Store the user's answer
            });
            optionsList.appendChild(otherOption);
            optionsList.appendChild(ignoreOption);

            popupDiv.appendChild(optionsList);
            document.body.appendChild(popupDiv);

            // Set the currentPopup variable to the new pop-up
            currentPopup = popupDiv;
        }
    }
}

// Call the highlight function on page load
highlightMisspelledWords();

// Function to handle the "Check" button click
function handleCheckButtonClick() {
    const correctSentenceElement = document.getElementById("correctSentence");

    // Replace the following line with the correct answer
    const correctAnswer = "Correct answer: I want to go to the shop to buy some shoes.";

    correctSentenceElement.innerHTML = correctAnswer;

    // Show the "Next" button
    const nextButton = document.getElementById("nextButton");
    nextButton.style.display = "block";

    // Optionally, you can perform additional actions with the user's answers here
    // For example, you can send the answers to a server or check them against a correct answer.
    console.log("User's answers:", userAnswers);
}

// Attach a click event listener to the "Check" button
const checkButton = document.getElementById("checkButton");
checkButton.addEventListener("click", handleCheckButtonClick);

// Function to handle the "Next" button click
function handleNextButtonClick() {
    // Redirect to the desired URL
    window.location.href = "spell_check_intro_2.html"; // Replace with your actual URL

    // Reset userAnswers array for the next text
    userAnswers = [];
}

// Attach a click event listener to the "Next" button
const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", handleNextButtonClick);
