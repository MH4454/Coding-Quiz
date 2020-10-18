//sounds
let clickNice = new Audio("assets/sfx/-click-nice_2.wav");
let trumpWrong = new Audio("assets/sfx/donald-trump-wrong-sound-effect.wav");
let yodaVoice = new Audio("assets/sfx/goodjob-you-did.wav");
let myMan = new Audio("assets/sfx/my-man.wav");
let owenWow = new Audio("assets/sfx/wow1.wav");
let otherWow = new Audio("assets/sfx/wow2.wav");
let yas = new Audio("assets/sfx/yas.wav");
let incoBuzz = new Audio("assets/sfx/incorrect.wav");
let incoBuzz2 = new Audio("assets/sfx/incorrect2.wav");

let sfxRight = [clickNice, yodaVoice, myMan, owenWow, otherWow, yas]
let sfxWrong = [trumpWrong, incoBuzz, incoBuzz2]




const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const nextQ = document.querySelector('#progressText');
const timerEl = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let time = 140
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        choice1: 'quotes',
        choice2: 'curly brackets',
        choice3: 'parentheses',
        choice4: 'square brackets',
        answer: 3,
    },
    {
        question:
            "Which of the following is a JavaScript data type?",
        choice1: "null",
        choice2: "undefined",
        choice3: "object",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "Which of the following is not JavaScript Data Types?",
        choice1: "Undefined",
        choice2: "Number",
        choice3: "Boolean",
        choice4: "Float",
        answer: 4,
    },
    {
        question: "Which company developed JavaScript?",
        choice1: "Netscape",
        choice2: "Bell Labs",
        choice3: "Sun Microsystems",
        choice4: "IBM",
        answer: 1,
    },
    {
        question: "Which built-in method sorts the elements of an array?",
        choice1: "changeOrder",
        choice2: "order",
        choice3: "Sort",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "Which is used for JavaScript?",
        choice1: "<script>",
        choice2: "<head>",
        choice3: "<meta>",
        choice4: "<style>",
        answer: 1,
    },
    {
        question: "Which of the following is correct about features of JavaScript?",
        choice1: "It can not Handling dates and time",
        choice2: "JavaScript is a object-based scripting language.",
        choice3: "JavaScript is not interpreter based scripting language.",
        choice4: "All of the above",
        answer: 2,
    }
]
const MAX_QUESTIONS = 7

startGame = () => {
    questionCounter = 0
    time = 140
    timerId = setInterval(TimerRule, 1000);
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('recentScore', JSON.stringify(time))

        return window.location.assign('end.html')
    }

    questionCounter++
    nextQ.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
function timeLoss(){
    time -= 30
}
function TimerRule() {
    time--;
    timerEl.textContent = time;
  
    if (time <= 0) {
        localStorage.setItem('recentScore', JSON.stringify(time))
        return window.location.assign('end.html');
    }
  }
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            let randomSfxRight = sfxRight[Math.floor(Math.random() * sfxRight.length)]
            randomSfxRight.play();
        } else {
            let randomSfxWrong = sfxWrong[Math.floor(Math.random() * sfxWrong.length)]
            randomSfxWrong.play();
            timeLoss()
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})


startGame()

