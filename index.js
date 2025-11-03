// index.js
const startForm = document.getElementById('startForm');
const usernameInput = document.getElementById('username');

startForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission

  const username = usernameInput.value.trim();
  if (username) {
    // Save username in localStorage
    localStorage.setItem('quizUsername', username);

    // Clear any previous quiz results for this session
    localStorage.removeItem('quizResult');

    // Redirect to quiz page
    window.location.href = 'quiz.html';
  } else {
    alert('Please enter your name.');
  }
});
