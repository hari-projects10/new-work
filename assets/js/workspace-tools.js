document.addEventListener('DOMContentLoaded', function() {
    const toolsCard = document.querySelector('.desk-item.tools-card');
    const toolsTabBtn = document.querySelector('.tab-btn[data-tab="tools-tab"]');
    const skillsSection = document.getElementById('skills');
    
    if (toolsCard) {
        toolsCard.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add active class to tools card
            this.classList.add('active');
            
            // Remove active class after animation completes
            setTimeout(() => {
                this.classList.remove('active');
            }, 1000);
            
            // Activate tools tab
            if (toolsTabBtn && !toolsTabBtn.classList.contains('active')) {
                toolsTabBtn.click();
            }
            
            // Smooth scroll to skills section
            if (skillsSection) {
                skillsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Handle tab switching when scrolled to from workspace
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'skills') {
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('from') === 'workspace' && toolsTabBtn) {
                    toolsTabBtn.click();
                    // Clean up the URL
                    window.history.replaceState({}, '', window.location.pathname);
                }
            }
        });
    }, { threshold: 0.1 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});
