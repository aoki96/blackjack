document.addEventListener('DOMContentLoaded', function () {
  const launchBtn = document.getElementById('launch-btn');
  const playerNameInput = document.getElementById('playerName');

  function launchGame() {
    debugger;
    const playerName = playerNameInput.value.trim();
    if (playerName !== '') {
      console.log(window.location.href);
      sessionStorage.setItem('playerName', playerName);
      window.location.href = window.location.href + 'game.html';
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
