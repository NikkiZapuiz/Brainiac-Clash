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
let totalQuestions = 10;
let questionsAnswered = 0;
let score = 0;
let doneQuestions = [];

function startGame() {
    playerName = playerInput.value;
    if (playerName === '') {
        alert('Name required!');
        return;
    }

    logoText.style.display = 'none';
    playerInput.style.display = 'none';
    startButton.style.display = 'none';

    isGameActive = true;
    category();
}

function category() {
    categoryButton.style.display = '';
    descriptionDisplay.innerHTML = `Hi, ${playerName}! Please choose your category:`;
    const easyButton = document.querySelector('#easy-button');
    easyButton.addEventListener('click', askQuestion);
}

function askQuestion() {
    categoryButton.style.display = 'none';
    descriptionDisplay.innerHTML = '';

    if (questionsAnswered >= 10) {
        endGame();
        return;
    }

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
            choices = questionData.incorrect_answers
                .map(answer => decodeHtmlEntities(answer))
                .concat(correctAnswer);

            if (doneQuestions.includes(currentQuestion)) {
                askQuestion();
                return;
            }

            doneQuestions.push(currentQuestion);

            questionElement.textContent = currentQuestion;
            choicesElement.innerHTML = '';

            for (let i = 0; i < choices.length; i++) {
                const choice = choices[i];
                const listItem = document.createElement('li');
                const choiceButton = document.createElement('button');
                choiceButton.textContent = choice;
                choiceButton.addEventListener('click', selectChoice);
                listItem.appendChild(choiceButton);
                choicesElement.appendChild(listItem);
            }

            showQuestionContainer();
            questionsAnswered++;
        })
        .catch((error) => {
            console.error(error);
        });
}


function selectChoice() {
    const selectedChoice = this.textContent;
    checkAnswer(selectedChoice);
}

function checkAnswer(userAnswer) {
    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        correctAnswerElement.textContent = `The correct answer is ${correctAnswer}.`;
        score++;
    } else {
        resultElement.textContent = "Incorrect!";
        correctAnswerElement.textContent = `The correct answer is ${correctAnswer}.`;
    }

    nextQuestionButton.disabled = true;
    showResultContainer();
}

function showQuestionContainer() {
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
}

function showResultContainer() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}

function endGame() {
    isGameActive = false;
    nextQuestionButton.removeEventListener('click', askQuestion);
    resultElement.textContent = `You answered all the questions!`;
    correctAnswerElement.textContent = '';

    const scoreElement = document.createElement('div');
    scoreElement.id = 'score';
    scoreElement.classList.add('score-container');
    scoreElement.innerHTML = `Congratulations, ${playerName}! Score: ${score} / ${totalQuestions}`;
    descriptionDisplay.appendChild(scoreElement);

    gameTimer.style.display = 'none';
    questionContainer.style.display = 'none';
    nextQuestionButton.style.display = 'none';
}


// Function to decode HTML entities
function decodeHtmlEntities(text) {
    const entityElement = document.createElement('textarea');
    entityElement.innerHTML = text;
    return entityElement.value;
}

// Event listener
nextQuestionButton.addEventListener('click', askQuestion);

