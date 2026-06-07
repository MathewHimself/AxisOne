const askForm = document.querySelector('.ask-bar');
const askInput = document.querySelector('.ask-bar__input');
const promptChips = document.querySelectorAll('.prompt-chip');

if (askForm && askInput) {
  promptChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      askInput.value = chip.textContent.trim();
      askInput.focus();
    });
  });

  askForm.addEventListener('submit', (event) => {
    event.preventDefault();
    askInput.focus();
  });
}
