
// hash params
(function() {
  var q = location.hash.split('&');
  var hash = {};
  (location.hash.split('#')[1] || '').split('&').forEach(function(q) {
    if (q.length === 0) { return; }
    var kv = q.split('=');
    if (kv.length === 1) {
      hash[kv[0]] = true;
    } else {
      hash[kv[0]] = kv.slice(1).join('');
    }
  });

  window.getParam = function(key) {
    return hash[key];
  }
  window.setParam = function(key, value) {
    hash[key] = value;
    if (value === false || value === undefined || value === null) {
      delete hash[key];
    }
    location.hash = Object.keys(hash).map(function(k) {
      if (hash[k] === true) {
        return k;
      } else {
        return k + '=' + hash[k].toString();
      }
    }).join('&');
  }
})();

// languages
var languages = document.querySelectorAll('section#languages a');
for (var i = 0; i < languages.length; i++) {
  languages[i].addEventListener('click', function(event) {
    window.setParam('lang', true);
    location.href = event.target.href + location.hash;
    event.preventDefault();
  });
}

var userLang = (window.navigator.userLanguage || window.navigator.language || 'en').toLowerCase().substring(0, 2);
var candidateLang = document.querySelector('section#languages a[lang=' + userLang + ']');
if (!window.getParam('lang') && candidateLang && !candidateLang.classList.contains('active')) {
  candidateLang.click()
}

// logo
document.getElementById('logo').onclick = function() {
  document.getElementById('logo').classList.toggle('revealed');
}

var resume = document.getElementById('resume');
if (resume && window.getParam('resume-opened') || window.getParam('resume')) {
  resume.classList.add('opened');
}
