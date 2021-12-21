//GOLBAL VARIABLE
var startButton = document.getElementById("start-btn")
var questionContainerLine = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerElement = document.getElementById("answer-btn")
let shuffleQuestion, currentQuestion


//EVENT LISTENER
startButton.addEventListener('click', startGame)

function startGame(){
    questionContainerLine.classList.remove('question-hide')
    shuffleQuestion = questions.sort(() => Math.random() - .5)
    currentQuestion = 0;

    //get random question from function nextQuestion
    nextQuestion()
}

function nextQuestion(){
    showQuestion(shuffleQuestion[currentQuestion])
    
}

function selectAnswer(){

}

//Question array
var questions = [
    {
        question: 'Who is the manufacturer of Boeing 747?',
        answer: [
            {text: 'Airbus', correct: false},
            {text: 'Lockheed', correct: false},
            {text: 'Boeing', correct: true},
            {text: 'Bombardier', correct: false}
        ]
    },
    {
        question: 'what is 1 + 1?',
        answer: [
            {text: '2', correct: true},
            {text: '3', correct: false},
            {text: '4', correct: false},
            {text: '5', correct: false}
        ]
    },
    {
        question: 'Who is the prime minister of NSW?',
        answer: [
            {text: 'Morison', correct: false},
            {text: 'Andrew', correct: false},
            {text: 'Dominic', correct: true},
            {text: 'Gladys', correct: false}
        ]
    },
    {
        question: 'Who fly the airplane?',
        answer: [
            {text: 'Conductor', correct: false},
            {text: 'Driver', correct: false},
            {text: 'Pilot', correct: true},
            {text: 'Rider', correct: false}
        ]
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
})
}