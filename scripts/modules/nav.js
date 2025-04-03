// scripts/modules/nav.js
export function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    function toggleMenu() {
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        document.body.classList.toggle('no-scroll');
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Theme toggle functionality
    function toggleTheme() {
        html.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDark = html.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { isDarkMode: isDark }
        }));
        
        // Add animation class
        themeToggle.classList.add('theme-change');
        setTimeout(() => {
            themeToggle.classList.remove('theme-change');
        }, 300);
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Check for saved theme preference
    function checkTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'true' || (savedTheme === null && systemPrefersDark)) {
            html.classList.add('dark-mode');
        }
    }

    // Handle scroll effects
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Initialize
    checkTheme();
    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            e.matches ? html.classList.add('dark-mode') : html.classList.remove('dark-mode');
            document.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { isDarkMode: e.matches }
            }));
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle')) {
            toggleMenu();
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Close menu on ESC
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
            menuToggle.focus();
        }
        
        // Handle tab navigation when menu is open
        if (navLinks.classList.contains('active') && e.key === 'Tab') {
            const focusableElements = navLinks.querySelectorAll('a[href], button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}