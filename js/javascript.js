(function() {
  const wheel = document.querySelector('.wheel');
  const startBtn = document.querySelector('.button');
  const placeBetBtn = document.querySelector('.place-bet');
  const betAmountInput = document.querySelector('#bet-amount');
  const betColorInput = document.querySelector('#bet-color');
  const balanceDisplay = document.querySelector('#balance');
  const betInfoDisplay = document.querySelector('#bet-info');
  const outcomeDisplay = document.querySelector('#outcome');
  const winLoseDisplay = document.querySelector('#win-lose');
	const spinAudio = document.getElementById('spin-audio'); // Declare spinAudio variable here


  let deg = 0;
  let balance = 100;
  let isSpinning = false;

  function disableButtons() {
    startBtn.disabled = true;
    placeBetBtn.disabled = true;
  }

  function enableButtons() {
    startBtn.disabled = false;
    placeBetBtn.disabled = false;
  }

  function spinWheel() {
    disableButtons();

    deg = Math.floor(5000 + Math.random() * 5000);

    wheel.style.transition = 'all 10s ease';
    wheel.style.transform = `rotate(${deg}deg)`;
		const spinAudio = document.getElementById('spin-audio');
		spinAudio.play();

    wheel.classList.add('blur');

    // Reset outcome display
    outcomeDisplay.textContent = '';

    wheel.addEventListener('transitionend', handleTransitionEnd);
  }

  function handleTransitionEnd() {
    wheel.classList.remove('blur');
    enableButtons();
    wheel.style.transition = 'none';

    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;

		spinAudio.pause();
		spinAudio.currentTime = 0;


    if (actualDeg > 0 && actualDeg < 10) {
      showOutcome('26 BLACK', 'black');
    }

    const numbers = [
      { number: 32, result: 'RED' },
      { number: 15, result: 'BLACK' },
      { number: 19, result: 'RED' },
      { number: 4, result: 'BLACK' },
      { number: 21, result: 'RED' },
      { number: 2, result: 'BLACK' },
      { number: 25, result: 'RED' },
      { number: 17, result: 'BLACK' },
      { number: 34, result: 'RED' },
      { number: 6, result: 'BLACK' },
      { number: 27, result: 'RED' },
      { number: 13, result: 'BLACK' },
      { number: 36, result: 'RED' },
      { number: 11, result: 'BLACK' },
      { number: 30, result: 'RED' },
      { number: 8, result: 'BLACK' },
      { number: 23, result: 'RED' },
      { number: 10, result: 'BLACK' },
      { number: 5, result: 'RED' },
      { number: 24, result: 'BLACK' },
      { number: 16, result: 'RED' },
      { number: 33, result: 'BLACK' },
      { number: 1, result: 'RED' },
      { number: 20, result: 'BLACK' },
      { number: 14, result: 'RED' },
      { number: 31, result: 'BLACK' },
      { number: 9, result: 'RED' },
      { number: 22, result: 'BLACK' },
      { number: 18, result: 'RED' },
      { number: 29, result: 'BLACK' },
      { number: 7, result: 'RED' },
      { number: 28, result: 'BLACK' },
      { number: 12, result: 'RED' },
      { number: 35, result: 'BLACK' },
      { number: 3, result: 'RED' },
      { number: 26, result: 'BLACK' }
    ];

    numbers.forEach(({ number, result }) => {
      const minDeg = (number - 1) * 10;
      const maxDeg = number * 10;

      if (actualDeg > minDeg && actualDeg < maxDeg) {
        showOutcome(`${number} ${result}`, result.toLowerCase());
      }
    });

    // Reset bet inputs
    betAmountInput.value = '';
    betColorInput.selectedIndex = 0;

		isSpinning = false;
  }

  function showOutcome(outcomeText, outcomeColor) {
    outcomeDisplay.textContent = outcomeText;
    outcomeDisplay.style.color = outcomeColor === 'green' ? 'white' : 'black';
    // outcomeDisplay.style.backgroundColor = outcomeColor;

    const betAmount = parseInt(betAmountInput.value);

    if (outcomeColor === betColorInput.value) {
      const winnings = betAmount * 2;
      balance += winnings;
      winLoseDisplay.textContent = `You Win! +$${winnings}`;
    } else {
      balance -= betAmount;
      winLoseDisplay.textContent = `Host Wins! -$${betAmount}`;
    }

    balanceDisplay.textContent = `Current Balance: $${balance}`;

    if (balance <= 0) {
      alert('Better luck next time.');

      // Reset the game
      balance = 100;
      balanceDisplay.textContent = `Current Balance: $${balance}`;
      winLoseDisplay.textContent = '';
      placeBetBtn.disabled = false;
    }
  }

  function placeBet() {
    const betAmount = parseInt(betAmountInput.value);
    const betColor = betColorInput.value;

    if (betAmount <= 0 || isNaN(betAmount)) {
      alert('Please enter a valid bet amount.');
      return;
    }

    if (betAmount > balance) {
      alert('Insufficient balance. Please place a lower bet amount.');
      return;
    }

    balance -= betAmount;
    balanceDisplay.textContent = `Current Balance: $${balance}`;
    betInfoDisplay.textContent = `Placed Bet: $${betAmount} on ${betColor}`;
    winLoseDisplay.textContent = '';

    // Disable bet placement button after bet is placed
    placeBetBtn.disabled = true;

    // Enable wheel spin button
    startBtn.disabled = false;
  }

  placeBetBtn.addEventListener('click', placeBet);

  startBtn.addEventListener('click', () => {
    if (isSpinning) {
      return;
    }

    isSpinning = false;
    spinWheel();
  });

	window.onload = function() {
		const backgroundMusic = document.getElementById('background-music');
		backgroundMusic.volume = 0.1; // Set the volume to 50% (adjust as needed)
		backgroundMusic.play();
	};
})();
