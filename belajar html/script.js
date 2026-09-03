document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.student-card');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((item) => item.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;
      cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.group === filter;
        card.style.display = matches ? 'block' : 'none';
      });
    });
  });
});
