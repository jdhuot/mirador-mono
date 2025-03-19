export default function scrollAnimations() {
  console.log("running here..")
  const elements = document.querySelectorAll('[data-fade]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      const fadeDirection = el.dataset.fade;
      if (entry.isIntersecting) {
        el.classList.add('fade-in');
      } else {
        el.classList.remove('fade-in'); // Optional: remove for "stay once in"
      }
    });
  }, { threshold: 0.1 });

  elements.forEach((el) => {
    const fadeDirection = el.dataset.fade;
    el.classList.add(`fade-${fadeDirection}`);
    observer.observe(el);
  });
}
