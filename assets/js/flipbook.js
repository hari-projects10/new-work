// Flipbook functionality
let currentPage = 1;
const totalPages = 4; // Updated to 4 pages
let isAnimating = false;

// Function to update the active page indicator
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentPage) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Function to flip to a specific page
function flipPage(pageNum) {
    if (isAnimating) return;
    
    const flipbook = document.getElementById('flipbook');
    const currentPageEl = document.querySelector(`.page-${currentPage}`);
    const targetPageEl = document.querySelector(`.page-${pageNum}`);
    
    if (pageNum === currentPage || !targetPageEl) return;
    
    isAnimating = true;
    
    // Update current page before animation
    const oldPage = currentPage;
    currentPage = pageNum;
    
    // Update indicators
    updateIndicators();
    
    // Set z-index for proper layering
    currentPageEl.style.zIndex = '5';
    targetPageEl.style.zIndex = '10';
    
    // Determine rotation direction
    const direction = pageNum > oldPage ? 1 : -1;
    
    // Apply rotation
    currentPageEl.style.transform = `rotateY(${direction * 180}deg)`;
    targetPageEl.style.transform = 'rotateY(0deg)';
    
    // Reset animation state after transition
    setTimeout(() => {
        currentPageEl.style.zIndex = '1';
        isAnimating = false;
    }, 800);
}

// Navigation functions
function flipToNext() {
    const nextPage = currentPage < totalPages ? currentPage + 1 : 1;
    flipPage(nextPage);
}

function flipToPrev() {
    const prevPage = currentPage > 1 ? currentPage - 1 : totalPages;
    flipPage(prevPage);
}

// Initialize the flipbook
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const pageNum = parseInt(indicator.getAttribute('data-page'));
            if (pageNum !== currentPage) {
                flipPage(pageNum);
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            flipToNext();
        } else if (e.key === 'ArrowLeft') {
            flipToPrev();
        }
    });
    
    // Initialize first page as active
    updateIndicators();
});
