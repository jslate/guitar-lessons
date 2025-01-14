const chordpro = require('js-chordpro');

new QRCode(document.getElementById("qrcode"), {
  text: window.location.href,
  width: 128,
  height: 128,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

const cp = document.getElementById("cp");
if (cp) {
  const cpContent = cp.textContent;
  let parsed = chordpro.parse(cpContent + "\n");
  let html = chordpro.to_html(parsed);
  document.getElementById("cp-output").innerHTML = html;
}

const scrollButton = document.getElementById("scroll");
const scrollSpeedInput = document.getElementById("scrollSpeed");
const scrollSpeedValue = document.getElementById("scrollSpeedValue");

if (scrollSpeedInput) {
  scrollSpeedInput.addEventListener("input", function() {
    scrollSpeedValue.textContent = scrollSpeedInput.value;
  });
}

if (scrollButton) {
  scrollButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    const delay = scrollButton.dataset.delay;
    let scrollSpeed = 10;
    if (scrollSpeedInput) {
      scrollSpeed = mapSpeed(parseInt(scrollSpeedInput.value)) * 2
    }
    scrollButton.style.animation = `pulsate ${1000}ms linear infinite`;
    setTimeout(() => {
      scrollButton.style.animation = '';
      slowScrollToBottom(scrollSpeed);
    }, delay ? parseInt(delay) : 0);
  });
}

function mapSpeed(value) {
  // Map the slider value (10-120) to a reasonable scroll duration (e.g., 5-60 seconds)
  const minSliderValue = 10;
  const maxSliderValue = 120;
  const minScrollDuration = 5; // seconds
  const maxScrollDuration = 60; // seconds

  return minScrollDuration + (maxScrollDuration - minScrollDuration) * ((maxSliderValue - value) / (maxSliderValue - minSliderValue));
}

function slowScrollToBottom(durationInSeconds) {
  const duration = durationInSeconds * 1000;
  const start = window.scrollY;
  const distance = document.body.scrollHeight - window.innerHeight - start;
  let startTime = null;
  let isScrolling = true;

  function stopScroll() {
    isScrolling = false;
  }

  function animation(currentTime) {
    if (!isScrolling) return;
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * progress);
    if (elapsed < duration) requestAnimationFrame(animation);
  }

  window.addEventListener('wheel', stopScroll);
  requestAnimationFrame(animation);
}
