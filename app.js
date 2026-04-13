// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const locationCards = document.querySelectorAll('.location-card');

// 1. Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle menu icon
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
    } else {
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('ph-x');
        icon.classList.add('ph-list');
    });
});

// 2. Sticky Header changing style on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. Location Cards Interaction logic
const mapIframe = document.getElementById('map-iframe');

locationCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all
        locationCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked
        card.classList.add('active');
        
        // Change the map based on data-map-src
        const newMapSrc = card.getAttribute('data-map-src');
        if (mapIframe && newMapSrc) {
            mapIframe.src = newMapSrc;
        }
    });
});

// 4. Smooth scrolling for anchor links (fallback for browsers not supporting scroll-behavior in CSS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            // Calculate nav height for offset
            const navHeight = navbar.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 5. Booking Modal Logic
const bookingModal = document.getElementById('booking-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelBookingBtn = document.getElementById('cancel-booking-btn');
const bookingForm = document.getElementById('booking-form');
const bookLinks = document.querySelectorAll('a[href="#book"]');

function openModal() {
    bookingModal.classList.add('active');
}

function closeModal() {
    bookingModal.classList.remove('active');
    if (bookingForm) {
        bookingForm.reset();
    }
}

// Open modal on 'Book Appointment' click
bookLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Close modal handlers
[closeModalBtn, cancelBookingBtn, modalOverlay].forEach(el => {
    if (el) {
        el.addEventListener('click', closeModal);
    }
});

// Handle form submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('already book appointment');
        closeModal();
    });
}
