const logoText = document.querySelector('#logo-text');
const playerInput = document.querySelector("#user-name");
const startButton = document.querySelector("#start-button");
const descriptionDisplay = document.querySelector('#description');
const categoryButton = document.querySelector('.categoryBtn-container');
const gameTimer = document.querySelector('#game-timer');
const gameQuestioner = document.querySelector('#questioner');
const gameChoices = document.querySelector('#game-choices');
const nextQuestionButton = document.querySelector('#next-question');
const resultElement = document.querySelector('#result');
const questionContainer = document.querySelector('.question-container');
const questionElement = document.querySelector('#question');
const choicesElement = document.querySelector('#choices');
const resultContainer = document.querySelector('.result-container');
const correctAnswerElement = document.querySelector('#correct-answer');

questionContainer.style.display = 'none';
gameTimer.style.display = 'none';
resultContainer.style.display = 'none';
categoryButton.style.display = 'none';

startButton.addEventListener('click', startGame);

let playerName;
let currentQuestion;
let choices;
let correctAnswer;
let isGameActive = false;

function startGame() {
    playerName = playerInput.value;
    if (playerName === '') {
        alert('Name required!');
        return;
    };

    logoText.style.display = 'none';
    playerInput.style.display = 'none';
    startButton.style.display = 'none';

    isGameActive = true;
    category();
}

function category() {
    categoryButton.style.display = '';
    descriptionDisplay.innerHTML = `Hi! ${playerName} Please Choose your Category:`;
    const easyButton = document.querySelector('#easy-button')



    easyButton.addEventListener('click', askQuestion);
}

// const mediumButton = document.querySelector('#medium-button')
// function handleButtonClick() {
// }

// mediumButton.addEventListener('click', handleButtonClick);

// const hardButton = document.querySelector('#hard-button')
// function handleButtonClick() {
//     console.log('Button clicked!');
// }
// hardButton.addEventListener('click', handleButtonClick);
// }





let timerCount = 15;
let timer;

const decrementTimer = () => {
    if (timerCount === 0) {
        clearInterval(timer);
    }

    gameTimer.textContent = timerCount;
    timerCount--;
};

timer = setInterval(decrementTimer, 1000);


function askQuestion() {
    categoryButton.style.display = 'none';
    descriptionDisplay.innerHTML = ``;
    fetch('https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple')
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Error fetching questions');
            }
        })
        .then((data) => {
            const questionData = data.results[0];
            currentQuestion = decodeHtmlEntities(questionData.question);
            correctAnswer = decodeHtmlEntities(questionData.correct_answer);
            choices = questionData.incorrect_answers.map(answer => decodeHtmlEntities(answer)).concat(correctAnswer);

            questionElement.textContent = currentQuestion;
            choicesElement.innerHTML = '';

            for (let i = 0; i < choices.length; i++) {
                const choice = choices[i];
                const listItem = document.createElement('li');
                const choiceButton = document.createElement('button');
                choiceButton.textContent = choice;
                choiceButton.addEventListener('click', selectChoice);
                choicesElement.appendChild(listItem);
                listItem.appendChild(choiceButton);
            }
            console.log('askQuestion')
            showQuestionContainer();
        })
        .catch((error) => {
            console.error(error);
        });
}

// Function to decode HTML entities
function decodeHtmlEntities(text) {
    const entityElement = document.createElement('textarea');
    entityElement.innerHTML = text;
    return entityElement.value;
}
function showQuestionContainer() {
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
}

function showResultContainer() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}

// Select choice function
function selectChoice() {
    const selectedChoice = this.textContent;
    checkAnswer(selectedChoice);
}

// Check answer and display the result
function checkAnswer(userAnswer) {
    const choiceButtons = choicesElement.getElementsByTagName('button');

    for (let i = 0; i < choiceButtons.length; i++) {
        // const choiceButton = choiceButtons[i];

    }

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        correctAnswerElement.textContent = `The correct answer is ${correctAnswer}.`;
    } else {
        resultElement.textContent = "Incorrect!";
        correctAnswerElement.textContent = `The correct answer is ${correctAnswer}.`;
    }

    showResultContainer();
}

// Next question button click handler
function nextQuestion() {
    askQuestion();
}

// Event listener
nextQuestionButton.addEventListener('click', nextQuestion);







// fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple')
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             console.log('error')
//         }
//     }).then((data) => {
//         const res = data.difficulty;
//     })
// fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple')
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             console.log('error')
//         }
//     }).then((data) => {
//         const res = data.difficulty;
//     })