// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabIndex = button.dataset.tab;
        
        // Update active states
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.querySelector(`[data-content="${tabIndex}"]`).classList.add('active');
    });
});

// Image Gallery
const images = document.querySelectorAll('.gallery-container img');
const prevBtn = document.querySelector('.gallery-btn.prev');
const nextBtn = document.querySelector('.gallery-btn.next');
let currentImage = 0;

function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentImage = (currentImage - 1 + images.length) % images.length;
    showImage(currentImage);
});

nextBtn.addEventListener('click', () => {
    currentImage = (currentImage + 1) % images.length;
    showImage(currentImage);
});

// Auto advance gallery
setInterval(() => {
    currentImage = (currentImage + 1) % images.length;
    showImage(currentImage);
}, 5000);

// Show first image initially
showImage(0);

// Form Validation
const form = document.getElementById('registrationForm');
const inputs = form.querySelectorAll('input');

const validateField = (input) => {
    const name = input.name;
    const value = input.value;
    const errorElement = document.querySelector(`[data-error="${name}"]`);
    let error = '';

    switch (name) {
        case 'username':
            if (value.length < 3) {
                error = 'Username must be at least 3 characters';
            }
            break;
        case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = 'Invalid email format';
            }
            break;
        case 'password':
            if (value.length < 8) {
                error = 'Password must be at least 8 characters';
            }
            break;
    }

    errorElement.textContent = error;
    return !error;
};

// Real-time validation
inputs.forEach(input => {
    input.addEventListener('input', () => validateField(input));
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (isValid) {
        alert('Form submitted successfully!');
        form.reset();
    }
});