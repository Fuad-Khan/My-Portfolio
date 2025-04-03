export function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    document.querySelectorAll('.section').forEach(section => {
        fadeUpObserver.observe(section);
    });

    // Animate skill bars
    const skillBarsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.querySelector('.skill-level');
                const width = skillLevel.style.width;
                skillLevel.style.width = '0';
                setTimeout(() => {
                    skillLevel.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(item => {
        skillBarsObserver.observe(item);
    });
}