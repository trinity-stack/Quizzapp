// Retrieve quiz result and username
const resultData = JSON.parse(localStorage.getItem("quizResult"));
const username = localStorage.getItem("quizUsername") || "User";
const greetingEl = document.getElementById("greeting");
const summaryEl = document.getElementById("summary");
const historyListEl = document.getElementById("historyList");

// Current view mode: "user" or "global"
let historyMode = "user";

// Display current result
if (resultData) {
  greetingEl.textContent = `🎉 Great job, ${username}!`;
  summaryEl.textContent = `You scored ${resultData.score} out of ${resultData.total}.`;
} else {
  greetingEl.textContent = "No result found!";
  summaryEl.textContent = "Take a quiz to see your results.";
}

// Save result locally
document.getElementById("saveBtn").addEventListener("click", () => {
  if (!resultData) return alert("No result to save!");
  let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  history.unshift({
    username,
    score: resultData.score,
    total: resultData.total,
    date: new Date().toLocaleString()
  });
  if (history.length > 50) history = history.slice(0,50);
  localStorage.setItem("quizHistory", JSON.stringify(history));
  alert("✅ Result saved locally!");
  loadHistory();
});

// Retry quiz
document.getElementById("retryBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Toggle buttons
document.getElementById("userHistoryBtn").addEventListener("click", () => {
  historyMode = "user";
  loadHistory();
});

document.getElementById("globalHistoryBtn").addEventListener("click", () => {
  historyMode = "global";
  loadHistory();
});

// Load history function
function loadHistory() {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
  let displayHistory;

  if (historyMode === "user") {
    displayHistory = history.filter(h => h.username === username);
    if (displayHistory.length === 0) {
      historyListEl.innerHTML = "<p>No history yet for you.</p>";
      return;
    }
  } else {
    displayHistory = history;
    if (displayHistory.length === 0) {
      historyListEl.innerHTML = "<p>No history yet globally.</p>";
      return;
    }
  }

  historyListEl.innerHTML = displayHistory
    .map(h => `
      <div class="history-item">
        <span>${h.username}</span>
        <span>${h.score}/${h.total}</span>
        <span>${h.date}</span>
      </div>
    `)
    .join("");
}

// Initial load
loadHistory();

// Fireworks code remains unchanged...
