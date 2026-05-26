document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.querySelector('.hero-slides');
  const slides = document.querySelectorAll('.hero-slide');
  const prevButton = document.querySelector('.hero-prev');
  const nextButton = document.querySelector('.hero-next');
  let currentIndex = 0;

  const updateCarousel = () => {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  prevButton.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  // Auto-play
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);
});
