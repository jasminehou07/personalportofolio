const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
    });
    const filter = button.dataset.filter;
    document.querySelectorAll('.project').forEach((project) => {
      project.classList.toggle('hidden', filter !== 'all' && !project.dataset.tags.includes(filter));
    });
  });
});

const count = document.querySelector('[data-count]');
let value = 0;
const tick = () => {
  value += 1;
  count.textContent = value;
  if (value < Number(count.dataset.count)) setTimeout(tick, 140);
};
setTimeout(tick, 450);
document.getElementById('year').textContent = new Date().getFullYear();
