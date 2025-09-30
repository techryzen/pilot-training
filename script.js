// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initNavigation();
    initMobileMenu();
    initFormHandling();
    initSmoothScrolling();
    initParallaxEffects();
    initCounterAnimations();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to elements
    addAnimationClasses();
}

function addAnimationClasses() {
    // Add fade-in animation to course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add slide-in animations to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add fade-in to about cards
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.3}s`;
    });

    // Add fade-in to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.classList.add('slide-in-left');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add slide-in to contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('slide-in-right');
    }
}

// Navigation Functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const floatingPlanes = document.querySelectorAll('.floating-plane');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingPlanes.forEach((plane, index) => {
            const speed = 0.5 + (index * 0.2);
            plane.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.01}deg)`;
        });
    });

    // Cockpit display animation
    animateCockpitDisplay();
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const suffix = element.textContent.includes('%') ? '%' : '+';
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Cockpit Display Animation
function animateCockpitDisplay() {
    const altitudeValue = document.querySelector('.altitude-indicator .value');
    const speedValue = document.querySelector('.speed-indicator .value');
    const headingValue = document.querySelector('.heading-indicator .value');
    
    if (altitudeValue && speedValue && headingValue) {
        setInterval(() => {
            // Simulate changing values
            const altitude = 35000 + Math.floor(Math.random() * 1000 - 500);
            const speed = 450 + Math.floor(Math.random() * 50 - 25);
            const heading = Math.floor(Math.random() * 360);
            
            altitudeValue.textContent = `${altitude.toLocaleString()} ft`;
            speedValue.textContent = `${speed} kts`;
            headingValue.textContent = `${heading}°`;
        }, 3000);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        padding: 20px;
        color: white;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    `;
    
    if (type === 'success') {
        notification.style.borderColor = '#10b981';
    } else if (type === 'error') {
        notification.style.borderColor = '#ef4444';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Button Click Effects
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .btn-primary, .btn-secondary, .cta-button, .course-btn, .submit-btn')) {
        createRippleEffect(e);
    }
});

function createRippleEffect(e) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Glassmorphism hover effects
function initGlassmorphismEffects() {
    const glassElements = document.querySelectorAll('.glass-morphism');
    
    glassElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.background = 'rgba(255, 255, 255, 0.15)';
            element.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.background = 'rgba(255, 255, 255, 0.1)';
            element.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize glassmorphism effects
document.addEventListener('DOMContentLoaded', initGlassmorphismEffects);

// Scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(30, 58, 138, 0.9);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-dependent functions are already called in their respective init functions
}, 16)); // ~60fps

// Flight Path Animation
document.addEventListener('DOMContentLoaded', function() {
    const aircraft = document.getElementById('aircraft');
    const milestones = document.querySelectorAll('.milestone');
    const flightTrack = document.querySelector('.flight-track');
    const trackDots = document.querySelectorAll('.track-dot');
    
    if (!aircraft || !milestones.length || !flightTrack) return;
    
    let currentStep = 0;
    
    // Initialize aircraft position
    function initializeAircraft() {
        if (milestones[0]) {
            // Calculate position based on first milestone center
            const firstMilestone = milestones[0];
            const milestoneRect = firstMilestone.getBoundingClientRect();
            const trackRect = flightTrack.getBoundingClientRect();
            const initialPosition = milestoneRect.left - trackRect.left + (milestoneRect.width / 2) - 20; // 20 is half aircraft width
            
            aircraft.style.left = `${initialPosition}px`;
            milestones[0].classList.add('active');
            if (trackDots[0]) {
                trackDots[0].classList.add('active');
            }
        }
    }
    
    // Move aircraft to specific milestone
    function moveAircraftTo(stepIndex) {
        if (stepIndex < 0 || stepIndex >= milestones.length) return;
        
        const targetMilestone = milestones[stepIndex];
        const milestoneRect = targetMilestone.getBoundingClientRect();
        const trackRect = flightTrack.getBoundingClientRect();
        const targetPosition = milestoneRect.left - trackRect.left + (milestoneRect.width / 2) - 20; // 20 is half aircraft width
        
        // Remove active class from all milestones and track dots
        milestones.forEach(m => m.classList.remove('active'));
        trackDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to target milestone and corresponding track dot
        targetMilestone.classList.add('active');
        if (trackDots[stepIndex]) {
            trackDots[stepIndex].classList.add('active');
        }
        
        // Update progress track
        flightTrack.className = `flight-track progress-${stepIndex}`;
        
        // Add flying animation to aircraft
        aircraft.classList.add('flying');
        
        // Move aircraft with smooth animation
        aircraft.style.left = `${targetPosition}px`;
        
        // Add flying effect during movement
        aircraft.style.transform = 'translateY(-50%) scale(1.1)';
        aircraft.style.filter = 'drop-shadow(0 6px 20px rgba(59, 130, 246, 0.6))';
        
        // Reset flying effect after animation
        setTimeout(() => {
            aircraft.style.transform = 'translateY(-50%)';
            aircraft.style.filter = 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))';
            aircraft.classList.remove('flying');
        }, 1500);
        
        currentStep = stepIndex;
    }
    
    // Add click event listeners to milestones and track dots
    milestones.forEach((milestone, index) => {
        milestone.addEventListener('click', function() {
            // Prevent multiple rapid clicks
            if (this.classList.contains('clicked')) return;
            
            moveAircraftTo(index);
            
            // Add click animation class
            this.classList.add('clicked');
            
            // Remove click animation class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(59, 130, 246, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                top: 50%;
                left: 50%;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        // Add hover sound effect simulation (visual feedback)
        milestone.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.3)';
            }
        });
        
        milestone.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.boxShadow = '';
            }
        });
    });
    
    // Auto-advance functionality (optional)
    function autoAdvance() {
        const nextStep = (currentStep + 1) % milestones.length;
        moveAircraftTo(nextStep);
    }
    
    // Add click event listeners to track dots
    trackDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Prevent multiple rapid clicks
            if (this.classList.contains('clicked')) return;
            
            moveAircraftTo(index);
            
            // Add click animation class
            this.classList.add('clicked');
            
            // Remove click animation class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
        });
        
        // Add hover effects for track dots
        dot.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.2)';
                this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.6)';
            }
        });
        
        dot.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Initialize on load
    initializeAircraft();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        setTimeout(() => {
            moveAircraftTo(currentStep);
        }, 100);
    });
    
    // Optional: Auto-advance every 8 seconds (uncomment to enable)
    // setInterval(() => {
    //     const currentStep = Array.from(milestones).findIndex(m => m.classList.contains('active'));
    //     const nextStep = (currentStep + 1) % milestones.length;
    //     moveAircraftTo(nextStep);
    // }, 8000);
});

// Pricing Calculator Functionality
function initPricingCalculator() {
    const customPriceElement = document.getElementById('customPrice');
    const customBtn = document.getElementById('customBtn');
    
    if (!customPriceElement || !customBtn) return;
    
    function updatePrice() {
        let totalPrice = 0;
        let selectedSubjects = [];
        
        // Get all checkboxes each time to ensure we have the latest state
        const checkboxes = document.querySelectorAll('.subject-checkbox input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalPrice += parseInt(checkbox.dataset.price);
                selectedSubjects.push(checkbox.dataset.subject);
            }
        });
        
        // Format price with commas
        const formattedPrice = totalPrice.toLocaleString('en-IN');
        customPriceElement.textContent = formattedPrice;
        
        // Update button state and text
        if (selectedSubjects.length > 0) {
            customBtn.disabled = false;
            customBtn.textContent = `Enroll in ${selectedSubjects.length} Subject${selectedSubjects.length > 1 ? 's' : ''}`;
        } else {
            customBtn.disabled = true;
            customBtn.textContent = 'Select Subjects First';
        }
        
        // Add animation to price change
        customPriceElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            customPriceElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Add click listeners to the entire label elements
    const labels = document.querySelectorAll('.subject-checkbox');
    labels.forEach(label => {
        label.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const checkbox = this.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                
                // Trigger change event
                const changeEvent = new Event('change', { bubbles: true });
                checkbox.dispatchEvent(changeEvent);
                
                updatePrice();
            }
        });
    });
    
    // Also add direct change listeners to checkboxes as backup
    const checkboxes = document.querySelectorAll('.subject-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePrice);
    });
    
    // Add click handlers for pricing buttons
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.id === 'customBtn' && this.disabled) return;
            
            let selectedItems = [];
            let totalPrice = 0;
            
            if (this.id === 'customBtn') {
                // Custom selection
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        selectedItems.push(checkbox.dataset.subject);
                        totalPrice += parseInt(checkbox.dataset.price);
                    }
                });
                
                showNotification(`Selected: ${selectedItems.join(', ')} - Total: ₹${totalPrice.toLocaleString('en-IN')}`, 'success');
            } else {
                // Complete package
                selectedItems = ['Complete CPL Package'];
                totalPrice = 150000;
                showNotification(`Selected: Complete CPL Package - Total: ₹${totalPrice.toLocaleString('en-IN')}`, 'success');
            }
            
            // Add ripple effect
            createRippleEffect(event);
        });
    });
    
    // Initialize with default state
    updatePrice();
}

// Initialize pricing calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', initPricingCalculator);

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (!contactForm) return;
    
    // Character counter for message textarea
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 500;
            charCount.textContent = currentLength;
            
            if (currentLength > maxLength) {
                charCount.style.color = '#ef4444';
                this.value = this.value.substring(0, maxLength);
                charCount.textContent = maxLength;
            } else if (currentLength > maxLength * 0.9) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = 'rgba(255, 255, 255, 0.7)';
            }
        });
    }
    
    // Form validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = field.parentNode.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        if (errorElement) {
            errorElement.textContent = '';
        }
        field.classList.remove('error');
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${getFieldLabel(fieldName)} is required.`;
        }
        
        // Specific field validations
        if (value && fieldName === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        if (value && fieldName === 'phone') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }
        
        if (value && fieldName === 'firstName' && value.length < 2) {
            isValid = false;
            errorMessage = 'First name must be at least 2 characters long.';
        }
        
        if (value && fieldName === 'lastName' && value.length < 2) {
            isValid = false;
            errorMessage = 'Last name must be at least 2 characters long.';
        }
        
        if (value && fieldName === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
        
        // Checkbox validation
        if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            isValid = false;
            errorMessage = 'You must agree to the terms and conditions.';
        }
        
        // Display error
        if (!isValid && errorElement) {
            errorElement.textContent = errorMessage;
            field.classList.add('error');
        }
        
        return isValid;
    }
    
    function getFieldLabel(fieldName) {
        const labels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email Address',
            phone: 'Phone Number',
            message: 'Message',
            terms: 'Terms and Conditions'
        };
        return labels[fieldName] || fieldName;
    }
    
    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
             showContactNotification('Please correct the errors in the form.', 'error');
             return;
         }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        
        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission();
            
            // Show success state
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Show success notification
             showContactNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        } catch (error) {
             console.error('Form submission error:', error);
             showContactNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// Simulate form submission (replace with actual API integration)
function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve();
            } else {
                reject(new Error('Network error'));
            }
        }, 2000); // 2 second delay to show loading state
    });
}

// Reset contact form function (called from success screen)
function resetContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        // Reset form
        contactForm.reset();
        
        // Clear all error messages
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.textContent = '');
        
        // Remove error classes
        const errorFields = contactForm.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        // Reset character counter
        const charCount = document.getElementById('charCount');
        if (charCount) {
            charCount.textContent = '0';
            charCount.style.color = 'rgba(255, 255, 255, 0.7)';
        }
        
        // Reset button state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Show form, hide success
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        
        // Scroll to form
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Enhanced notification system for contact form
function showContactNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.contact-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `contact-notification contact-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${getNotificationIcon(type)}
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
    `;
    
    notification.querySelector('.notification-icon').style.cssText = `
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    `;
    
    notification.querySelector('.notification-message').style.cssText = `
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"></polyline></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    return colors[type] || colors.info;
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactForm);

// Floating Chatbot Popup Functionality
class ChatbotPopup {
    constructor() {
        // API Configuration - using new valid API key
        this.apiKey = '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';
        this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        this.model = 'x-ai/grok-4-fast:free';
        this.siteUrl = 'https://techryzen.github.io/pilot-training/';
        this.siteName = 'CodeGPT Chatbot';
        this.maxTokens = 2000;
        this.temperature = 0.7;
        
        this.chatMessages = [];
        this.isTyping = false;
        this.isOpen = false;
        this.isMinimized = false;
        this.selectedImage = null;
        
        this.initializeElements();
        this.bindEvents();
        this.setupSystemPrompt();
        this.hideNotification();
    }
    
    initializeElements() {
        this.chatbotToggle = document.getElementById('chatbotToggle');
        this.chatbotPopup = document.getElementById('chatbotPopup');
        this.chatMessagesContainer = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendMessage');
        this.minimizeButton = document.getElementById('minimizeChat');
        this.closeButton = document.getElementById('closeChat');
        this.characterCount = document.querySelector('.character-count');
        this.quickButtons = document.querySelectorAll('.quick-btn');
        this.notification = document.querySelector('.chat-notification');
        this.imageInput = document.getElementById('imageInput');
        this.attachButton = document.getElementById('attachImage');
        this.imagePreview = document.getElementById('imagePreview');
        this.previewImage = document.getElementById('previewImage');
        this.removeImageButton = document.getElementById('removeImage');
    }
    
    bindEvents() {
        // Toggle chatbot popup
        this.chatbotToggle.addEventListener('click', () => this.togglePopup());
        
        // Minimize/maximize popup
        this.minimizeButton.addEventListener('click', () => this.toggleMinimize());
        
        // Close popup
        this.closeButton.addEventListener('click', () => this.closePopup());
        
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key (Shift+Enter for new line)
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea and update character count
        this.chatInput.addEventListener('input', () => {
            this.autoResizeTextarea();
            this.updateCharacterCount();
            this.toggleSendButton();
        });
        
        // Quick question buttons
        this.quickButtons.forEach(button => {
            button.addEventListener('click', () => {
                const question = button.getAttribute('data-question');
                this.chatInput.value = question;
                this.updateCharacterCount();
                this.toggleSendButton();
                this.sendMessage();
            });
        });

        // Image upload event listeners
        this.attachButton.addEventListener('click', () => {
            this.imageInput.click();
        });

        this.imageInput.addEventListener('change', (e) => {
            this.handleImageSelect(e);
        });

        this.removeImageButton.addEventListener('click', () => {
            this.removeImage();
        });
        
        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatbotPopup.contains(e.target) && !this.chatbotToggle.contains(e.target)) {
                this.closePopup();
            }
        });
    }
    
    setupSystemPrompt() {
        this.systemPrompt = `You are Captain AI, an expert flight instructor specializing in DGCA (Directorate General of Civil Aviation) subjects for Indian aviation training. You have extensive knowledge in:

1. Air Navigation - VOR, NDB, GPS, charts, flight planning
2. Aviation Meteorology - Weather patterns, METAR, TAF, turbulence
3. Technical General - Aircraft systems, instruments, performance
4. Air Regulations - DGCA rules, airspace, flight rules
5. Aircraft & Engines - Aerodynamics, propulsion, systems
6. Radio Telephony - Communication procedures, phraseology

Guidelines for responses:
- Be professional yet friendly, like a real flight instructor
- Provide accurate, detailed explanations suitable for CPL students
- Use aviation terminology correctly
- Include practical examples when helpful
- Break down complex concepts into digestible parts
- Always prioritize safety in your advice
- Reference DGCA regulations when applicable
- Keep responses concise but comprehensive for a popup chat interface

Always encourage safe flying practices and provide practical, actionable advice.`;
    }
    
    togglePopup() {
        if (this.isOpen) {
            this.closePopup();
        } else {
            this.openPopup();
        }
    }
    
    openPopup() {
        this.isOpen = true;
        this.chatbotPopup.classList.add('show');
        this.chatbotToggle.style.display = 'none';
        this.hideNotification();
        
        // Focus on input
        setTimeout(() => {
            this.chatInput.focus();
        }, 300);
    }
    
    closePopup() {
        this.isOpen = false;
        this.isMinimized = false;
        this.chatbotPopup.classList.remove('show', 'minimized');
        this.chatbotToggle.style.display = 'flex';
    }
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.chatbotPopup.classList.toggle('minimized');
    }
    
    hideNotification() {
        if (this.notification) {
            this.notification.style.display = 'none';
        }
    }
    
    showNotification() {
        if (this.notification) {
            this.notification.style.display = 'flex';
        }
    }
    
    autoResizeTextarea() {
        this.chatInput.style.height = 'auto';
        this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 80) + 'px';
    }
    
    updateCharacterCount() {
        const count = this.chatInput.value.length;
        this.characterCount.textContent = `${count}/500`;
        
        if (count > 450) {
            this.characterCount.style.color = '#ff6b6b';
        } else if (count > 400) {
            this.characterCount.style.color = '#ffa500';
        } else {
            this.characterCount.style.color = 'rgba(255, 255, 255, 0.5)';
        }
    }
    
    toggleSendButton() {
        const hasText = this.chatInput.value.trim().length > 0;
        this.sendButton.disabled = !hasText || this.isTyping;
    }
    
    async sendMessage() {
        const message = this.chatInput.value.trim();
        if ((!message && !this.selectedImage) || this.isTyping) return;
        
        // Prepare message content
        let messageContent = message;
        let imageData = null;
        
        if (this.selectedImage) {
            imageData = this.selectedImage;
            // Add user message with image to chat
            this.addMessage(message, 'user', imageData);
        } else {
            // Add user message to chat
            this.addMessage(message, 'user');
        }
        
        // Clear input and image
        this.chatInput.value = '';
        this.removeImage();
        this.autoResizeTextarea();
        this.updateCharacterCount();
        this.toggleSendButton();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response
            const response = await this.getAIResponse(message, imageData);
            this.hideTypingIndicator();
            this.addMessage(response, 'ai');
        } catch (error) {
            this.hideTypingIndicator();
            console.error('AI Response Error:', error);
            
            // Provide more specific error messages
            let errorMessage = 'I apologize, but I\'m having trouble connecting right now. ';
            
            if (error.message.includes('API Error: 401')) {
                errorMessage += 'There seems to be an authentication issue. Please check the API configuration.';
            } else if (error.message.includes('API Error: 429')) {
                errorMessage += 'Too many requests. Please wait a moment and try again.';
            } else if (error.message.includes('API Error: 500')) {
                errorMessage += 'The AI service is temporarily unavailable. Please try again later.';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage += 'Please check your internet connection and try again.';
            } else {
                errorMessage += 'Please try again in a moment.';
            }
            
            this.addMessage(errorMessage, 'ai');
        }
    }
    
    async getAIResponse(userMessage, imageData = null) {
        // Prepare user message content
        let userContent;
        
        if (imageData) {
            // Format message with image for API
            userContent = [
                {
                    type: 'text',
                    text: userMessage || 'What is in this image?'
                },
                {
                    type: 'image_url',
                    image_url: {
                        url: imageData.dataUrl
                    }
                }
            ];
        } else {
            userContent = userMessage;
        }
        
        // Add user message to conversation history
        this.chatMessages.push({
            role: 'user',
            content: userContent
        });
        
        // Prepare messages for API
        const messages = [
            {
                role: 'system',
                content: this.systemPrompt
            },
            ...this.chatMessages.slice(-8) // Keep last 8 messages for context
        ];
        
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'HTTP-Referer': this.siteUrl,
                'X-Title': this.siteName,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.model,
                messages: messages,
                temperature: this.temperature,
                max_tokens: this.maxTokens
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Add AI response to conversation history
        this.chatMessages.push({
            role: 'assistant',
            content: aiResponse
        });
        
        return aiResponse;
    }
    
    addMessage(content, sender, imageData = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (sender === 'ai') {
            avatarDiv.innerHTML = '<i class="fas fa-plane"></i>';
        } else {
            avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Add text content
        if (content) {
            contentDiv.innerHTML = this.formatMessage(content);
        }
        
        // Add image if present
        if (imageData) {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'message-image';
            
            const img = document.createElement('img');
            img.src = imageData.dataUrl;
            img.alt = imageData.name || 'Uploaded image';
            img.style.cursor = 'pointer';
            
            // Add click to view full size
            img.addEventListener('click', () => {
                window.open(imageData.dataUrl, '_blank');
            });
            
            imageDiv.appendChild(img);
            contentDiv.appendChild(imageDiv);
        }
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.chatMessagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    formatMessage(content) {
        // Convert markdown-like formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/(\d+\.\s)/g, '<br>$1'); // Add line breaks before numbered lists
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        this.toggleSendButton();
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-plane"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        this.chatMessagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        this.toggleSendButton();
        
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
    }

    handleImageSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.showNotification('Image size must be less than 5MB', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.selectedImage = {
                    file: file,
                    dataUrl: e.target.result,
                    name: file.name
                };
                this.showImagePreview();
            };
            reader.readAsDataURL(file);
        } else {
            this.showNotification('Please select a valid image file', 'error');
        }
    }

    showImagePreview() {
        if (this.selectedImage) {
            this.previewImage.src = this.selectedImage.dataUrl;
            this.imagePreview.style.display = 'block';
        }
    }

    removeImage() {
        this.selectedImage = null;
        this.imagePreview.style.display = 'none';
        this.previewImage.src = '';
        this.imageInput.value = '';
    }
}

// Initialize Chatbot Popup when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the popup chatbot
    window.chatbotPopup = new ChatbotPopup();
});
