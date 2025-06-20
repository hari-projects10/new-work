document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Add click event to each skill card
    skillCards.forEach(card => {
        const tooltip = card.getAttribute('data-tooltip');
        
        // Create and append the skill name element
        const skillName = document.createElement('div');
        skillName.className = 'skill-name';
        skillName.textContent = tooltip;
        card.appendChild(skillName);
        
        // Handle click events
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close any open tooltips
            if (!this.classList.contains('active')) {
                document.querySelectorAll('.skill-card.active').forEach(activeCard => {
                    activeCard.classList.remove('active');
                });
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
        });
    });
    
    // Close tooltips when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.skill-card.active').forEach(activeCard => {
            activeCard.classList.remove('active');
        });
    });
});
