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
