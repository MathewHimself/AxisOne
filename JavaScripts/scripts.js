const askForm = document.querySelector('.ask-bar');
const askInput = document.querySelector('.ask-bar__input');
const promptChips = document.querySelectorAll('.prompt-chip');
const emailForm = document.querySelector('.email-buttons');
const emailInput = document.querySelector('.email-input');
const emailButton = document.querySelector('.try-buton');

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

if (emailForm && emailInput && emailButton) {
  const defaultButtonText = emailButton.textContent;

  emailForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!emailInput.checkValidity() || !emailInput.value.trim()) {
      emailInput.focus();
      emailInput.reportValidity();
      return;
    }

    emailButton.textContent = 'отправлено';
    emailInput.value = '';

    window.setTimeout(() => {
      emailButton.textContent = defaultButtonText;
    }, 1800);
  });
}
