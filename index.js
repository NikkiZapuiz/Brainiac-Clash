const start = document.querySelector('#start-game');
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
const leaderboard = document.querySelector('.leaderboard');
const exitButton = document.getElementById('exitButton');
const tryAgainButton = document.getElementById('tryAgainButton');
const scoreDisplay = document.getElementById('score-display');
const Message = document.getElementById('Congrats');
const scoreListElement = document.getElementById('score-list');

questionContainer.style.display = 'none';
gameTimer.style.display = 'none';
resultContainer.style.display = 'none';
categoryButton.style.display = 'none';
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
const gameTime = 15;
let currentCategory;
let startTime;

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
    startTime = Date.now();
}

function category() {
    resetScore();
    Message.style.display = 'none';
    categoryButton.style.display = '';
    descriptionDisplay.innerHTML = `Hi, ${playerName}! Please choose your category:`;
    descriptionDisplay.style.fontSize = "large";
}

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

    if (!timerAudio?.paused) {
        stopTimerSound();
    }

    gameTimer.style.display = 'block';
    gameTimer.textContent = timeRemaining;

    timer = setInterval(function () {
        timeRemaining--;
        gameTimer.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            stopTimerSound(); 
            checkAnswer('');
        }
    }, 1000);

    playTimerSound();
}

function checkAnswer(userAnswer) {
    clearInterval(timer);
    stopTimerSound(); 

    const timeElapsed = gameTime - parseInt(gameTimer.textContent);

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        correctAnswerElement.textContent = `The correct answer is ${correctAnswer}.`;
        if (timeElapsed <= 3) {
            score += 150; 
        } else if (timeElapsed <= 5) {
            score += 120; 
        } else if (timeElapsed <= 8) {
            score += 110; 
        } else if (timeElapsed <= 10) {
            score += 100;
        } else if (timeElapsed <= 12) {
            score += 50;
        } else {
            score += 20;
        }
        playCorrectSound();
    } else {
        resultElement.textContent = "Incorrect!";
        correctAnswerElement.textContent = `The correct answer is ${correctAnswer}.`;
        playWrongSound();
    }
    updateScoreDisplay();
    showResultContainer();
    updateLeaderboard();
    addToLeaderboard();
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

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function resetScore() {
    score = 0;
    updateScoreDisplay();
}


function updateColors() {
    const rows = scoreListElement.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        row.classList.remove('top-player');
        row.classList.remove('current-player');

        if (i === 0) {
            row.classList.add('top-player');
        }
        if (row.cells[1].textContent === playerName) {
            row.classList.add('current-player');
        }
    }
}


function addToLeaderboard() {
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData')) || [];
    const playerIndex = leaderboardData.findIndex(entry => entry.name === playerName);

    if (playerIndex !== -1) {
        leaderboardData[playerIndex].score = score;
    } else {
        leaderboardData.push({ name: playerName, score });
    }

    leaderboardData.sort((a, b) => b.score - a.score);

    const topEntries = leaderboardData.slice(0, 10);

    localStorage.setItem('leaderboardData', JSON.stringify(topEntries));

    updateLeaderboard();
}


function endGame() {
    isGameActive = false;
    correctAnswerElement.textContent = '';
    const scoreElement = document.createElement('div');
    scoreElement.id = 'score';
    scoreElement.classList.add('score-container');
    gameTimer.style.display = 'none';
    questionContainer.style.display = 'none';
    nextQuestionButton.style.display = 'none';
    resultContainer.style.display = 'none';
    exitButton.style.display = '';
    tryAgainButton.style.display = '';
    Message.style.display = '';
    Message.innerHTML = `Congratulations, ${playerName}! Score: ${score} points`;
    updateColors();

}

let previousTopPlayer = '';

function updateLeaderboard() {
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboardData'));
    if (leaderboardData && leaderboardData.length > 0) {
        const sortedLeaderboard = leaderboardData.sort((a, b) => b.score - a.score);
        scoreListElement.innerHTML = '';
        const topEntries = sortedLeaderboard.slice(0, 10);
        for (let i = 0; i < topEntries.length; i++) {
            const entry = topEntries[i];
            const row = document.createElement('tr');
            row.innerHTML = `<td>${i + 1}</td><td>${entry.name}</td><td>${entry.score} points</td>`;

            if (i === 0) {
                row.classList.add('top-player');
            }
            if (entry.name === playerName) {
                row.classList.add('current-player');
            }
            scoreListElement.appendChild(row);
        }

        updateColors();
    } else {
        alert('No leaderboard data available.');
    }
}

updateLeaderboard();


function showCategorySelection() {
    isGameActive = true;
    descriptionDisplay.innerHTML = 'Please choose your Category';
    exitButton.style.display = 'none';
    tryAgainButton.style.display = 'none';
    categoryButton.style.display = '';
    category();
    currentQuestion = '';
    choices = [];
    correctAnswer = '';
    questionsAnswered = 0;
    doneQuestions = [];
    clearInterval(timer);
    nextQuestionButton.style.display = '';
}

tryAgainButton.addEventListener('click', showCategorySelection);

function showExitButton() {
    descriptionDisplay.innerHTML = '';
    exitButton.style.display = 'none';
    tryAgainButton.style.display = 'none';
    logoText.style.display = '';
    playerInput.style.display = '';
    startButton.style.display = '';
    categoryButton.style.display = 'none';
    isGameActive = false;
    Message.innerHTML = 'Click Start to Play';
    playerName = '';
    currentQuestion = '';
    choices = [];
    correctAnswer = '';
    questionsAnswered = 0;
    doneQuestions = [];
    clearInterval(timer);
    nextQuestionButton.style.display = '';
}

exitButton.addEventListener('click', showExitButton);

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

const toggleMusicButton = document.querySelector('#toggle-music');
const musicIcon = document.querySelector('#music-icon');
let isMusicPlaying = false;
let audio;
let volume = 0.4;
let wrongAudio;
let correctAudio;
let timerAudio;

const volumeSlider = document.getElementById('volume-slider');
volumeSlider.style.display = 'none';

function playMusic() {
    audio = new Audio('./come-on-boy-8018.mp3');
    audio.volume = volume;
    audio.play();
    isMusicPlaying = true;
    volumeSlider.style.display = '';
}

function stopMusic() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    isMusicPlaying = false;
    volumeSlider.style.display = 'none';
}

function toggleMusic() {
    if (isMusicPlaying) {
        stopMusic();
    } else {
        playMusic();
    }
}

function adjustVolume() {
    volume = parseFloat(document.getElementById('volume-slider').value);
    if (audio) {
        audio.volume = volume;
    }
}

function playSoundEffect(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
}

function playWrongSound() {
    if (!wrongAudio) {
        wrongAudio = document.getElementById('wrong-audio');
    }
    playSoundEffect(wrongAudio);
}

function playCorrectSound() {
    if (!correctAudio) {
        correctAudio = document.getElementById('correct-audio');
    }
    playSoundEffect(correctAudio);
}

function playTimerSound() {
    if (!timerAudio) {
        timerAudio = document.getElementById('timer-audio');
    }
    playSoundEffect(timerAudio);
}

function stopTimerSound() {
    if (timerAudio) {
        timerAudio.pause();
        timerAudio.currentTime = 0;
    }
}


