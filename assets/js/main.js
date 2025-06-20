/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== TYPING ANIMATION =====*/
const professionText = document.querySelector('.profession-text');
const professions = ['Web Developer', 'UI/UX Designer', 'Software Engineer'];
let currentProfession = 0;
let currentLetter = 0;
let isDeleting = false;

function typeEffect() {
    const currentProfessionText = professions[currentProfession];
    
    if (isDeleting) {
        professionText.textContent = currentProfessionText.substring(0, currentLetter - 1);
        currentLetter--;
    } else {
        professionText.textContent = currentProfessionText.substring(0, currentLetter + 1);
        currentLetter++;
    }

    if (!isDeleting && currentLetter === currentProfessionText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 3000); // Wait 3 seconds before deleting
    } else if (isDeleting && currentLetter === 0) {
        isDeleting = false;
        currentProfession = (currentProfession + 1) % professions.length;
        setTimeout(typeEffect, 500); // Wait 500ms before typing next profession
    } else {
        setTimeout(typeEffect, 100); // Speed of typing animation
    }
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

/*===== THEME SWITCHING =====*/
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeIcon.classList.replace('bx-moon', savedTheme === 'dark-theme' ? 'bx-sun' : 'bx-moon');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
    document.body.classList.toggle('dark-theme');
    
    // Update icon
    themeIcon.classList.replace(currentTheme === 'light-theme' ? 'bx-sun' : 'bx-moon', currentTheme === 'dark-theme' ? 'bx-sun' : 'bx-moon');
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
