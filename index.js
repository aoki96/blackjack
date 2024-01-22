document.addEventListener('DOMContentLoaded', function () {
  const launchBtn = document.getElementById('launch-btn');
  const playerNameInput = document.getElementById('playerName');

  function launchGame() {
    const playerName = playerNameInput.value.trim();
    if (playerName !== '') {
      sessionStorage.setItem('playerName', playerName);
      window.location.href = './game.html';
    } else {
      alert('Please enter your name.');
  }
}
   launchBtn.addEventListener('click', launchGame);
    playerNameInput.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        launchGame();
    }
  });
});
