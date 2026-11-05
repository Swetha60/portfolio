/**
 * Swetha Derangula - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPEWRITER EFFECT
  const phrases = [
    'Machine Learning',
    'Data Science & Analytics',
    'Python & SQL Engineering',
    'Predictive Web Apps'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const delayBetweenPhrases = 2000;
  const typewriterElement = document.getElementById('typewriterText');

  function typeEffect() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      currentSpeed = delayBetweenPhrases;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      currentSpeed = 300;
    }

    setTimeout(typeEffect, currentSpeed);
  }
  typeEffect();

  // 2. THEME TOGGLE (DARK / LIGHT MODE)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('portfolio-theme', 'dark');
      }
    });
  }

  // 3. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // 4. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Navbar glass elevation
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    }

    // Active link highlighting
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 5. BACK TO TOP CLICK
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// 6. COPY TO CLIPBOARD HELPER & TOAST
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`);
    
    // Quick button pulse animation
    if (buttonElement) {
      const originalHtml = buttonElement.innerHTML;
      buttonElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      setTimeout(() => {
        buttonElement.innerHTML = originalHtml;
      }, 1800);
    }
  }).catch(err => {
    console.error('Failed to copy: ', err);
    showToast('Failed to copy');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// 7. CONTACT FORM SUBMISSION
function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('senderEmail').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Create formatted mailto URI
  const recipient = 'swethaderangula60@gmail.com';
  const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
  const mailBody = encodeURIComponent(
    `Hello Swetha,\n\n${message}\n\nBest regards,\n${name}\nContact: ${email}`
  );

  const mailtoUrl = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;

  const feedback = document.getElementById('formSuccessMessage');
  if (feedback) {
    feedback.classList.remove('hidden');
  }

  // Open the mail client
  window.location.href = mailtoUrl;

  showToast('Mail client opened!');
}
