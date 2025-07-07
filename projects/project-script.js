// Project Details JavaScript - Common for all projects

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            body.classList.toggle('nav-open');

            // Update hamburger icon
            const icon = mobileNavToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile nav when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            body.classList.remove('nav-open');

            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    }

    // Close mobile nav when clicking nav links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                body.classList.remove('nav-open');

                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
        }

        lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .tech-category, .insight-card, .overview-main, .project-stats');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .tech-category, .insight-card, .overview-main, .project-stats {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
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

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-blue);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 50;
    `;
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-blue);
        z-index: 101;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    // Update progress bar
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Copy to clipboard functionality for code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        `;

        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(copyBtn);

        copyBtn.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close mobile nav with Escape key
        if (e.key === 'Escape') {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                body.classList.remove('nav-open');

                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Handle external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    externalLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            body.classList.remove('nav-open');

            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Performance optimization: Debounce scroll events
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

    // Apply debouncing to scroll events
    const debouncedScroll = debounce(function() {
        // Any heavy scroll operations can go here
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Error handling for external embeds
    const externalEmbeds = document.querySelectorAll('iframe, object, embed');
    externalEmbeds.forEach(embed => {
        embed.addEventListener('error', function() {
            const errorMsg = document.createElement('div');
            errorMsg.innerHTML = `
                <div style="
                    padding: 2rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                    text-align: center;
                    color: #6c757d;
                    border: 2px dashed #dee2e6;
                ">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Unable to load external content. Please check your internet connection or try again later.</p>
                </div>
            `;
            embed.parentNode.replaceChild(errorMsg, embed);
        });
    });

    // Initialize tooltips for tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.querySelector('span').textContent;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.8rem;
                z-index: 1000;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            this.style.position = 'relative';
            this.appendChild(tooltip);

            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 100);
        });

        item.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Console easter egg
    console.log('%c👋 Hello there!', 'font-size: 20px; color: #1347cc; font-weight: bold;');
    console.log('%cThanks for checking out my project! If you have any questions or want to collaborate, feel free to reach out.', 'font-size: 14px; color: #6c757d;');
    console.log('%c🚀 Let\'s build something amazing together!', 'font-size: 16px; color: #ff6b6b; font-weight: bold;');
});

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function getTimeAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

// Export functions for use in other scripts
window.ProjectUtils = {
    formatNumber,
    getTimeAgo
};