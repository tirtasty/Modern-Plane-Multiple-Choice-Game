//GLOBAL VARIABLE
var startButton = document.getElementById("start-btn")
var questionContainerLine = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerElement = document.getElementById("answer-btn")
var checkScore = document.getElementById("highscore-view")
var countDown = document.getElementById("count-down")
var statusMessage = document.getElementById("status")
var finalScore = document.getElementById("finalScore")
var selectChoice = document.getElementById("btn-answer")
var resetBtn = document.getElementById("reset-btn")
var liveScore = document.getElementById("view-score")
var historyHigh = document.getElementById('historyScore')
var currentQuestion = 0;
var score = 0;
var secondsLeft = 30;

//EVENT LISTENER
startButton.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);


//START GAME FUNTION
function startGame(){
    //timer on when it starts
    setTime()
    //start button gone when player is playing
    startButton.classList.add('startButton')
    //live score is 
    liveScore.classList.remove('viewScore')
    //Dispaly the score when player play the game
    liveScore.innerText = 'Your Score  ' + score;
    //get extQuestion
    nextQuestion()
}
//RESET GAME FUNCTION
function resetGame(){
    var page = '.index.html'
    location.reload(page);
}

//TIMER FUNCTION
function setTime() {
    countDown.classList.remove('countDown')
    timeInterval = setInterval(function() {
        if (secondsLeft > 1) {
            countDown.textContent = secondsLeft + ' seconds';
            secondsLeft--;
          } else if (secondsLeft === 1) {
            countDown.textContent = secondsLeft + ' second';
            secondsLeft--;
          } else {
            countDown.textContent = '';
            questionContainerLine.textContent = '';
            clearInterval(timeInterval);
            displayMessage();
            //Highscore and reset button appear when the game is over
            resetBtn.classList.remove('reset-button')
            checkScore.classList.remove('highScore')
            //diplay message function
            function displayMessage() {
                var message = 'GAME OVER'
                questionContainerLine.textContent = message;
              }
            //Show score function
            showScore();
          }
        }, 1000);
  }

//NEXT QUESTION FUNCTION
function nextQuestion(){
    resetAnswer();
    questionContainerLine.classList.remove('question-hide')
    showQuestion(questions[currentQuestion])
}

//Show question on display
function showQuestion(question){
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('selectButton')
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
            score        }
        button.addEventListener('click', selectAnswer)
        answerElement.appendChild(button)
})
}

//REMOVE DEFAULT ANSWER BUTTON
function resetAnswer(){
    answerElement.classList.add('hide')
    while (answerElement.firstChild){
        answerElement.removeChild
        (answerElement.firstChild)
    }
}

//ANSWER FUNCTION
function selectAnswer(t){
    var selectButton = t.target
    var correct = selectButton.dataset.correct
    if (selectButton = correct){
        score++;
        liveScore.innerText = 'Your Score  ' + score;
        }else{
            secondsLeft -= 10
        }  
    if (currentQuestion < 3){
        currentQuestion++;
    }else{
        secondsLeft -= 30;
    }
    nextQuestion(questions[currentQuestion])
}

//Show Score Function When Game Over
function showScore() {
    liveScore.classList.add('viewScore')
    var name = prompt ("Enter your name")
    if (name == ""){
        name = "Anonymous"
    }
    var history = name + " : " + score
    //Set score to local storage
    localStorage.setItem("score", JSON.stringify(history));
    console.log(history)

    //Display Score
    finalScore.innerText = name + "'s score is " + score

    
}

//View Highscore History
checkScore.addEventListener('click', scoreHistory)

function scoreHistory(){
    questionContainerLine.classList.add('question-hide')
    historyHigh.classList.remove('historyScore')

    historyHigh.textContent = localStorage.getItem("score")

}

//Question array
var questions = [
    {
        question: 'Who is the manufacturer of Boeing 747?',
        answer: [
            {text: 'Airbus', wrong: false},
            {text: 'Boeing', correct: true},
            {text: 'Lockheed', wrong: false},
            {text: 'Bombardier', wrong: false}
        ],
        correct: 'Boeing'
    },
    {
        question: 'What is NOT one of the three aerodynamic forces?',
        answer: [
            {text: 'Pressure', correct: true},
            {text: 'Thrust', wrong: false},
            {text: 'Drag', wrong: false},
            {text: 'Lift', wrong: false}
        ],
        correct: 'Pressure'
    },
    {
        question: 'Who are the brothers that invented the airplanes?',
        answer: [
            {text: 'Bill and Hary Wright', wrong: false},
            {text: 'Milton and Kurtis Smith', wrong: false},
            {text: 'Orville and Wilbur Wright', correct: true},
            {text: 'Ben and Jerry Smith', wrong: false}
        ],
        correct: 'Orville and Wilbur Wright'
    },
    {
        question: 'Which part of the airplane provides thrust?',
        answer: [
            {text: 'Wings', wrong: false},
            {text: 'Rudder', wrong: false},
            {text: 'Flaps', wrong: false},
            {text: 'Propellers', correct: true}
        ],
        correct: 'propellers'
        
    }
]