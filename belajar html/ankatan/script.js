const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

const photoCard = document.querySelector('.photo-card');
const miniCards = document.querySelectorAll('.mini-card');

window.addEventListener('pointermove', (event) => {
  if (!photoCard) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 18;
  const y = (event.clientY / window.innerHeight - 0.5) * 18;

  photoCard.style.transform = `rotate(${x * -0.4 - 4}deg) translate(${x * 0.5}px, ${y * 0.5}px)`;

  miniCards.forEach((card, index) => {
    const speed = (index + 1) * 0.7;
    card.style.transform = `rotate(${index % 2 === 0 ? 12 : -10}deg) translate(${x * speed}px, ${y * speed}px)`;
  });
});

window.addEventListener('pointerleave', () => {
  if (photoCard) {
    photoCard.style.transform = 'rotate(-4deg) translate(0, 0)';
  }

  miniCards.forEach((card, index) => {
    card.style.transform = `rotate(${index % 2 === 0 ? 12 : -10}deg)`;
  });
});
