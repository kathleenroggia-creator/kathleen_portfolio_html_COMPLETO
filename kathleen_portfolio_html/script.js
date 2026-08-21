const links = [...document.querySelectorAll('.nav-tag')];
const sections = [...document.querySelectorAll('main section[id]')];

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if (!visible) return;
  links.forEach(link => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${visible.target.id}`));
}, { threshold:[.15,.35,.6], rootMargin:'-12% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

document.documentElement.classList.add('js');

const revealTargets = document.querySelectorAll(
  '.section-label, .section h2, .section-intro, .case-card, .experience-card, .education-list article, .course-card, .contact-content, .contact-paper-stack'
);
revealTargets.forEach((element) => element.classList.add('reveal'));

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  skillsSection.querySelectorAll('.skills-cloud span').forEach((tag, index) => {
    tag.style.setProperty('--stagger-delay', `${index * 40}ms`);
  });
  skillsSection.querySelectorAll('.skill-box').forEach((card, index) => {
    card.style.setProperty('--stagger-delay', `${index * 100}ms`);
  });
}

const revealObserver = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    currentObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

revealTargets.forEach((element) => revealObserver.observe(element));
if (skillsSection) revealObserver.observe(skillsSection);

document.querySelector('#year').textContent = new Date().getFullYear();

// Preencha estes dados antes de publicar o portfólio.
