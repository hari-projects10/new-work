document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 1; // Start with the second slide as active
    const slideCount = slides.length;
    let isAnimating = false;
    
    // Set initial active slide
    updateSlides();
    
    // Auto-rotate slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-rotation on hover
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        resetInterval();
    });
    
    // Navigation buttons
    prevButton.addEventListener('click', () => {
        if (isAnimating) return;
        prevSlide();
        resetInterval();
    });
    
    nextButton.addEventListener('click', () => {
        if (isAnimating) return;
        nextSlide();
        resetInterval();
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetInterval();
    }, { passive: true });
    
    function handleSwipe() {
        if (isAnimating) return;
        
        const swipeThreshold = 50; // Minimum swipe distance
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    function nextSlide() {
        if (isAnimating) return;
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlides();
    }
    
    function prevSlide() {
        if (isAnimating) return;
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlides();
    }
    
    function updateSlides() {
        isAnimating = true;
        
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        slides[currentIndex].classList.add('active');
        
        // Calculate the transform value to center the active slide
        const slideWidth = slides[0].offsetWidth;
        const trackWidth = track.offsetWidth;
        const centerPosition = (trackWidth / 2) - (slides[currentIndex].offsetWidth / 2);
        const offset = (currentIndex * -slideWidth) + centerPosition;
        
        // Apply transform to track with smooth transition
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${offset}px)`;
        
        // Reset animation flag after transition ends
        track.addEventListener('transitionend', function onTransitionEnd() {
            isAnimating = false;
            track.removeEventListener('transitionend', onTransitionEnd);
        }, { once: true });
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlides();
        }, 250);
    });
    
    // Pause auto-rotation when window is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            resetInterval();
        }
    });
});
