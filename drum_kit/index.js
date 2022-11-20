function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.key}"]`);
    if (!audio) return;
    //rewind to the start
    audio.currentTime = 0;
    audio.play();

    const key = document.querySelector(`.key[data-key="${e.key}"]`);
    key.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'box-shadow') return;
    this.classList.remove('playing')
}

window.addEventListener('keypress', playSound);
const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
