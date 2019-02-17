if (document.body.clientWidth > 1024) {
  document.getElementById('background-video').play();
}

document.getElementById('logo').onclick = function() {
  document.getElementById('logo').classList.toggle('revealed');
}

function openResume(event) {
  document.getElementById('resume').classList.add('opened');
}
if (location.hash.includes('resume-opened')) {
  openResume();
}
document.getElementById('open-resume').onclick = openResume

