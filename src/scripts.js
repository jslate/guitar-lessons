const chordpro = require('js-chordpro');

new QRCode(document.getElementById("qrcode"), {
  text: window.location.href,
  width: 128,
  height: 128,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});

const cp = document.getElementById("cp")
if (cp) {
  const cpContent = cp.textContent;
  let parsed = chordpro.parse(cpContent + "\n");
  let html = chordpro.to_html(parsed);
  document.getElementById("cp-output").innerHTML = html;
  console.log(html);
}

const scrollButton = document.getElementById("scroll");
if (scrollButton) {
  scrollButton.addEventListener("click", function() {
    slowScrollToBottom(120)
  });
}

function slowScrollToBottom(durationInSeconds) {
  const duration = durationInSeconds * 1000;
  const start = window.pageYOffset;
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
