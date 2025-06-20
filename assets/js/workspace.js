// 3D Workspace Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Handle theme changes for smooth transitions
    const handleThemeChange = () => {
        const isDark = document.body.classList.contains('dark-theme');
        const desk = document.querySelector('.desk');
        if (desk) {
            // Add a class during theme transition to prevent layout shifts
            desk.classList.add('theme-transition');
            
            // Force a reflow to ensure the transition is applied
            void desk.offsetWidth;
            
            // Remove the transition class after the theme change is complete
            setTimeout(() => {
                desk.classList.remove('theme-transition');
            }, 500); // Match this with the CSS transition duration
        }
    };
    
    // Watch for theme changes
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                handleThemeChange();
            }
        });
    });
    
    // Start observing the body for class changes
    themeObserver.observe(document.body, { attributes: true });
    
    // Initial theme setup
    handleThemeChange();
    const desk = document.querySelector('.desk');
    const mug = document.getElementById('mug');
    const easterEgg = document.querySelector('.easter-egg');
    
    // Array of positive affirmations for the mug easter egg
    const affirmations = [
        "Keep building.",
        "Clean code. Clear mind.",
        "You're one step closer.",
        "Every line of code matters.",
        "Stay curious.",
        "Learn, build, repeat.",
        "Progress over perfection.",
        "Make it work, then make it better."
    ];

    // Parallax effect on mouse move
    if (desk) {
        document.addEventListener('mousemove', function(e) {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            desk.style.transform = `rotateX(${10 + y/2}deg) rotateY(${x/2}deg)`;
        });

        // Reset desk position on mouse leave
        desk.addEventListener('mouseleave', function() {
            desk.style.transform = 'rotateX(10deg)';
        });
    }


    // Easter egg for the mug
    if (mug && easterEgg) {
        let clickCount = 0;
        
        mug.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Change the affirmation text
            const randomIndex = Math.floor(Math.random() * affirmations.length);
            easterEgg.textContent = affirmations[randomIndex];
            
            // Show the easter egg
            easterEgg.style.opacity = '1';
            
            // Hide after 2 seconds
            setTimeout(() => {
                if (easterEgg.style.opacity === '1') {
                    easterEgg.style.opacity = '0';
                }
            }, 2000);
            
            // Add a subtle animation to the mug
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'mugLift 0.5s ease';
            
            // Reset animation after it completes
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }


    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all desk items
    document.querySelectorAll('.desk-item').forEach(item => {
        intersectionObserver.observe(item);
    });

    // Add keyframe animation for the mug lift and theme transitions
    const style = document.createElement('style');
    style.textContent = `
        /* Disable transitions during theme changes to prevent layout shifts */
        .desk.theme-transition * {
            transition: none !important;
            animation: none !important;
        }
        
        @keyframes mugLift {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(-5deg); }
            100% { transform: translateY(0) rotate(0); }
        }
        
        .desk-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .desk-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations */
        .laptop.animate { transition-delay: 0.1s; }
        .notepad.animate { transition-delay: 0.2s; }
        .books.animate { transition-delay: 0.3s; }
        .mug.animate { transition-delay: 0.4s; }
        .smartphone.animate { transition-delay: 0.5s; }
        .tools-card.animate { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
});

// Add scroll-based zoom effect to the desk
window.addEventListener('scroll', function() {
    const workspace = document.querySelector('.workspace');
    if (!workspace) return;
    
    const scrollPosition = window.scrollY;
    const workspacePosition = workspace.offsetTop;
    const windowHeight = window.innerHeight;
    
    // Calculate how far the workspace is into the viewport (0 to 1)
    const distanceFromTop = scrollPosition - workspacePosition + windowHeight * 0.3;
    const progress = Math.min(Math.max(distanceFromTop / (windowHeight * 0.6), 0), 1);
    
    // Only apply the effect when the workspace is in view
    if (progress > 0 && progress < 1) {
        const scale = 0.9 + (progress * 0.2); // Scale from 0.9 to 1.1
        const desk = document.querySelector('.desk');
        if (desk) {
            desk.style.transform = `scale(${scale}) rotateX(10deg)`;
        }
    }
});
