// Tydo Legal Documentation JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollSpy();
  initSearch();
  initCopyAnchors();
  initFaqAccordion();
});

// 1. Theme Toggle (Dark / Light)
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('tydo-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('tydo-theme', nextTheme);
    updateThemeIcon(nextTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'light') {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
  } else {
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
  }
}

// 2. ScrollSpy for Sticky Table of Contents
function initScrollSpy() {
  const sections = document.querySelectorAll('.legal-section');
  const tocLinks = document.querySelectorAll('.toc-link');

  if (sections.length === 0 || tocLinks.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-10% 0px -75% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// 3. Live Search Filter across Legal Sections
function initSearch() {
  const searchInput = document.getElementById('legal-search');
  if (!searchInput) return;

  const sections = document.querySelectorAll('.legal-section');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    sections.forEach(section => {
      const text = section.innerText.toLowerCase();
      if (!query || text.includes(query)) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

// 4. Copy Direct Link to Section
function initCopyAnchors() {
  const copyButtons = document.querySelectorAll('.copy-anchor-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const url = `${window.location.origin}${window.location.pathname}#${targetId}`;

      navigator.clipboard.writeText(url).then(() => {
        const origTitle = btn.getAttribute('title');
        btn.setAttribute('title', '¡Enlace copiado!');
        btn.style.color = 'var(--brand-mint)';
        setTimeout(() => {
          btn.setAttribute('title', origTitle || 'Copiar enlace');
          btn.style.color = '';
        }, 2000);
      });
    });
  });
}

// 5. Collapsible FAQ Accordion
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('open');
    });
  });
}
