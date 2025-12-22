// Main JavaScript for AI Solutions Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormValidation();
});

// Navigation functionality
function initNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            // Force display for mobile
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.display = 'block';
            } else {
                mobileMenu.style.display = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow on scroll
        if (scrollTop > 10) {
            navbar.classList.add('shadow-xl');
        } else {
            navbar.classList.remove('shadow-xl');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.bg-white, .bg-gray-50, .bg-royal-blue');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Form validation - Disabled to prevent duplicate handling with forms.js
function initFormValidation() {
    // Form handling is now managed by forms.js to prevent duplicates
    // This function is kept for compatibility but does nothing
    console.log('Form validation initialized by forms.js');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    
    input.classList.add('border-red-500');
    input.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(input) {
    input.classList.remove('border-red-500');
    const errorDiv = input.parentNode.querySelector('.text-red-500');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Submit contact form
async function submitContactForm(data) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    try {
        // Simulate form submission for static site
        await simulateFormSubmission(data);
        
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        document.getElementById('contact-form').reset();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Simulate form submission
async function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Form submitted with data:', data);
            
            // Check if required fields are filled
            if (!data.name || !data.email || !data.jobDetails) {
                reject(new Error('Required fields missing'));
                return;
            }
            
            // Store in localStorage for admin panel
            storeInquiry(data);
            
            // Simulate success
            resolve();
        }, 1500);
    });
}

// Store inquiry in localStorage - Disabled to prevent duplicates with forms.js
function storeInquiry(data) {
    // This function is disabled to prevent duplicate handling with forms.js
    console.log('Store inquiry handled by forms.js');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();
