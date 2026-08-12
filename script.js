// ── NAVBAR SCROLL
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── HAMBURGER
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
  var isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  } else {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
  }
});

var mobileLinks = document.querySelectorAll('.nav-mobile-link');
for (var i = 0; i < mobileLinks.length; i++) {
  mobileLinks[i].addEventListener('click', function() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
}

// ── HERO CAROUSEL
var slides = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dot');
var current = 0;
var autoTimer;

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAuto() {
  autoTimer = setInterval(function() { goTo(current + 1); }, 7500);
}

function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

document.getElementById('nextBtn').addEventListener('click', function() {
  goTo(current + 1); resetAuto();
});
document.getElementById('prevBtn').addEventListener('click', function() {
  goTo(current - 1); resetAuto();
});

for (var d = 0; d < dots.length; d++) {
  (function(idx) {
    dots[idx].addEventListener('click', function() { goTo(idx); resetAuto(); });
  })(d);
}

startAuto();

// ── PORTFOLIO CAROUSEL
var portfolioTrack = document.getElementById('portfolioTrack');
var portfolioDots = document.querySelectorAll('.portfolio-dot');
var portfolioPrev = document.getElementById('portfolioPrev');
var portfolioNext = document.getElementById('portfolioNext');
var portfolioIndex = 0;
var portfolioTimer;

function showPortfolio(index) {
  var slides = document.querySelectorAll('.portfolio-slide');
  if (!slides.length) return;

  portfolioIndex = (index + slides.length) % slides.length;
  portfolioTrack.style.transform = 'translateX(-' + (portfolioIndex * 100) + '%)';

  portfolioDots.forEach(function(dot, dotIndex) {
    dot.classList.toggle('active', dotIndex === portfolioIndex);
  });
}

function startPortfolioAuto() {
  clearInterval(portfolioTimer);
  portfolioTimer = setInterval(function() {
    showPortfolio(portfolioIndex + 1);
  }, 2500);
}

portfolioPrev.addEventListener('click', function() {
  showPortfolio(portfolioIndex - 1);
  startPortfolioAuto();
});

portfolioNext.addEventListener('click', function() {
  showPortfolio(portfolioIndex + 1);
  startPortfolioAuto();
});

portfolioDots.forEach(function(dot) {
  dot.addEventListener('click', function() {
    showPortfolio(parseInt(dot.getAttribute('data-index')));
    startPortfolioAuto();
  });
});

showPortfolio(0);
startPortfolioAuto();

// ── REVEAL ON SCROLL

var revealEls = document.querySelectorAll('.reveal');

function checkReveal() {
  var trigger = window.innerHeight * 0.88;
  for (var r = 0; r < revealEls.length; r++) {
    var rect = revealEls[r].getBoundingClientRect();
    if (rect.top < trigger) {
      revealEls[r].classList.add('visible');
    }
  }
}

window.addEventListener('scroll', checkReveal);
checkReveal();

// WhatsApp: sobe quando chega no footer
var waFloat = document.querySelector('.whatsapp-float');
var footer = document.querySelector('footer');

window.addEventListener('scroll', function() {
  var footerTop = footer.getBoundingClientRect().top;
  var windowH = window.innerHeight;
  if (footerTop < windowH) {
    var overlap = windowH - footerTop;
    waFloat.style.bottom = (32 + overlap) + 'px';
  } else {
    waFloat.style.bottom = '32px';
  }
});