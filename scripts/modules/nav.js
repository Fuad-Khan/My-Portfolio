// scripts/modules/nav.js
export function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Mobile menu toggle
    function toggleMenu() {
        navLinks.classList.toggle('active');
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
        document.dispatchEvent(new Event('themeChanged'));
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

    // Initialize
    checkTheme();
    
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkMode') === null) {
            e.matches ? html.classList.add('dark-mode') : html.classList.remove('dark-mode');
        }
    });
}