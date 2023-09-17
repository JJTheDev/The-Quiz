// Define your questions and answers as an array of objects
const questions = [
   {
      question: "What is JavaScipt?",
      choices: ["A Programming language", "A movie", "Type of food","A function"],
      correctAnswer: "A Programming language"
   },

   {
       question: "What is a Function?",
       choices: ["its an attribute used in HTML", "Mix martial art", "a function is a block of reusable code that performs a specific task or a set of tasks","All of the Above"],
       correctAnswer: "a function is a block of reusable code that performs a specific task or a set of tasks"
    },

    {
       question: "What is a \"const\" Variable?",
       choices: ["it means constipation", "it is used in global scope", "its used in local scope","A value that cannot be changed later"],
       correctAnswer: "A value that cannot be changed later"
    },

    {
       question: "What is example of camalCase?",
       choices: ["myClass", "FUNCTION", "ArRay","HtmL"],
       correctAnswer: "myClass"
    }
   // Add more questions here
];

// Variables to track quiz state
let currentQuestionIndex = 0;
let timeLeft = 60; // You can set the desired quiz duration here
let timerInterval;
let score = 0;

// DOM elements
const startButton = document.getElementById("startButton");
const questionContainer = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const choicesList = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const timeLeftSpan = document.getElementById("timeLeft");
const initialsForm = document.getElementById("scoreForm");
const initialsInput = document.getElementById("initials");

// Function to start the quiz
function startQuiz() {
   startButton.style.display = "none";
   questionContainer.style.display = "display";
   loadQuestion();
   startTimer();
}

// Function to load a question
function loadQuestion() {
   if (currentQuestionIndex < questions.length) {
       const question = questions[currentQuestionIndex];
       questionElement.textContent = question.question;
       choicesList.innerHTML = "";

       question.choices.forEach((choice, index) => {
           const listItem = document.createElement("li");
           listItem.textContent = choice;
           listItem.addEventListener("click", () => checkAnswer(index));
           choicesList.appendChild(listItem);
       });
   } else {
       endQuiz();
   }
}

// Function to check the selected answer
function checkAnswer(selectedIndex) {
   const currentQuestion = questions[currentQuestionIndex];

   if (currentQuestion.choices[selectedIndex] === currentQuestion.correctAnswer) {
       feedback.textContent = "Correct!";
       score += 10; // Increase the score for a correct answer
   } else {
       feedback.textContent = "Incorrect!";
       timeLeft -= 10; // Deduct time for an incorrect answer
       if (timeLeft < 0) {
           timeLeft = 0;
       }
   }

   currentQuestionIndex++;
   loadQuestion();
}

// Function to start the timer
function startTimer() {
   timerInterval = setInterval(() => {
       if (timeLeft > 0) {
           timeLeft--;
           timeLeftSpan.textContent = timeLeft;
       } else {
           clearInterval(timerInterval);
           endQuiz();
       }
   }, 1000);
}

// Function to end the quiz
function endQuiz() {
   clearInterval(timerInterval);
   questionContainer.style.display = "none";
   initialsForm.style.display = "block";
}

// Event listener for submitting initials
initialsForm.addEventListener("submit", function(event) {
   event.preventDefault();
   const initials = initialsInput.value.trim();

   if (initials !== "") {
       // Save the score and initials or perform any other desired action
       alert(`Your score is ${score} and your initials are ${initials}`);
       // You can send this data to your backend or store it as needed
   }
});

// Event listener to start the quiz
startButton.addEventListener("click", startQuiz);