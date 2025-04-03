import { initMobileMenu } from './modules/nav.js';
import { initAnimations } from './modules/animations.js';
import { initFormHandler } from './modules/formHandler.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAnimations();
    initFormHandler();
});

