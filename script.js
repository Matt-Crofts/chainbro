/**
 * Chain Brothers - Interactive Script
 * Implements parallax scrolling and smooth navigation
 */

(function() {
    'use strict';

    // ===================================
    // Detect Reduced Motion Preference
    // ===================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ===================================
    // Parallax Effect
    // ===================================
    
    /**
     * Applies parallax effect to elements with data-depth attribute
     * Elements move at different speeds based on their depth value
     */
    function initParallax() {
        // Skip parallax if user prefers reduced motion
        if (prefersReducedMotion) {
            console.log('Parallax disabled: user prefers reduced motion');
            return;
        }

        const parallaxElements = document.querySelectorAll('[data-depth]');
        
        if (parallaxElements.length === 0) {
            return;
        }

        let ticking = false;
        let lastScrollY = window.scrollY;

        /**
         * Calculate and apply parallax transforms
         */
        function updateParallax() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            parallaxElements.forEach(element => {
                const depth = parseFloat(element.getAttribute('data-depth')) || 0;
                const elementTop = element.getBoundingClientRect().top + scrollY;
                const elementHeight = element.offsetHeight;
                
                // Calculate if element is in viewport or near it
                const isInViewport = (
                    elementTop < scrollY + windowHeight + 200 &&
                    elementTop + elementHeight > scrollY - 200
                );

                if (isInViewport) {
                    // Calculate parallax offset
                    // Negative depth moves slower (background layers)
                    // Positive depth moves faster (foreground elements)
                    const offset = (scrollY - elementTop + windowHeight / 2) * depth;
                    
                    // Apply transform using GPU-accelerated properties
                    element.style.transform = `translate3d(0, ${offset}px, 0)`;
                }
            });

            ticking = false;
        }

        /**
         * Request animation frame for smooth performance
         */
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        // Listen to scroll events
        window.addEventListener('scroll', requestTick, { passive: true });

        // Initial calculation
        updateParallax();

        // Recalculate on resize (debounced)
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateParallax, 150);
        }, { passive: true });
    }

    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    
    /**
     * Enables smooth scrolling for internal anchor links
     */
    function initSmoothScroll() {
        // Get all anchor links that point to internal sections
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Skip if it's just "#" without a target
                if (targetId === '#' || targetId === '#!') {
                    return;
                }

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // Use native smooth scroll if available and motion not reduced
                    if ('scrollBehavior' in document.documentElement.style && !prefersReducedMotion) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        // Fallback to instant scroll
                        targetElement.scrollIntoView({
                            block: 'start'
                        });
                    }

                    // Update URL hash without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }

                    // Focus the target element for accessibility
                    targetElement.focus({ preventScroll: true });
                }
            });
        });
    }

    // ===================================
    // Button Hover Effects Enhancement
    // ===================================
    
    /**
     * Adds subtle interaction feedback to buttons
     */
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            // Add ripple effect on click (optional enhancement)
            button.addEventListener('click', function(e) {
                // Add a subtle scale feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // ===================================
    // Card Hover Tilt Effect (Optional)
    // ===================================
    
    /**
     * Adds subtle tilt effect to cards on mouse move
     * Only applies on desktop devices
     */
    function initCardTilt() {
        // Skip on mobile or if motion is reduced
        if (prefersReducedMotion || window.innerWidth < 768) {
            return;
        }

        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ===================================
    // Intersection Observer for Fade-in Animations
    // ===================================
    
    /**
     * Adds fade-in effect when elements come into view
     */
    function initScrollAnimations() {
        // Skip if motion is reduced
        if (prefersReducedMotion) {
            return;
        }

        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe cards and principle items
        const animatedElements = document.querySelectorAll('.card, .principle-item, .future-content');
        
        animatedElements.forEach((element, index) => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(element);
        });
    }

    // ===================================
    // Initialize All Features
    // ===================================
    
    /**
     * Initialize all interactive features when DOM is ready
     */
    function init() {
        console.log('Chain Brothers site initialized');
        
        initParallax();
        initSmoothScroll();
        initButtonEffects();
        initCardTilt();
        initScrollAnimations();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

