document.addEventListener('DOMContentLoaded', () => {
    const headerHTML = `
    <div class="top-bar">
        <div class="container">
            <div class="contact-info">
                <span>Call Us: 001-251-114-664-941</span>
                <span><a href="mailto:info@ethiopianmajlis.org.et">info@ethiopianmajlis.org.et</a></span>
            </div>
            <div class="top-bar-right">
                <div class="language-selector">
                    <div class="language-dropdown">
                        <button class="language-btn" aria-label="Select Language">
                            <i class="fas fa-globe"></i>
                            <span class="current-lang">English</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <ul class="language-menu">
                            <li><a href="#" data-lang="en" class="lang-option active">English</a></li>
                            <li><a href="#" data-lang="ar" class="lang-option">العربية</a></li>
                            <li><a href="#" data-lang="om" class="lang-option">Afaan Oromoo</a></li>
                            <li><a href="#" data-lang="am" class="lang-option">አማርኛ</a></li>
                            <li><a href="#" data-lang="so" class="lang-option">Af-Soomaali</a></li>
                        </ul>
                    </div>
                </div>
                <a href="donate.html" class="donate-btn">Donate</a>
            </div>
        </div>
    </div>
    <div class="main-header">
        <div class="container">
            <div class="logo">
                <a href="index.html">
                    <img src="assets/wp-content/uploads/2023/05/የኢትዮጵያ_እስልምናlogo-414-removebg-preview.png"
                        alt="Ethiopian Islamic Affairs Supreme Council Logo" class="logo-img">
                </a>
            </div>

            <!-- Hamburger Menu -->
            <div class="burger">
                <div class="burger-line"></div>
                <div class="burger-line"></div>
                <div class="burger-line"></div>
            </div>

            <nav class="main-nav">
                <ul class="nav-links">
                    <li><a href="index.html" class="nav-link">Home</a></li>
                    <li class="dropdown">
                        <a href="who-we-are.html" class="nav-link">About Us <i class="dropdown-arrow">▼</i></a>
                        <ul class="dropdown-menu">
                            <li><a href="who-we-are.html">Who We Are</a></li>
                            <li><a href="mission-and-vision.html">Mission and Vision</a></li>
                            <li><a href="leadership.html">Leadership</a></li>
                            <li><a href="past-leadership.html">History</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="services.html" class="nav-link">Services <i class="dropdown-arrow">▼</i></a>
                        <ul class="dropdown-menu">
                            <li><a href="accreditation.html">Accreditation</a></li>
                            <li><a href="community-registration.html">Community Registration</a></li>
                            <li><a href="halal-certification.html">Halal Certification</a></li>
                            <li><a href="hajj-and-umrah.html">Hajj and Umrah</a></li>
                        </ul>
                    </li>
                    <li><a href="news.html" class="nav-link">News</a></li>
                    <li><a href="regional-majlis.html" class="nav-link">Regional Majlis</a></li>
                    <li><a href="islamic-heritage.html" class="nav-link">Resources</a></li>
                    <li><a href="women-and-youth.html" class="nav-link">Women and Youth</a></li>
                    <li><a href="contact-us.html" class="nav-link">Contact</a></li>
                </ul>
            </nav>
        </div>
    </div>

    <!-- Mobile Navigation Backdrop -->
    <div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-nav" id="mobileNav">
        <div class="mobile-nav-header">
            <div class="mobile-nav-logo">
                <img src="assets/wp-content/uploads/2023/05/የኢትዮጵያ_እስልምናlogo-414-removebg-preview.png"
                    alt="Ethiopian Islamic Affairs Supreme Council Logo">
                <span style="color: var(--primary-color); font-weight: 600;">EIASC</span>
            </div>
            <button class="mobile-nav-close" id="mobileNavClose">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="mobile-nav-content">
            <!-- Language Selector in Mobile Menu -->
            <div class="mobile-language-selector">
                <div class="mobile-language-dropdown">
                    <button class="mobile-language-btn" aria-label="Select Language">
                        <i class="fas fa-globe"></i>
                        <span class="mobile-current-lang">English</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <ul class="mobile-language-menu">
                        <li><a href="#" data-lang="en" class="mobile-lang-option active">English</a></li>
                        <li><a href="#" data-lang="ar" class="mobile-lang-option">العربية</a></li>
                        <li><a href="#" data-lang="om" class="mobile-lang-option">Afaan Oromoo</a></li>
                        <li><a href="#" data-lang="am" class="mobile-lang-option">አማርኛ</a></li>
                        <li><a href="#" data-lang="so" class="mobile-lang-option">Af-Soomaali</a></li>
                    </ul>
                </div>
            </div>
            
            <ul class="mobile-nav-links">
                <li><a href="index.html" class="mobile-nav-link">Home</a></li>
                <li class="mobile-dropdown">
                    <a href="#" class="mobile-nav-link">
                        About Us <i class="fas fa-chevron-down mobile-dropdown-arrow"></i>
                    </a>
                    <div class="mobile-dropdown-menu">
                        <a href="who-we-are.html">Who We Are</a>
                        <a href="mission-and-vision.html">Mission and Vision</a>
                        <a href="leadership.html">Leadership</a>
                        <a href="past-leadership.html">History</a>
                    </div>
                </li>
                <li class="mobile-dropdown">
                    <a href="#" class="mobile-nav-link">
                        Services <i class="fas fa-chevron-down mobile-dropdown-arrow"></i>
                    </a>
                    <div class="mobile-dropdown-menu">
                        <a href="accreditation.html">Accreditation</a>
                        <a href="community-registration.html">Community Registration</a>
                        <a href="halal-certification.html">Halal Certification</a>
                        <a href="hajj-and-umrah.html">Hajj and Umrah</a>
                    </div>
                </li>
                <li><a href="news.html" class="mobile-nav-link">News</a></li>
                <li><a href="regional-majlis.html" class="mobile-nav-link">Regional Majlis</a></li>
                <li><a href="islamic-heritage.html" class="mobile-nav-link">Resources</a></li>
                <li><a href="women-and-youth.html" class="mobile-nav-link">Women and Youth</a></li>
                <li><a href="contact-us.html" class="mobile-nav-link">Contact</a></li>
            </ul>
        </div>
    </div>
    `;

    // Inject header content
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }

    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            // If it's in a dropdown, highlight the parent
            const parentDropdown = link.closest('.dropdown, .mobile-dropdown');
            if (parentDropdown) {
                const parentLink = parentDropdown.querySelector('.nav-link, .mobile-nav-link');
                if (parentLink) parentLink.classList.add('active');
            }
        }
    });

    // Mobile Menu Logic
    const burger = document.querySelector('.burger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const body = document.body;

    function openMenu() {
        burger.classList.add('active');
        mobileNav.classList.add('active');
        mobileNavBackdrop.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeMenu() {
        burger.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavBackdrop.classList.remove('active');
        body.style.overflow = '';
    }

    function toggleMenu() {
        if (mobileNav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    if (mobileNavBackdrop) {
        mobileNavBackdrop.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on non-dropdown links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        if (!link.closest('.mobile-dropdown')) {
            link.addEventListener('click', closeMenu);
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Mobile Dropdown Logic
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.mobile-nav-link');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');

                // Close other dropdowns
                mobileDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            });
        }
    });

    // Language Selector Logic (Top Bar)
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangSpan = document.querySelector('.current-lang');

    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        // Close language dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });

        // Language selection
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Remove active class from all options
                langOptions.forEach(opt => opt.classList.remove('active'));

                // Add active class to selected option
                option.classList.add('active');

                // Update current language display
                const selectedLang = option.getAttribute('data-lang');
                const langText = option.textContent;

                if (currentLangSpan) {
                    currentLangSpan.textContent = langText;
                }

                // Store language preference
                try {
                    localStorage.setItem('selectedLanguage', selectedLang);
                } catch (error) {
                    console.warn('Could not save language preference:', error);
                }

                // Close dropdown
                languageDropdown.classList.remove('active');

                // Show notification (if function exists)
                if (typeof showNotification === 'function') {
                    showNotification(`Language changed to ${langText}`, 'success');
                }
            });
        });

        // Load saved language preference
        try {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                const savedOption = document.querySelector(`[data-lang="${savedLanguage}"]`);
                if (savedOption && currentLangSpan) {
                    savedOption.classList.add('active');
                    currentLangSpan.textContent = savedOption.textContent;
                }
            }
        } catch (error) {
            console.warn('Could not load saved language preference:', error);
        }
    }

    // Mobile Language Selector Logic
    const mobileLanguageBtn = document.querySelector('.mobile-language-btn');
    const mobileLanguageDropdown = document.querySelector('.mobile-language-dropdown');
    const mobileLangOptions = document.querySelectorAll('.mobile-lang-option');
    const mobileCurrentLangSpan = document.querySelector('.mobile-current-lang');

    if (mobileLanguageBtn && mobileLanguageDropdown) {
        mobileLanguageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileLanguageDropdown.classList.toggle('active');
        });

        // Mobile language selection
        mobileLangOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Remove active class from all options
                mobileLangOptions.forEach(opt => opt.classList.remove('active'));
                langOptions.forEach(opt => opt.classList.remove('active'));

                // Add active class to selected option
                option.classList.add('active');

                // Update current language display
                const selectedLang = option.getAttribute('data-lang');
                const langText = option.textContent;

                if (mobileCurrentLangSpan) {
                    mobileCurrentLangSpan.textContent = langText;
                }
                if (currentLangSpan) {
                    currentLangSpan.textContent = langText;
                }

                // Update desktop language selector
                const desktopOption = document.querySelector(`.lang-option[data-lang="${selectedLang}"]`);
                if (desktopOption) {
                    desktopOption.classList.add('active');
                }

                // Store language preference
                try {
                    localStorage.setItem('selectedLanguage', selectedLang);
                } catch (error) {
                    console.warn('Could not save language preference:', error);
                }

                // Close dropdown
                mobileLanguageDropdown.classList.remove('active');

                // Show notification (if function exists)
                if (typeof showNotification === 'function') {
                    showNotification(`Language changed to ${langText}`, 'success');
                }
            });
        });

        // Load saved language preference for mobile
        try {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                const savedMobileOption = document.querySelector(`.mobile-lang-option[data-lang="${savedLanguage}"]`);
                if (savedMobileOption && mobileCurrentLangSpan) {
                    savedMobileOption.classList.add('active');
                    mobileCurrentLangSpan.textContent = savedMobileOption.textContent;
                }
            }
        } catch (error) {
            console.warn('Could not load saved language preference:', error);
        }
    }
});
