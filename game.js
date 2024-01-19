let deck = [];
let playerHand = [];
let dealerHand = [];
let gameStarted = false;
let gameOver = false;
let result = '';

function getPlayerName() {
  const playerName = sessionStorage.getItem('playerName');
  if (playerName) {
    document.getElementById('playerName').innerText = playerName;
  } else {
    window.location.href = 'index.html';
  }
}

updateDisplay();

function createDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function startGame() {
  if (!gameStarted) {
    createDeck();
    shuffleDeck();
    playerHand = [getNextCard(), getNextCard()];
    dealerHand = [getNextCard(), getNextCard()];
    gameStarted = true;
    gameOver = false;
    result = '';
    updateDisplay();
    toggleResetButton(false);
    toggleLaunchButton(false);
  }
}

function getNextCard() {
  return deck.shift();
}

function calculateHandValue(hand) {
  let sum = 0;
  let numAces = 0;

  for (let card of hand) {
    if (card.value === 'A') {
      sum += 11;
      numAces++;
    } else if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
      sum += 10;
    } else {
      sum += parseInt(card.value);
    }
  }

  while (numAces > 0 && sum > 21) {
    sum -= 10;
    numAces--;
  }

  return sum;
}

function hit() {
  if (gameStarted && !gameOver) {
    playerHand.push(getNextCard());
    updateDisplay();

    const playerValue = calculateHandValue(playerHand);
    if (playerValue > 21) {
      endGame('Player busted! Dealer wins.');
    }
  }
}

function stand() {
  if (gameStarted && !gameOver) {
    while (calculateHandValue(dealerHand) < 17) {
      dealerHand.push(getNextCard());
    }

    updateDisplay();
    endGame(determineWinner());
  }
}

function determineWinner() {
  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  if (playerValue > 21) {
    return 'Player busted! Dealer wins.';
  } else if (dealerValue > 21) {
    return 'Dealer busted! Player wins.';
  } else if (playerValue > dealerValue) {
    return 'Player wins!';
  } else if (playerValue < dealerValue) {
    return 'Dealer wins.';
  } else {
    return 'It\'s a tie!';
  }
}

function updateDisplay() {
  const playerName = sessionStorage.getItem('playerName');
  const capitalizedPlayerName = playerName ? capitalizeFirstLetter(playerName) : 'Player\'s Hand: ';
  
  document.getElementById('player-hand').innerHTML = capitalizedPlayerName + '\'s Hand: ' + createCardElements(playerHand);
  document.getElementById('dealer-hand').innerHTML = 'Dealer\'s Hand: ' + createCardElements(dealerHand);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function createCardElements(hand) {
  return hand.map(card => `<div class="card ${card.suit.toLowerCase()}">${card.value} of ${card.suit}</div>`).join('');
}

function endGame(resultText) {
  gameOver = true;
  result = resultText;
  updateDisplay();
  toggleResetButton(true);
  toggleLaunchButton(true);

  const popup = document.createElement('div');
  popup.className = 'popup';
  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';
  popupContent.innerText = resultText;
  popup.appendChild(popupContent);
  document.body.appendChild(popup);

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  popup.style.display = 'block';
  overlay.style.display = 'block';

  setTimeout(() => {
    result = '';
    updateDisplay();

    popup.style.display = 'none';
    overlay.style.display = 'none';
  }, 1500);
}

function resetGame() {
  deck = [];
  playerHand = [];
  dealerHand = [];
  gameStarted = false;
  gameOver = false;
  result = '';

  startGame();
  toggleResetButton(false);
  toggleLaunchButton(false);
  updateDisplay();
}

function toggleResetButton(enable) {
  document.getElementById('reset-btn').disabled = !enable;
}

function toggleLaunchButton(enable) {
  const launchButton = document.getElementById('new-game-btn');
  if (launchButton) {
    launchButton.disabled = !enable;
  }
}

function quitGame() {
  sessionStorage.removeItem('playerName');
  window.location.href = 'index.html';
}

function handToString(hand) {
  return hand.map(card => card.value + ' of ' + card.suit).join(', ');
}

getPlayerName();
