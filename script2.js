let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
    {
        id: "0",
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: "JavaScript",
    },
    {
        id: "1",
        question: "What does CSS stand for?",
        options: ["Central Style Sheets","Cascading Style Sheets","Cascading Simple Sheets","Cascading Style script"],
        correct: "Cascading Style Sheets",
    },
    {
        id: "2",
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language","Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis"],
        correct: "Hypertext Markup Language",
    },
    {
        id: "3",
        question: "Which of the following keywords is used to define a variable in javascript?",
        options: ["var", "let", "var and let", "none of the above"],
        correct: "var and let",
    },
    {
        id: "4",
        question: "How many sizes of headers are available in HTML by default",
        options: ["5", "1", "3", "6"],
        correct: "6",
    },
    {
        id: "5",
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        options: ["Throws an error", "Ignores the statements", "Gives a warning", "none of the above"],
        correct: "Ignores the statements",
    }, {
        id: "6",
        question: "What are the attributes used to change the size of an image?",
        options: ["Width and Height", "Big and Small", "Top and Bottom", "None of the above"],
        correct: "Width and Height",
    },
    {
        id: "7",
        question: "Which CSS property allows you to set multiple list properties at once?",
        options: ["List-Style-Type", "List-Style", "List-Style-Position", "List-Style-Image"],
        correct: "List-Style",
    },
    {
        id: "8",
        question: "What keyword is used to check whether a given property is valid or not?",
        options: ["in", "is in", "exists", "lies"],
        correct: "in",
    },
    {
        id: "9",
        question: "The stylesheet file will not be loaded by the browser if you omit ______",
        options: ["REL", "STYLE", "BODY", "HTML"],
        correct: "REL",
    },
];
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};
function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};