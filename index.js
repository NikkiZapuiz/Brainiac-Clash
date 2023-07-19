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
const rankButton = document.getElementById('rank-button');
const leaderboard = document.querySelector('.leaderboard');
const scoreList = document.getElementById('score-list');
const exitButton = document.getElementById('exitButton');
const tryAgainButton = document.getElementById('tryAgainButton');


questionContainer.style.display = 'none';
gameTimer.style.display = 'none';
resultContainer.style.display = 'none';
categoryButton.style.display = 'none';
leaderboard.style.display = 'none';
rankButton.style.display = 'none';
exitButton.style.display = 'none';
tryAgainButton.style.display = 'none';

startButton.addEventListener('click', startGame);

let playerName;
let currentQuestion;
let choices;
let correctAnswer;
let isGameActive = false;
let questionsAnswered = 0;
let score = 0;
let doneQuestions = [];
let timer;
const gameTime = 10;
let currentCategory;

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
    // descriptionDisplay.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
    descriptionDisplay.style.fontSize = "large"
    descriptionDisplay.style.marginTop = "170px"
    const easyButton = document.querySelector('#easy-button');
    const mediumButton = document.querySelector('#medium-button');
    const hardButton = document.querySelector('#hard-button');
    easyButton.addEventListener('click', function () {
        currentCategory = 'easy';
        askQuestion();
    });
    mediumButton.addEventListener('click', function () {
        currentCategory = 'medium';
        mediumQuestion();
    });
    hardButton.addEventListener('click', function () {
        currentCategory = 'hard';
        hardQuestion();
    });
}

// EASY
function askQuestion() {
    categoryButton.style.display = 'none';
    descriptionDisplay.innerHTML = '';

    if (questionsAnswered >= 10) {
        endGame();
        return;
    }

    fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple')
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
            shuffleArray(choices);
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
            clearInterval(timer);
            startTimer();
        })
        .catch((error) => {
            console.error(error);
        });
}

// Medium
function mediumQuestion() {
    categoryButton.style.display = 'none';
    descriptionDisplay.innerHTML = '';

    if (questionsAnswered >= 10) {
        endGame();
        return;
    }

    fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple')
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
                mediumQuestion();
                return;
            }

            doneQuestions.push(currentQuestion);
            shuffleArray(choices);
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
            clearInterval(timer);
            startTimer();
        })
        .catch((error) => {
            console.error(error);
        });
}

// Hard
function hardQuestion() {
    categoryButton.style.display = 'none';
    descriptionDisplay.innerHTML = '';

    if (questionsAnswered >= 10) {
        endGame();
        return;
    }

    fetch('https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple')
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
                hardQuestion();
                return;
            }

            doneQuestions.push(currentQuestion);
            shuffleArray(choices);
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
            clearInterval(timer);
            startTimer();
        })
        .catch((error) => {
            console.error(error);
        });
}

function selectChoice() {
    const selectedChoice = this.textContent;
    checkAnswer(selectedChoice);
}

function startTimer() {
    let timeRemaining = gameTime;

    gameTimer.style.display = 'block';
    gameTimer.textContent = timeRemaining;

    timer = setInterval(function () {
        timeRemaining--;
        gameTimer.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            checkAnswer('');
        }
    }, 1000);
}

function checkAnswer(userAnswer) {
    clearInterval(timer);
    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        correctAnswerElement.textContent = `The correct answer is ${correctAnswer}.`;
        score += 100;
    } else {
        resultElement.textContent = "Incorrect!";
        correctAnswerElement.textContent = `The correct answer is ${correctAnswer}.`;
    }
    showResultContainer();
}

function showQuestionContainer() {
    questionContainer.style.display = 'block';
    resultContainer.style.display = 'none';
}

function showResultContainer() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    gameTimer.style.display = 'none';
    nextQuestionButton.disabled = false;
}

function endGame() {
    isGameActive = false;
    correctAnswerElement.textContent = '';

    const scoreElement = document.createElement('div');
    scoreElement.id = 'score';
    scoreElement.classList.add('score-container');
    scoreElement.innerHTML = `Congratulations, ${playerName}! Score: ${score} points`;
    descriptionDisplay.appendChild(scoreElement);

    rankButton.style.display = 'block';
    gameTimer.style.display = 'none';
    questionContainer.style.display = 'none';
    nextQuestionButton.style.display = 'none';
    resultContainer.style.display = 'none';

    const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];
    leaderboardData.push({ name: playerName, score });
    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
}

function showRank() {
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData'));
    if (leaderboardData && leaderboardData.length > 0) {
        leaderboard.style.display = 'block';
        rankButton.style.display = 'none';
        exitButton.style.display = '';
        tryAgainButton.style.display = '';

        
        const sortedLeaderboard = leaderboardData.sort((a, b) => b.score - a.score);

        scoreList.classList.add('no-bullets');

        scoreList.innerHTML = sortedLeaderboard.map((entry, index) =>
            `<li>${index + 1}. ${entry.name} - ${entry.score} points</li>`
        ).join('');
    } else {
        alert('No leaderboard data available.');
    }
    scoreElement.style.display = 'none';

}

rankButton.addEventListener('click', showRank);

exitButton.addEventListener('click', startGame);

tryAgainButton.addEventListener('click', category);

function decodeHtmlEntities(text) {
    const entityElement = document.createElement('textarea');
    entityElement.innerHTML = text;
    return entityElement.value;
}

nextQuestionButton.addEventListener('click', function () {
    nextQuestionButton.disabled = true;
    if (currentCategory === 'easy') {
        askQuestion();
    } else if (currentCategory === 'medium') {
        mediumQuestion();
    } else if (currentCategory === 'hard') {
        hardQuestion();
    }
});


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
