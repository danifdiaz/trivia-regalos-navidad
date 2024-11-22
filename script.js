const questions = [
  { question: "¿Cómo se llama el protagonista de One Piece?", answers: ["Zoro", "Sanji", "Luffy", "Usopp"], correct: 2 },
  { question: "¿Cuál es el sueño de Luffy?", answers: ["Encontrar el One Piece", "Ser el Rey de los Piratas", "Derrotar a Kaido", "Proteger a sus amigos"], correct: 1 },
  { question: "¿Qué fruta del diablo comió Luffy?", answers: ["Gomu Gomu no Mi", "Hito Hito no Mi", "Mera Mera no Mi", "Yami Yami no Mi"], correct: 0 },
  // Continúa añadiendo preguntas hasta 50...
];

let currentQuestion = 0;
let score = 0;
let timer;
let musicPlaying = false;
const gifts = [1, 2, 3]; // Regalos disponibles

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showScore();
    return;
  }

  const questionText = document.getElementById("question-text");
  const answersDiv = document.getElementById("answers");
  questionText.textContent = questions[currentQuestion].question;
  answersDiv.innerHTML = "";

  questions[currentQuestion].answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => {
      checkAnswer(index);
    });
    answersDiv.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  let timeLeft = 15;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `⏱ Tiempo restante: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱ Tiempo restante: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      alert("¡Tiempo agotado!");
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  clearInterval(timer);

  if (selected === questions[currentQuestion].correct) {
    score += 10;
    checkForGift();
  } else {
    alert("Incorrecto");
  }

  updateScoreBar();
  nextQuestion();
}

function updateScoreBar() {
  const scoreBar = document.getElementById("score-bar");
  scoreBar.style.width = `${(score / 150) * 100}%`;
}

function checkForGift() {
  if (score % 50 === 0 && gifts.length > 0) {
    const giftScreen = document.getElementById("gift-screen");
    const giftNumber = document.getElementById("gift-number");
    const randomGift = gifts.shift();
    giftNumber.textContent = `Regalo Número ${randomGift}`;
    giftScreen.style.display = "flex";
  }
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

document.getElementById("gift-continue-button").addEventListener("click", () => {
  document.getElementById("gift-screen").style.display = "none";
});

document.getElementById("restart-button").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  gifts.push(1, 2, 3);
  document.getElementById("score-screen").classList.add("hidden");
  loadQuestion();
});

document.getElementById("music-toggle").addEventListener("click", () => {
  const bgMusic = document.getElementById("bg-music");
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
  } else {
    bgMusic.play();
    musicPlaying = true;
  }
});

loadQuestion();
