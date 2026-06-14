document.querySelectorAll('.slideshow').forEach(slideshow => {
  const slides = slideshow.querySelectorAll('.slide');
  const dotsContainer = slideshow.querySelector('.slide-dots');
  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  slideshow.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
  slideshow.querySelector('.next').addEventListener('click', () => goTo(current + 1));

  // Swipe support for mobile
  let touchStartX = 0;
  slideshow.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  slideshow.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
});
