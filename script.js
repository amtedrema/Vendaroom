
// Enhanced smooth scrolling with fallback
function smoothScrollTo(target) {
    if (target && 'scrollIntoView' in target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            smoothScrollTo(target);
        });
    });
});

// Enhanced scroll-based animations with performance optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Stop observing after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key functionality can be added here if needed for future features
});

// Enhanced performance optimization with modern features
if ('IntersectionObserver' in window && 'requestAnimationFrame' in window) {
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    const icon = entry.target;
                    icon.style.animation = 'fadeInUp 0.6s ease forwards';
                    iconObserver.unobserve(icon); // Stop observing for performance
                });
            }
        });
    }, { threshold: 0.1 });
    
    document.addEventListener('DOMContentLoaded', function() {
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach(icon => {
            icon.style.opacity = '0';
            iconObserver.observe(icon);
        });
    });
}

// Add CSS animation for icon fade-in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 0.1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
