//GOLBAL VARIABLE
var startButton = document.getElementById("start-btn")
var questionContainerLine = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerElement = document.getElementById("answer-btn")
var countDown = document.getElementById("count-down")
var statusMessage = document.getElementById("status")
var selectChoice = document.getElementById("btn-answer")
var resetBtn = document.getElementById("reset-btn")
var message = 'GAME OVER'
var timeInterval
let shuffleQuestion, currentQuestion


//EVENT LISTENER
startButton.addEventListener('click', startGame)
resetBtn.addEventListener('click', resetGame)

//START GAME FUNTION
function startGame(){
    setTime()
    startButton.disabled = true;
    resetBtn.classList.remove('reset-button')
    //get random question from function nextQuestion
    nextQuestion()
}
//RESET GAME FUNCTION
function resetGame(){
    countDown.textContent = '';
    questionContainerLine.textContent = '';
    clearInterval(timeInterval);
    
    startGame()
}



//TIMER FUNCTION
function setTime() {
    var secondsLeft = 60;
    timeInterval = setInterval(function() {
        if (secondsLeft > 1) {
            countDown.textContent = secondsLeft + ' seconds remaining';
            secondsLeft--;
          } else if (secondsLeft === 1) {
            countDown.textContent = secondsLeft + ' second remaining';
            secondsLeft--;
          } else {
            countDown.textContent = '';
            questionContainerLine.textContent = '';
            clearInterval(timeInterval);
            displayMessage();
            startButton.disabled = false;
          }
        }, 1000);
  }
  function displayMessage() {
    questionContainerLine.textContent = message;
  }

//NEXT QUESTION FUNCTION
function nextQuestion(){
    resetAnswer()
    shuffleQuestion = questions.sort(() => Math.random() - 0.5)
    currentQuestion = 0;
    questionContainerLine.classList.remove('question-hide')
    showQuestion(shuffleQuestion[currentQuestion])
    
}
//ANSWER FUNCTION
function selectAnswer(t){
    var selectButton = t.target
    var correct = selectButton.dataset.correct
    statusCorrect(document.body, correct)
    Array.from(answerElement.children).forEach(button => {
        statusCorrect(button, button.dataset.correct)
    })
}
//STATUS CORRECT
function statusCorrect(element, correct){
    ClearStatus(element)
        if(correct){
            element.classList.add('correct')
        }else{
            element.classList.add('wrong')
        }
    }
function ClearStatus(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
//Show question on display
function showQuestion(question){
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerElement.appendChild(button)
        console.log(button)
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