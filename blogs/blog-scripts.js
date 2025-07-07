// Blog Common JavaScript - blog-scripts.js
// Use this JS file for ALL your blog posts

document.addEventListener('DOMContentLoaded', function() {

    // ====== BACK TO TOP FUNCTIONALITY ======
    const backToTopButton = document.getElementById('backToTop');

    // Show/hide back to top button based on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 200) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ====== SHARE FUNCTIONALITY ======
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const url = window.location.href;
            const title = document.querySelector('.article-title').textContent;
            const description = document.querySelector('.article-subtitle')?.textContent || '';

            if (this.classList.contains('twitter')) {
                shareOnTwitter(url, title);
            } else if (this.classList.contains('linkedin')) {
                shareOnLinkedIn(url, title, description);
            } else if (this.classList.contains('facebook')) {
                shareOnFacebook(url);
            } else if (this.classList.contains('copy-link')) {
                copyToClipboard(url);
            }
        });
    });

    // ====== NEWSLETTER FORM ======
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            // Replace this with your actual newsletter signup logic
            handleNewsletterSignup(email);
        });
    }

    // ====== SMOOTH SCROLLING FOR ANCHOR LINKS ======
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ====== READING PROGRESS INDICATOR ======
    createReadingProgress();

    // ====== TABLE OF CONTENTS AUTO-GENERATION ======
    generateTableOfContents();
});

// ====== SHARE FUNCTIONS ======
function shareOnTwitter(url, title) {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
}

function shareOnLinkedIn(url, title, description) {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
}

function shareOnFacebook(url) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success message
        showNotification('Link copied to clipboard!', 'success');
    }).catch(function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        showNotification('Link copied to clipboard!', 'success');
    });
}

// ====== NOTIFICATION SYSTEM ======
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ====== READING PROGRESS INDICATOR ======
function createReadingProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-blue, #1347cc);
        z-index: 10000;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const article = document.querySelector('.article-content');
        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;

        const articleBottom = articleTop + articleHeight;
        const windowBottom = scrollTop + windowHeight;

        if (scrollTop >= articleTop && scrollTop <= articleBottom) {
            const progress = ((scrollTop - articleTop) / (articleHeight - windowHeight)) * 100;
            progressBar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
        }
    });
}

// ====== AUTO TABLE OF CONTENTS ======
function generateTableOfContents() {
    const tocContainer = document.querySelector('#table-of-contents');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    if (headings.length === 0) return;

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }

        const listItem = document.createElement('li');
        listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = 'toc-link';

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
}

// ====== LAZY LOADING FOR IMAGES ======
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
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
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ====== CODE SYNTAX HIGHLIGHTING ======
// This will work if you include Prism.js in your HTML
function initCodeHighlighting() {
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// ====== COPY CODE BUTTON ======
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentNode;

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.textContent = 'Copy';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #6c757d;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;

        // Style the pre element
        pre.style.position = 'relative';

        copyButton.addEventListener('click', function() {
            const code = codeBlock.textContent;
            copyToClipboard(code);

            // Change button text temporarily
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = 'Copy';
            }, 2000);
        });

        copyButton.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
        });

        copyButton.addEventListener('mouseleave', function() {
            this.style.opacity = '0.7';
        });

        pre.appendChild(copyButton);
    });
}

// ====== SEARCH FUNCTIONALITY (OPTIONAL) ======
function initSearch() {
    const searchInput = document.querySelector('#blog-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const content = document.querySelector('.article-content');

        if (query.length < 3) {
            // Remove existing highlights
            removeHighlights(content);
            return;
        }

        // Remove existing highlights
        removeHighlights(content);

        // Highlight matching text
        highlightText(content, query);
    });
}

function highlightText(element, query) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;

    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${query})`, 'gi');

        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            const span = document.createElement('span');
            span.innerHTML = highlightedText;
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
}

function removeHighlights(element) {
    const highlights = element.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// ====== ESTIMATED READ TIME CALCULATOR ======
function calculateReadTime() {
    const content = document.querySelector('.article-content');
    const readTimeElement = document.querySelector('.read-time');

    if (!content || !readTimeElement) return;

    const text = content.textContent;
    const wordsPerMinute = 200; // Average reading speed
    const words = text.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);

    // Update the read time display
    const readTimeText = readTimeElement.textContent;
    if (readTimeText.includes('min read')) {
        readTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readTime} min read`;
    }
}

// ====== INITIALIZE ADDITIONAL FEATURES ======
// Call these functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features
    initLazyLoading();
    initCodeHighlighting();
    addCopyButtonsToCodeBlocks();
    initSearch();
    calculateReadTime();
});

// ====== UTILITY FUNCTIONS ======

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Format date utility
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ====== ANALYTICS TRACKING (OPTIONAL) ======
function trackEvent(category, action, label) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }

    // Console log for debugging
    console.log('Event tracked:', { category, action, label });
}

// Track social shares
document.addEventListener('click', function(e) {
    if (e.target.matches('.share-btn')) {
        const platform = e.target.className.split(' ').find(cls => 
            ['twitter', 'linkedin', 'facebook', 'copy-link'].includes(cls)
        );
        trackEvent('Social Share', 'click', platform);
    }
});

// ====== PERFORMANCE MONITORING ======
// Monitor Core Web Vitals
function measureWebVitals() {
    // This requires the web-vitals library
    // Include: <script src="https://unpkg.com/web-vitals@3/dist/web-vitals.umd.js"></script>

    if (typeof webVitals !== 'undefined') {
        webVitals.getCLS(console.log);
        webVitals.getFID(console.log);
        webVitals.getFCP(console.log);
        webVitals.getLCP(console.log);
        webVitals.getTTFB(console.log);
    }
}

// ====== ACCESSIBILITY IMPROVEMENTS ======
function improveAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        transition: top 0.3s;
        z-index: 10000;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content ID
    const mainContent = document.querySelector('.article-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', improveAccessibility);