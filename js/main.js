// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Contact Form Submission =====
const supportForm = document.getElementById('supportForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

supportForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    const formData = new FormData(supportForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            formMessage.classList.add('success');
            formMessage.textContent = `✓ Solicitud enviada. Tu ticket #${result.ticketId} ha sido creado. Te contactaremos pronto.`;
            supportForm.reset();
        } else {
            throw new Error(result.error || 'Error al enviar');
        }
    } catch (err) {
        formMessage.classList.add('error');
        formMessage.textContent = '✗ Error al enviar la solicitud. Intenta nuevamente o escríbenos a soporte@soportetic.shop';
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// ===== Terminal Animation =====
const terminalLines = document.querySelectorAll('.terminal-body .terminal-line');
let lineIndex = 0;

function animateTerminal() {
    terminalLines.forEach(line => line.style.opacity = '0');

    function showNextLine() {
        if (lineIndex < terminalLines.length) {
            terminalLines[lineIndex].style.opacity = '1';
            terminalLines[lineIndex].style.transition = 'opacity 0.3s';
            lineIndex++;
            setTimeout(showNextLine, 400);
        }
    }

    lineIndex = 0;
    showNextLine();
}

// Start terminal animation when visible
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTerminal();
            terminalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const terminal = document.querySelector('.terminal-window');
if (terminal) terminalObserver.observe(terminal);

// ===== Scroll Reveal Animations =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-card, .cyber-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    revealObserver.observe(el);
});
