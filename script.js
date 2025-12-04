/**
 * Majlis Community Engagement Portal
 * Modern, High-Performance JavaScript
 * Features: Navigation, Animations, Prayer Times, Form Handling
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const debounce = (fn, delay = 100) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// ============================================
// NAVIGATION
// ============================================
class Navigation {
  constructor() {
    this.header = $('.main-header');
    this.burger = $('.burger');
    this.nav = $('.nav-links');
    this.dropdowns = $$('.dropdown');
    this.lastScroll = 0;

    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupDropdowns();
    this.setupScrollBehavior();
    this.setupActiveLinks();
  }

  setupMobileMenu() {
    if (!this.burger || !this.nav) return;

    this.burger.addEventListener('click', () => this.toggleMenu());

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.nav.classList.contains('active') &&
        !this.nav.contains(e.target) &&
        !this.burger.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.nav.classList.contains('active')) {
        this.closeMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth > 768 && this.nav.classList.contains('active')) {
        this.closeMenu();
      }
    }));
  }


  toggleMenu() {
    this.nav.classList.toggle('active');
    this.burger.classList.toggle('active');
    document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
  }

  closeMenu() {
    this.nav.classList.remove('active');
    this.burger.classList.remove('active');
    document.body.style.overflow = '';
    this.dropdowns.forEach(d => d.classList.remove('active'));
  }

  setupDropdowns() {
    this.dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('a');

      // Mobile: toggle on click
      link?.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    });
  }

  setupScrollBehavior() {
    window.addEventListener('scroll', debounce(() => {
      const currentScroll = window.pageYOffset;

      // Add scrolled class for styling
      if (currentScroll > 50) {
        this.header?.classList.add('scrolled');
      } else {
        this.header?.classList.remove('scrolled');
      }

      this.lastScroll = currentScroll;
    }, 10));
  }

  setupActiveLinks() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    $$('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

// ============================================
// PRAYER TIMES (NEW FEATURE)
// ============================================
class PrayerTimes {
  constructor() {
    this.container = $('.prayer-times');
    if (!this.container) return;

    this.prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    this.init();
  }

  init() {
    this.updateTime();
    this.calculatePrayerTimes();

    // Update every minute
    setInterval(() => {
      this.updateTime();
      this.highlightCurrentPrayer();
    }, 60000);
  }

  updateTime() {
    const now = new Date();
    const timeEl = $('.current-time');
    const dateEl = $('.current-date');

    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }

    if (dateEl) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
  }

  calculatePrayerTimes() {
    // Addis Ababa coordinates
    const lat = 9.0227;
    const lng = 38.7468;
    const date = new Date();

    // Simplified prayer time calculation (for demo - use API in production)
    const times = this.getPrayerTimes(date, lat, lng);
    this.renderPrayerTimes(times);
    this.highlightCurrentPrayer();
  }

  getPrayerTimes(date, lat, lng) {
    // Simplified calculation - in production, use Aladhan API or similar
    const baseHours = {
      Fajr: 5,
      Dhuhr: 12,
      Asr: 15,
      Maghrib: 18,
      Isha: 19
    };

    // Adjust based on day of year (simplified)
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const adjustment = Math.sin((dayOfYear / 365) * Math.PI * 2) * 0.5;

    const times = {};
    Object.keys(baseHours).forEach(prayer => {
      let hour = baseHours[prayer] + adjustment;
      const minutes = Math.floor((hour % 1) * 60);
      hour = Math.floor(hour);
      times[prayer] = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });

    return times;
  }

  renderPrayerTimes(times) {
    const grid = $('.prayer-grid');
    if (!grid) return;

    grid.innerHTML = this.prayers.map(prayer => `
      <div class="prayer-card" data-prayer="${prayer.toLowerCase()}">
        <div class="prayer-name">${prayer}</div>
        <div class="prayer-time-value">${this.formatTime(times[prayer])}</div>
      </div>
    `).join('');
  }

  formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  }

  highlightCurrentPrayer() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const cards = $$('.prayer-card');
    cards.forEach(card => card.classList.remove('active'));

    // Find current prayer (simplified logic)
    const prayerMinutes = {
      fajr: 5 * 60,
      dhuhr: 12 * 60,
      asr: 15 * 60,
      maghrib: 18 * 60,
      isha: 19 * 60
    };

    let currentPrayer = 'isha';
    for (const [prayer, minutes] of Object.entries(prayerMinutes)) {
      if (currentMinutes >= minutes) {
        currentPrayer = prayer;
      }
    }

    const activeCard = $(`.prayer-card[data-prayer="${currentPrayer}"]`);
    activeCard?.classList.add('active');
  }
}

/
  / ============================================
  // SCROLL ANIMATIONS
  // ============================================
  class ScrollAnimations {
    constructor() {
      this.elements = $$('.animate-on-scroll, .stat-item, .service-card, .project-card, .news-card, .region-card, .timeline-item');
      this.init();
    }

    init() {
      if (!this.elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible', 'animated');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      this.elements.forEach(el => observer.observe(el));
    }
  }

// ============================================
// COUNTER ANIMATION
// ============================================
class CounterAnimation {
  constructor() {
    this.counters = $$('.stat-number');
    this.init();
  }

  init() {
    if (!this.counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[\d]/g, '');

    if (isNaN(target)) return;

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  }
}

// ============================================
// SMOOTH SCROLL
// ============================================
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');

        // Skip if it's a dropdown trigger
        if (anchor.nextElementSibling?.classList.contains('dropdown-menu')) {
          return;
        }

        e.preventDefault();

        if (href === '#' || href === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const target = $(href);
        if (target) {
          const headerHeight = $('.main-header')?.offsetHeight || 80;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// ============================================
// FORM HANDLING
// ============================================
class FormHandler {
  constructor() {
    this.form = $('#messageForm');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    $$('input, textarea', this.form).forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearError(field));
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // Validate all fields
    let isValid = true;
    $$('input[required], textarea[required]', this.form).forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate API call
    setTimeout(() => {
      this.form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    }, 1500);
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    if (field.required && !value) {
      isValid = false;
      message = 'This field is required';
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
    }

    if (!isValid) {
      this.showError(field, message);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  showError(field, message) {
    const group = field.closest('.form-group');
    group?.classList.add('error');

    let errorEl = group?.querySelector('.error-message');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      group?.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  clearError(field) {
    const group = field.closest('.form-group');
    group?.classList.remove('error');
    group?.querySelector('.error-message')?.remove();
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });

    // Auto remove
    const removeTimer = setTimeout(() => this.removeNotification(notification), 5000);

    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
      clearTimeout(removeTimer);
      this.removeNotification(notification);
    });
  }

  removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }
}

/
  / ============================================
  // PARALLAX EFFECT
  // ============================================
  class ParallaxEffect {
    constructor() {
      this.hero = $('.hero');
      this.init();
    }

    init() {
      if (!this.hero) return;

      window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
          this.hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }, 10));
    }
  }

// ============================================
// LAZY LOADING IMAGES
// ============================================
class LazyLoader {
  constructor() {
    this.images = $$('img[data-src]');
    this.init();
  }

  init() {
    if (!this.images.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' }
      );

      this.images.forEach(img => observer.observe(img));
    } else {
      // Fallback for older browsers
      this.images.forEach(img => this.loadImage(img));
    }
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    }
  }
}

// ============================================
// THEME MANAGER (Optional Dark/Light Mode)
// ============================================
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.theme);

    const toggle = $('.theme-toggle');
    toggle?.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
class BackToTop {
  constructor() {
    this.createButton();
    this.init();
  }

  createButton() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);
    this.button = btn;
  }

  init() {
    window.addEventListener('scroll', debounce(() => {
      if (window.pageYOffset > 500) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    }));

    this.button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================
class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bootstrap());
    } else {
      this.bootstrap();
    }
  }

  bootstrap() {
    // Core features
    new Navigation();
    new SmoothScroll();
    new ScrollAnimations();
    new CounterAnimation();
    new FormHandler();

    // Enhanced features
    new PrayerTimes();
    new ParallaxEffect();
    new LazyLoader();
    new BackToTop();

    // Add loaded class to body
    document.body.classList.add('loaded');

    console.log('✨ Majlis Portal initialized');
  }
}

// Start the application
new App();

// ============================================
// ADDITIONAL STYLES (Injected)
// ============================================
const additionalStyles = `
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--dark);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 4px 15px rgba(201, 162, 39, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 100;
  }
  
  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .back-to-top:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(201, 162, 39, 0.4);
  }
  
  .form-group.error input,
  .form-group.error textarea {
    border-color: var(--error);
  }
  
  .error-message {
    display: block;
    color: var(--error);
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
  
  img.loaded {
    animation: fadeIn 0.5s ease;
  }
  
  body.loaded .hero-content {
    animation: fadeInUp 1s ease;
  }
  
  /* Staggered animations for cards */
  .service-card:nth-child(1) { animation-delay: 0.1s; }
  .service-card:nth-child(2) { animation-delay: 0.2s; }
  .service-card:nth-child(3) { animation-delay: 0.3s; }
  .service-card:nth-child(4) { animation-delay: 0.4s; }
  
  .stat-item:nth-child(1) { animation-delay: 0.1s; }
  .stat-item:nth-child(2) { animation-delay: 0.2s; }
  .stat-item:nth-child(3) { animation-delay: 0.3s; }
  .stat-item:nth-child(4) { animation-delay: 0.4s; }
  
  .animated {
    animation: fadeInUp 0.6s ease forwards;
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Tim
// Timeline Animation
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineItems.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Initialize timeline animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  animateTimeline();
});
