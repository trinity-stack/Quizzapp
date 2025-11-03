// quiz.js
const questions = [
  { question: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markdown Language"], answer: 1 },
  { question: "Which programming language is used for web apps?", options: ["Python", "PHP", "JavaScript", "All of the above"], answer: 3 },
  { question: "What does CSS stand for?", options: ["Creative Style System", "Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], answer: 2 },
  { question: "What symbol is used to declare an ID in CSS?", options: ["#", ".", "*", "&"], answer: 0 }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Get username from localStorage
const username = localStorage.getItem("quizUsername") || "User";
document.getElementById("usernameDisplay").textContent = `👋 ${username}`;

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timeEl = document.getElementById("time");

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  startTimer();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => selectOption(index, li));
    optionsEl.appendChild(li);
  });

  nextBtn.disabled = true;
}

function selectOption(selectedIndex, liElement) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const allOptions = document.querySelectorAll(".options-list li");

  allOptions.forEach((opt, index) => {
    if(index === q.answer) opt.classList.add("correct");
    else if(index === selectedIndex) opt.classList.add("wrong");
    opt.style.pointerEvents = "none";
  });

  if (selectedIndex === q.answer) score++;
  nextBtn.disabled = false;
}

function startTimer() {
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.disabled = false;
      document.querySelectorAll(".options-list li").forEach((li) => li.style.pointerEvents = "none");
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    // Save result in localStorage
    localStorage.setItem("quizResult", JSON.stringify({ username, score, total: questions.length }));
    window.location.href = "results.html";
  }
});

loadQuestion();
