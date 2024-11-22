const questions = [
  { question: "¿Cómo se llama el protagonista de One Piece?", answers: ["Zoro", "Sanji", "Luffy", "Usopp"], correct: 2 },
  { question: "¿Cuál es el sueño de Luffy?", answers: ["Encontrar el One Piece", "Ser el Rey de los Piratas", "Derrotar a Kaido", "Proteger a sus amigos"], correct: 1 },
  { question: "¿Qué fruta del diablo comió Luffy?", answers: ["Gomu Gomu no Mi", "Hito Hito no Mi", "Mera Mera no Mi", "Yami Yami no Mi"], correct: 0 },
  // Continúa añadiendo preguntas...
];

let currentQuestion = 0;
let score = 0;
let timer;
let chopperAppearances = 2;
let chopperShown = false;
let musicPlaying = false;
const gifts = [1, 2, 3]; // Regalos disponibles

function loadQuestion() {
  const giftScreen = document.getElementById("gift-screen");
  giftScreen.classList.add("hidden"); // Aseguramos que el contenedor de regalos esté oculto al cargar

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

  if (Math.random() < 0.5 && chopperAppearances > 0) {
    showChopper();
  }

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
      showMeme(false);
    }
  }, 1000);
}

function showChopper() {
  chopperShown = true;
  chopperAppearances--;

  const chopper = document.createElement("img");
  chopper.src = "https://cdn.pixabay.com/photo/2023/01/10/07/47/chopper-7708747_960_720.png";
  chopper.alt = "Chopper";
  chopper.style.position = "absolute";
  chopper.style.width = "100px";
  chopper.style.top = `${Math.random() * 80 + 10}%`;
  chopper.style.left = `${Math.random() * 80 + 10}%`;
  chopper.style.cursor = "pointer";

  chopper.addEventListener("click", () => {
    score += 20;
    updateScoreBar();
    checkForGift();
    alert("¡Encontraste a Chopper! 🎉 +20 puntos");
    document.body.removeChild(chopper);
  });

  document.body.appendChild(chopper);

  setTimeout(() => {
    if (document.body.contains(chopper)) {
      document.body.removeChild(chopper);
    }
  }, 5000);
}

function checkAnswer(selected) {
  clearInterval(timer);

  if (selected === questions[currentQuestion].correct) {
    score += 10;
    showMeme(true);
  } else {
    showMeme(false);
  }

  updateScoreBar();
  checkForGift();
}

function updateScoreBar() {
  const scoreBar = document.getElementById("score-bar");
  scoreBar.style.width = `${(score / 150) * 100}%`;
}

function checkForGift() {
  if (score % 50 === 0 && gifts.length > 0) {
    const giftScreen = document.getElementById("gift-screen");
    const giftNumber = document.getElementById("gift-number");
    const randomGift = gifts.splice(Math.floor(Math.random() * gifts.length), 1)[0];
    giftNumber.textContent = `Regalo Número ${randomGift}`;
    giftScreen.classList.remove("hidden");
  }
}

function showMeme(isCorrect) {
  const memes = isCorrect
    ? ["https://i.imgflip.com/4/4t0m5.jpg", "https://i.imgflip.com/30b1gx.jpg"]
    : ["https://i.imgflip.com/2vjx.jpg", "https://i.imgflip.com/3vzej.jpg"];
  const memeImg = document.getElementById("meme-img");
  memeImg.src = memes[Math.floor(Math.random() * memes.length)];

  document.getElementById("meme-screen").classList.remove("hidden");
}

document.getElementById("continue-button").addEventListener("click", () => {
  document.getElementById("meme-screen").classList.add("hidden");
  currentQuestion++;
  loadQuestion();
});

document.getElementById("gift-continue-button").addEventListener("click", () => {
  document.getElementById("gift-screen").classList.add("hidden");
});

document.getElementById("restart-button").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  chopperAppearances = 2;

  document.getElementById("score-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");

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
