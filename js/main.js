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

// ===== Contact Form Submission (Formspree) =====
const supportForm = document.getElementById('supportForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

// Formspree endpoint for ticket submissions
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdeazzzo';

supportForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    const formData = new FormData(supportForm);

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const ticketId = 'TIC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
            formMessage.classList.add('success');
            formMessage.textContent = `✓ Solicitud enviada. Tu ticket #${ticketId} ha sido creado. Te contactaremos pronto.`;
            // Enviar copia a Supabase
            if (window.trackFormSubmission) {
                window.trackFormSubmission('soporte', Object.fromEntries(formData));
            }
            supportForm.reset();
        } else {
            throw new Error('Error al enviar');
        }
    } catch (err) {
        formMessage.classList.add('error');
        formMessage.textContent = '✗ Error al enviar la solicitud. Intenta nuevamente o escríbenos a soporte@soportetic.shop';
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// ===== Antivirus Form Submission (Formspree) =====
const antivirusForm = document.getElementById('antivirusForm');
const avSubmitBtn = document.getElementById('avSubmitBtn');
const avFormMessage = document.getElementById('avFormMessage');

// Formspree endpoint for antivirus submissions
const FORMSPREE_AV_ENDPOINT = 'https://formspree.io/f/mdeazzzo';

antivirusForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    avSubmitBtn.classList.add('loading');
    avSubmitBtn.disabled = true;
    avFormMessage.className = 'form-message';
    avFormMessage.textContent = '';

    const formData = new FormData(antivirusForm);
    formData.append('_subject', 'Nueva consulta de Antivirus - Segurmática');

    try {
        const response = await fetch(FORMSPREE_AV_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const ticketId = 'AV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
            avFormMessage.classList.add('success');
            avFormMessage.textContent = `✓ Consulta enviada. Tu ticket #${ticketId} ha sido creado. Te contactaremos pronto.`;
            // Enviar copia a Supabase
            if (window.trackFormSubmission) {
                window.trackFormSubmission('antivirus', Object.fromEntries(formData));
            }
            antivirusForm.reset();
        } else {
            throw new Error('Error al enviar');
        }
    } catch (err) {
        avFormMessage.classList.add('error');
        avFormMessage.textContent = '✗ Error al enviar la consulta. Intenta nuevamente o escríbenos a virus@segurmatica.cu';
    } finally {
        avSubmitBtn.classList.remove('loading');
        avSubmitBtn.disabled = false;
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
