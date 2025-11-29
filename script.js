// Simple Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

// Toggle mobile menu
function toggleMenu() {
  if (nav && burger) {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }
}

// Initialize mobile menu
if (burger && nav) {
  burger.addEventListener('click', toggleMenu);

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !burger.contains(e.target)) {
      nav.classList.remove('active');
      burger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Close menu on window resize if it becomes desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      nav.classList.remove('active');
      burger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

// Form Submission
const form = document.getElementById('messageForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && message) {
      // In a real application, you would send this data to a server
      alert(`Thank you ${name}! Your message has been sent successfully. We'll get back to you soon.`);

      // Reset form
      form.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Don't prevent default for dropdown links
    if (this.nextElementSibling &&
      (this.nextElementSibling.classList.contains('dropdown-menu') ||
        this.nextElementSibling.classList.contains('dropdown-menu-sub'))) {
      return;
    }

    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Timeline Animation
function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  timelineItems.forEach(item => {
    observer.observe(item);
  });
}

// Resources Page Functionality
function initResourcesPage() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Tab click handlers
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      const tabContent = document.getElementById(tabId);
      if (tabContent) {
        tabContent.classList.add('active');
        // Load content if not already loaded
        loadTabContent(tabId);
      }
    });
  });

  // Load tab content function
  function loadTabContent(tabId) {
    const tabContent = document.getElementById(tabId);

    // Only load if content is empty
    if (!tabContent || tabContent.children.length > 0) return;

    let content = '';

    switch (tabId) {
      case 'quran-tab':
        content = `
          <div class="tab-content-inner">
            <div class="tab-header">
              <h2>Quran Resources</h2>
              <p>Explore the Holy Quran with translations and tafsir</p>
            </div>
            <div class="resource-grid">
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-quran"></i>
                </div>
                <h3>Quran with Translations</h3>
                <p>Read the Quran in Arabic with Amharic and English translations</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">Read Online</a>
                  <a href="#" class="btn btn-outline">Download PDF</a>
                </div>
              </div>
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-volume-up"></i>
                </div>
                <h3>Audio Recitations</h3>
                <p>Listen to beautiful Quran recitations by famous reciters</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">Listen Now</a>
                </div>
              </div>
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-book-reader"></i>
                </div>
                <h3>Tafsir</h3>
                <p>Detailed explanations and interpretations of the Quran</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">Read Tafsir</a>
                </div>
              </div>
            </div>
          </div>`;
        break;

      case 'hadith-tab':
        content = `
          <div class="tab-content-inner">
            <div class="tab-header">
              <h2>Hadith Collections</h2>
              <p>Authentic hadith collections with translations and explanations</p>
            </div>
            <div class="resource-grid">
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-book"></i>
                </div>
                <h3>Sahih al-Bukhari</h3>
                <p>Complete collection with Amharic and English translations</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">Read Online</a>
                  <a href="#" class="btn btn-outline">Download PDF</a>
                </div>
              </div>
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-book"></i>
                </div>
                <h3>Sahih Muslim</h3>
                <p>Complete collection with Amharic and English translations</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">Read Online</a>
                  <a href="#" class="btn btn-outline">Download PDF</a>
                </div>
              </div>
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-headphones"></i>
                </div>
                <h3>Audio Hadith</h3>
                <p>Listen to hadith with explanations in Amharic</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">Listen Now</a>
                  <a href="#" class="btn btn-outline">Download</a>
                </div>
              </div>
            </div>
          </div>`;
        break;

      case 'fiqh-tab':
        content = `
          <div class="tab-content-inner">
            <div class="tab-header">
              <h2>Fiqh Resources</h2>
              <p>Islamic jurisprudence and legal rulings</p>
            </div>
            <div class="resource-grid">
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-mosque"></i>
                </div>
                <h3>Prayer Guide</h3>
                <p>Complete guide to Islamic prayer with illustrations</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">View Guide</a>
                </div>
              </div>
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-moon"></i>
                </div>
                <h3>Fasting & Ramadan</h3>
                <p>Rules and guidelines for fasting and Ramadan</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">Learn More</a>
                </div>
              </div>
              <div class="resource-card">
                <div class="resource-icon">
                  <i class="fas fa-hands-helping"></i>
                </div>
                <h3>Zakat & Charity</h3>
                <p>Guide to Zakat calculation and distribution</p>
                <div class="resource-actions">
                  <a href="#" class="btn btn-outline">Calculate Zakat</a>
                </div>
              </div>
            </div>
          </div>`;
        break;

      default:
        content = '<div class="no-content">Content coming soon...</div>';
    }

    tabContent.innerHTML = content;
  }

  // Search functionality
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const searchTerm = this.querySelector('.search-input').value.trim();
      if (searchTerm) {
        // Implement search functionality here
        console.log('Searching for:', searchTerm);
        // You can add AJAX call or filter content based on search term
      }
    });
  }

  // Quick links smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  // Toggle navigation
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });

    // Burger animation
    burger.classList.toggle('toggle');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (nav.classList.contains('nav-active')) {
          nav.classList.remove('nav-active');
          burger.classList.remove('toggle');
          navLinks.forEach(link => {
            link.style.animation = '';
          });
        }
      }
    });
  });

  // Add active class to current section in navigation
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('messageForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Simulate form submission (replace with actual AJAX call)
      setTimeout(() => {
        // Reset form
        this.reset();

        // Show success message
        showNotification('Message sent successfully! We will get back to you soon.', 'success');

        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1500);
    });
  }

  // Show notification function
  function showNotification(message, type = 'success') {
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

    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Auto remove notification after 5 seconds
    const removeTimer = setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      clearTimeout(removeTimer);
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
  }

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.contact-card, .branch-card, .form-header, .section-header');

    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize animation
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load

  // Add animation styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .contact-card, .branch-card, .form-header, .section-header {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #2ecc71;
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 350px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      transform: translateX(120%);
      transition: transform 0.3s ease-in-out;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification.error {
      background: #e74c3c;
    }
    
    .notification .notification-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .notification-close {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      margin-left: 15px;
      padding: 0 5px;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    
    .notification-close:hover {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // Initialize timeline animation if on the Who We Are page
  if (document.querySelector('.timeline-item')) {
    animateTimeline();
  }

  // Add smooth scroll to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && !href.startsWith('#')) return;

      e.preventDefault();

      const targetId = href === '#' ? 'body' : href;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add scroll event for header shadow and animate elements on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      burger.classList.remove('active');

      // Close any open dropdowns
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  }
});

// Add animation to elements when they come into view
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section, .stat-item, .service-card, .project-card, .news-card, .region-card').forEach(section => {
  observer.observe(section);
});

// Add animation classes to CSS
const style = document.createElement('style');
style.innerHTML = `
    .animated {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card.animated,
    .project-card.animated,
    .news-card.animated,
    .region-card.animated {
        animation-duration: 0.5s;
    }
    
    .service-card.animated:nth-child(1) { animation-delay: 0.1s; }
    .service-card.animated:nth-child(2) { animation-delay: 0.2s; }
    .service-card.animated:nth-child(3) { animation-delay: 0.3s; }
    .service-card.animated:nth-child(4) { animation-delay: 0.4s; }
    
    .project-card.animated:nth-child(1) { animation-delay: 0.1s; }
    .project-card.animated:nth-child(2) { animation-delay: 0.2s; }
    .project-card.animated:nth-child(3) { animation-delay: 0.3s; }
    .project-card.animated:nth-child(4) { animation-delay: 0.4s; }
    
    .news-card.animated:nth-child(1) { animation-delay: 0.1s; }
    .news-card.animated:nth-child(2) { animation-delay: 0.2s; }
    .news-card.animated:nth-child(3) { animation-delay: 0.3s; }
    
    .region-card.animated:nth-child(1) { animation-delay: 0.1s; }
    .region-card.animated:nth-child(2) { animation-delay: 0.2s; }
    .region-card.animated:nth-child(3) { animation-delay: 0.3s; }
    .region-card.animated:nth-child(4) { animation-delay: 0.4s; }
    .region-card.animated:nth-child(5) { animation-delay: 0.5s; }
    .region-card.animated:nth-child(6) { animation-delay: 0.6s; }
`;
document.head.appendChild(style);

// Add hover effects for project images
document.querySelectorAll('.project-image').forEach(imageContainer => {
  const img = imageContainer.querySelector('img');
  const overlay = imageContainer.querySelector('.project-overlay');

  imageContainer.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.05)';
    overlay.style.opacity = '1';
  });

  imageContainer.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    overlay.style.opacity = '0';
  });
});

// Add hover effects for news images
document.querySelectorAll('.news-image').forEach(imageContainer => {
  const img = imageContainer.querySelector('img');

  imageContainer.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.05)';
  });

  imageContainer.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
  });
});