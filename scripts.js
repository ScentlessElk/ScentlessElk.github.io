// Debounce utility function to optimize scroll event handling
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Highlight the active section in the navigation bar
const navLinks = document.querySelectorAll('nav ul li a');

const highlightActiveSection = () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 60; // Adjust for sticky header
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.href.includes(`#${current}`)) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', debounce(highlightActiveSection, 100));
;

// Contact form validation and feedback
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('firstname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        feedback.textContent = 'Please fill out all fields.';
        feedback.style.color = 'red';
    } else if (!validateEmail(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.style.color = 'red';
    } else {
        feedback.textContent = 'Thank you for your message! I will get back to you shortly.';
        feedback.style.color = 'green';
        form.reset();
    }
    feedback.style.display = 'block';
});

// Email validation function
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// Hamburger menu toggle for small screens
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinksContainer = document.getElementById('nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('show');
});
