if (document.body.clientWidth > 1024) {
  document.getElementById('background-video').play();
}

document.getElementById('logo').onclick = function() {
  document.getElementById('logo').classList.toggle('revealed');
}

