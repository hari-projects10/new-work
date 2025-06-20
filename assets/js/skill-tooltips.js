document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    let activeTooltip = null;
    let touchTimer = null;
    const tooltipShowDelay = 300; // ms

    // Function to show tooltip
    function showTooltip(card) {
        // Hide any currently active tooltip
        if (activeTooltip && activeTooltip !== card) {
            activeTooltip.classList.remove('tooltip-visible');
        }
        
        // Show the clicked tooltip
        card.classList.add('tooltip-visible');
        activeTooltip = card;
        
        // Auto-hide after 2 seconds
        clearTimeout(touchTimer);
        touchTimer = setTimeout(() => {
            if (activeTooltip) {
                activeTooltip.classList.remove('tooltip-visible');
                activeTooltip = null;
            }
        }, 2000);
    }

    // Function to hide tooltip
    function hideTooltip() {
        if (activeTooltip) {
            activeTooltip.classList.remove('tooltip-visible');
            activeTooltip = null;
        }
        clearTimeout(touchTimer);
    }

    // Add event listeners for each skill card
    skillCards.forEach(card => {
        // Touch events for mobile
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            showTooltip(this);
        });

        // Click event as fallback
        card.addEventListener('click', function(e) {
            // Only handle click if touch events aren't supported
            if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
                showTooltip(this);
            }
        });
    });

    // Hide tooltip when clicking/touching outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.skill-card')) {
            hideTooltip();
        }
    });

    // Hide tooltip when scrolling on touch devices
    window.addEventListener('scroll', function() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            hideTooltip();
        }
    }, { passive: true });
});
