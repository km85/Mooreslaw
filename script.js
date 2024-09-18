let n1 = 2; // Initial number
let currentNumber;
let questionNumber = 1;
let score = 0;
let timeLeft = 5;
let timerInterval;
let questions = []; // Array to store question data

// Function to show a specific screen and hide others
function showScreen(screenId) {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';

    document.getElementById(screenId).style.display = 'block';
}

// Function to start the game
function startGame() {
    currentNumber = n1;
    score = 0;
    questionNumber = 1;
    timeLeft = 5;
    questions = []; // Reset the questions array
    document.getElementById('current-score').innerText = score;
    showScreen('game-screen');
    nextQuestion();
}

// Function to display the next question
function nextQuestion() {
    document.getElementById('answer').value = '';
    document.getElementById('answer').focus(); // Focus on the input field
    document.getElementById('question').innerText = `Year ${questionNumber}: ${currentNumber} x 2 = ?`;
    timeLeft = 5;
    document.getElementById('time-left').innerText = timeLeft;
    clearInterval(timerInterval);
    timerInterval = setInterval(countdown, 1000);
}

// Timer countdown function
function countdown() {
    timeLeft--;
    document.getElementById('time-left').innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        recordAnswer("", false, 0); // Record unanswered question
        gameOver("Time's up!");
    }
}

// Function to check the user's answer
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = currentNumber * 2;
    const timeTaken = 5 - timeLeft; // Calculate time taken

    if (isNaN(userAnswer)) {
        alert("Please enter a valid number.");
        return;
    }

    clearInterval(timerInterval);

    let correct = false;
    let points = 0;

    if (userAnswer === correctAnswer) {
        correct = true;
        // Assign points based on time taken
        if (timeTaken <= 3) {
            points = 2;
        } else {
            points = 1;
        }
        score += points;
        document.getElementById('current-score').innerText = score;
        currentNumber = correctAnswer;
        recordAnswer(userAnswer, correct, points, timeTaken); // Record correct answer
        questionNumber++;
        nextQuestion();
    } else {
        recordAnswer(userAnswer, false, 0, timeTaken); // Record incorrect answer
        gameOver("Incorrect answer!");
    }
}

// Function to record each question's data
function recordAnswer(userAnswer, correct, points, timeTaken = 5 - timeLeft) {
    questions.push({
        questionNumber: questionNumber,
        questionText: `Year ${questionNumber}: ${currentNumber} x 2 = ?`,
        correctAnswer: currentNumber * 2,
        userAnswer: userAnswer,
        correct: correct,
        pointsAwarded: points,
        timeTaken: timeTaken.toFixed(1)
    });
}

// Function to handle game over
function gameOver(message) {
    alert(message);
    document.getElementById('final-score').innerText = score;
    displayResults(); // Display all answers and scores
    showScreen('game-over');
}

// Function to display all answers and scores
function displayResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h3>Question Details:</h3>';
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Year</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
            <th>Time Taken (s)</th>
            <th>Points</th>
        </tr>
    `;
    questions.forEach(q => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${q.questionNumber}</td>
            <td>${q.questionText}</td>
            <td>${q.userAnswer !== "" ? q.userAnswer : "No Answer"}</td>
            <td>${q.correctAnswer}</td>
            <td>${q.correct ? "Correct" : "Incorrect"}</td>
            <td>${q.timeTaken}</td>
            <td>${q.pointsAwarded}</td>
        `;
        table.appendChild(row);
    });
    resultsDiv.appendChild(table);
}

// Event listeners
document.getElementById('submit-btn').addEventListener('click', checkAnswer);
document.getElementById('restart-btn').addEventListener('click', function() {
    showScreen('home-screen');
});
document.getElementById('start-btn').addEventListener('click', startGame);

// Add event listener for Enter key
document.getElementById('answer').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Start by showing the home screen
window.onload = function() {
    showScreen('home-screen');
};
function showScreen(screenId) {
    const screens = ['home-screen', 'game-screen', 'game-over'];
    screens.forEach(id => {
        const element = document.getElementById(id);
        if (id === screenId) {
            element.style.display = 'block';
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
            setTimeout(() => {
                element.style.display = 'none';
            }, 500); // Match the transition duration
        }
    });
}
let highScore = 0;

// Update gameOver() function
function gameOver(message) {
    alert(message);
    if (score > highScore) {
        highScore = score;
        alert('New High Score!');
    }
    document.getElementById('final-score').innerText = score;
    displayResults();
    showScreen('game-over');
}

// Display high score on the home screen
window.onload = function() {
    showScreen('home-screen');
    if (highScore > 0) {
        const highScoreElement = document.createElement('p');
        highScoreElement.innerText = `High Score: ${highScore}`;
        document.getElementById('home-screen').appendChild(highScoreElement);
    }
};
