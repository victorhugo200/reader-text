const text = document.getElementById('text');
const btn = document.querySelector('.read');
const btnPause = document.querySelector('.pause');
const { speechSynthesis } = window;
let fala = null;

text.addEventListener('blur', () => {
  const { value } = text;
  if (value) {
    enableElement(btn);
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      changeButtonLabel(btnPause, 'Parar', 'Parar leitura');
    }
    disableElement(btnPause);
    createSpeak(value);
  } else {
    disableElement(btn);
  }
});

btn.addEventListener('click', () => {
  if (fala) {
    speechSynthesis.speak(fala);
    disableElement(btn);
    enableElement(btnPause);
  }
});
btnPause.addEventListener('click', () => {
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    changeButtonLabel(btnPause, 'Parar', 'Parar leitura');

  } else {
    speechSynthesis.pause();
  }
});

function disableElement(element) {
  element.setAttribute('disabled', true);
}

function enableElement(element) {
  element.removeAttribute('disabled');
}

function createSpeak(value) {
  fala = new SpeechSynthesisUtterance(value);
  fala.volume = 1.0;
  fala.voice = speechSynthesis
    .getVoices()
    .find(({ lang }) => lang === 'pt-BR');
  fala.lang = 'pt-BR';
  fala.onend = () => {
    disableElement(btnPause);
    enableElement(btn);
  };
  fala.onpause = () => {
    changeButtonLabel(btnPause, 'Continuar', 'Continuar leitura');
  };
  fala.onerror = (e) => {
    console.log(e);
  };
}

function changeButtonLabel(element, text, ariaLabel) {
    element.textContent = text;
    element.setAttribute('aria-label', ariaLabel);
}