const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let clickedLetters = 0;

// Get available voices and choose a feminine voice
let speechSynthesisVoice;
window.speechSynthesis.onvoiceschanged = function () {
  const voices = window.speechSynthesis.getVoices();
  speechSynthesisVoice = voices.find(voice => voice.name.toLowerCase().includes('female')) || voices[0];
};

// Create buttons for letters in Stage 1
function createLetterButtons() {
  const container = document.getElementById('letters-container');
  letters.forEach(letter => {
    const button = document.createElement('button');
    button.classList.add('letter-button');
    button.innerText = letter;
    button.onclick = () => playLetterSound(letter, button);
    container.appendChild(button);
  });
}

// Play the sound for the letter (Stage 1)
function playLetterSound(letter, button) {
  const message = new SpeechSynthesisUtterance(letter);
  message.voice = speechSynthesisVoice;
  window.speechSynthesis.speak(message);

  // Make button bounce when clicked
  button.style.transform = 'scale(1.5)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 100);

  // Change the color to blue when the letter is clicked
  button.classList.add('clicked');  // Add 'clicked' class to change color

  clickedLetters++;

  // Disable the button for the clicked letter
  button.disabled = true;

  // Show the next stage button if all letters are clicked
  if (clickedLetters === letters.length) {
    document.getElementById('next-stage').style.display = 'block';
    showRewardBubbles();
    playClappingSound(); // Play clapping sound when all letters are clicked
  }
}

// Show reward animation (bubbles)
function showRewardBubbles() {
  const bubblesContainer = document.getElementById('reward-bubbles');
  for (let i = 0; i < 10; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 3 + 2}s`; // Random speed
    bubblesContainer.appendChild(bubble);

    // Remove bubble after animation
    setTimeout(() => {
      bubble.remove();
    }, 3000);
  }
}

// Play clapping sound as reward
function playClappingSound() {
  const audio = new Audio('https://www.soundjay.com/button/clapping-01.wav'); // Replace with your clapping sound link
  audio.play();
}

// Restart the game
function restartGame() {
    clickedLetters = 0;
    
    // Clear the existing letter buttons from the container
    const container = document.getElementById('letters-container');
    container.innerHTML = ''; // Remove all existing buttons
    
    // Recreate the letter buttons
    createLetterButtons();
    
    // Hide the "Play Again" button
    document.getElementById('next-stage').style.display = 'none';
    
    // Clear any existing reward bubbles
    document.getElementById('reward-bubbles').innerHTML = ''; 
  
    // Reset any transformations or styles if needed
    const buttons = document.querySelectorAll('.letter-button');
    buttons.forEach(button => {
      button.disabled = false;
      button.classList.remove('clicked');  // Remove 'clicked' class to reset color
      button.style.transform = 'scale(1)';
    });
  }
  

// Initialize the game
createLetterButtons();
