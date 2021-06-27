let navBar = document.querySelector('nav');
let highscoresLink = document.getElementById('highscores-link');
let container = document.getElementById('container');
let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start-button');
let title = document.getElementById('title');
let text = document.getElementById('text');
let quizAnswers = document.getElementById('quiz-answers');
let answerButtons = document.getElementsByClassName('answer-button');
let answerMessage = document.getElementById('answer-message');
let inputField = document.getElementById('input-field');
let initials = document.getElementById('initials');
let submitButton = document.getElementById('submit-button');

//variables
let timerSecs = 0;
let currentQuestion = 0
let score = 0;
let scoreArray = [];
let timerInterval = false;

// start
function startQuiz() {
    // timer start at 75 seconds
    timerSecs = 50;
    timerDisplay.textContent = timerSecs;

    //countdown
    countdown();


    nextQuestion();

    //start button disappear
    startButton.style.display = 'none';
}

//next question
function nextQuestion() {

    container.className = 'results-page mt-5'
    title.textContent = questions[currentQuestion].title;
    title.setAttribute('class', 'h2')
    text.textContent = 'Select answer from the options listed below ';
    text.className = 'h4';
    text.setAttribute('style', 'border-top: 1px double #ba251a; padding-top: 20px;')


    quizAnswers.style.display = 'block';

    // assigns new question options
    answerButtons[0].textContent = questions[currentQuestion].choices[0];
    answerButtons[1].textContent = questions[currentQuestion].choices[1];
    answerButtons[2].textContent = questions[currentQuestion].choices[2];
    answerButtons[3].textContent = questions[currentQuestion].choices[3];

    // Clicking answer
    for (i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener('click', checkAnswer);
    }
}

// is answer correct?
function checkAnswer(event) {

    console.log('User chose: ' + event.target.textContent);
    console.log('Correct answer: ' + questions[currentQuestion].answer);

    // if correct displays correct and increases score
    if (event.target.textContent === questions[currentQuestion].answer) {
        answerMessage.style.display = 'block';
        answerMessage.textContent = 'Correct!';
        answerMessage.className = 'answer-message';
        currentQuestion++;
        score++;

        // after set time
        setTimeout(function () {
            answerMessage.style.display = 'none';
        }, 800);

        // end game after Q5
        if (currentQuestion === questions.length) {
            endGame();

            // otherwise go to next Q
        } else {
            nextQuestion();
        };

        // decrease time by 10 seconds
    } else {
        currentQuestion++;
        answerMessage.style.display = 'block';
        answerMessage.textContent = 'Incorrect!';
        answerMessage.className = 'answer-message';

        // incorrect disappears after the set time
        setTimeout(function () {
            answerMessage.style.display = 'none';
        }, 800);

        // the game ends if timer is less than 10 seconds
        if (timerSecs < 10) {
            timerSecs -= 10;
            endGame();

            // ends game after Q5
        } else if (currentQuestion === 5) {
            endGame();

            // or minus 10 secs from timer and go to the next question
        } else {
            timerSecs -= 10;
            nextQuestion();
        };
    }
};


function endGame() {
    quizAnswers.style.display = 'none';
    container.className = 'quiz-page mt-5'
    title.setAttribute('class', 'h2');
    text.setAttribute('style', 'border-top: 0');
    text.removeAttribute('class');
    text.textContent = 'Your final score is ' + score + '. Enter your initials to see the high scores!';
    inputField.style.display = 'block';

    if (timerSecs <= 0) {
        title.textContent = 'You ran out of time!';
    } else {
        title.textContent = 'All done!';
    }

    submitButton.addEventListener('click', storeHighScore);
}


function storeHighScore(event) {
    event.preventDefault();

    if (initials.value.length === 0) {
        return


    } else {
        newScore = {
            userName: initials.value.trim(),
            userScore: score
        };
        scoreArray.push(newScore);


        scoreArray.sort((a, b) => b.userScore - a.userScore);


        localStorage.setItem('score', JSON.stringify(scoreArray));


        seeHighScores();
    }
}

function loadHighScore() {

    storedScores = JSON.parse(localStorage.getItem('score'));

    if (storedScores !== null) {
        scoreArray = storedScores;

        return scoreArray;
    }


    if (timerInterval) {
        clearInterval(timerInterval);
    };

    container.className = 'score-page mt-5 card bg-light p-4';
    let ul = document.createElement('ul');
    let returnButton = document.createElement('button');
    let clearButton = document.createElement('button');
    returnButton.textContent = 'Go Back';
    clearButton.textContent = 'Clear High Scores';
    container.appendChild(ul);
    container.appendChild(returnButton);
    container.appendChild(clearButton);

    startButton.style.display = 'none';
    navBar.style.visibility = 'hidden';
    title.textContent = 'High Scores';
    text.textContent = '';
    text.setAttribute('style', 'border-top: 0');
    quizAnswers.style.display = 'none';
    inputField.style.display = 'none';


    for (i = 0; i < scoreArray.length; i++) {
        let score = scoreArray[i].userName + ' : ' + scoreArray[i].userScore;

        li = document.createElement('li');
        li.textContent = score;
        ul.appendChild(li);
    }


    returnButton.addEventListener('click', function () {
        location.href = 'index.html'
    });

    clearButton.addEventListener('click', function () {
        localStorage.clear();
        ul.innerHTML = '';
    });
};


function countdown() {

    timerInterval = setInterval(function () {
        timerSecs--;
        timerDisplay.textContent = timerSecs;

        if (timerSecs < 1) {
            timerDisplay.textContent = 0;
            endGame();
            clearInterval(timerInterval);
        };

        if (currentQuestion === 5) {
            timerDisplay.textContent = timerSecs;
            clearInterval(timerInterval);
        }
    }, 1000)
}

function handleFirstTab(e) {
    if (e.keyCode === 9) {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);

loadHighScore();

startButton.addEventListener('click', startQuiz);

highscoresLink.addEventListener('click', seeHighScores);
let questions = [{
    title: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts"
},
{
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
    answer: "3. parentheses"
},
{
    title: "What is the name of the statement that is used to exit or end a loop?",
    choices: ["1. falter statement", "2. conditional statement", "3. break statement", "4. close statement"],
    answer: "3. break statement"
},
{
    title: "What is the element called that is used to describe the set of variables, objects, and functions you explicitly have access to?",
    choices: ["1. scope", "2. restriction", "3. range", "4. output level"],
    answer: "1. scope"
},
{
    title: "What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
    choices: ["1. conditional loop", "2. for loop", "3. else loop", "4. while loop"],
    answer: "4. while loop"
}
]