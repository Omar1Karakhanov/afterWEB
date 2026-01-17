document.addEventListener('DOMContentLoaded', () => {
    
    // 1. TYPOGRAPHY SPLITTING (Hero Reveal)
    document.querySelectorAll('[data-split]').forEach(target => {
        const text = target.innerText;
        target.innerHTML = text.split('').map(char => 
            `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    });

    // 2. INITIALIZATION LOADER ENGINE
    const percentEl = document.querySelector('.load-percentage');
    const bgNumEl = document.querySelector('.big-num-bg');
    const progressFill = document.querySelector('.progress-fill');
    const taskLabel = document.getElementById('task-label');
    
    const tasks = ["Calibrating Interface...", "Optimizing Assets...", "Mapping Neural Grid...", "Finalizing Render...", "Ready."];
    let count = 0;

    function updateLoader() {
        count += Math.floor(Math.random() * 3) + 1;
        if (count > 100) count = 100;

        const formatted = count.toString().padStart(2, '0');
        percentEl.innerText = formatted;
        bgNumEl.innerText = formatted;
        progressFill.style.width = count + '%';

        if (count < 25) taskLabel.innerText = tasks[0];
        else if (count < 50) taskLabel.innerText = tasks[1];
        else if (count < 75) taskLabel.innerText = tasks[2];
        else if (count < 95) taskLabel.innerText = tasks[3];
        else taskLabel.innerText = tasks[4];

        if (count < 100) {
            setTimeout(updateLoader, Math.random() * 50 + 20);
        } else {
            setTimeout(completeLoading, 800);
        }
    }

    function completeLoading() {
        document.querySelector('.loader-content').style.opacity = "0";
        document.querySelector('.loader-content').style.transform = "scale(0.95)";

        setTimeout(() => {
            document.querySelector('.loader-shutter.top').style.transform = "translateY(-100%)";
            document.querySelector('.loader-shutter.bottom').style.transform = "translateY(100%)";
            document.body.classList.remove('no-scroll');
            
            setTimeout(() => {
                document.getElementById('loader').style.display = 'none';
                animateHero();
            }, 1000);
        }, 600);
    }

    function animateHero() {
        document.querySelectorAll('.char').forEach((c, i) => {
            setTimeout(() => c.style.transform = 'translateY(0)', i * 35);
        });
        setTimeout(() => {
            document.querySelector('.hero-description').style.opacity = 1;
            document.querySelector('.hero-description').style.transform = 'translateY(0)';
        }, 800);
    }

    // 3. SECURE PROJECT MODAL
    const modal = document.getElementById('contact-modal');
    const stepInput = document.getElementById('step-input');
    const stepSuccess = document.getElementById('step-success');

    document.querySelectorAll('.js-contact-trigger').forEach(b => {
        b.addEventListener('click', () => {
            modal.classList.add('active');
            stepInput.classList.remove('hidden');
            stepSuccess.classList.add('hidden');
        });
    });

    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(b => {
        b.addEventListener('click', () => modal.classList.remove('active'));
    });

    document.getElementById('submit-email').addEventListener('click', () => {
        const email = document.getElementById('user-email').value;
        if (email.includes('@') && email.length > 5) {
            document.getElementById('submit-email').innerText = "Connecting...";
            setTimeout(() => {
                stepInput.classList.add('hidden');
                stepSuccess.classList.remove('hidden');
                document.getElementById('user-email').value = "";
                document.getElementById('submit-email').innerText = "Connect →";
            }, 1500);
        }
    });

    // 4. SCROLL INTERACTIVITY
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    document.querySelectorAll('.js-scroll-link').forEach(l => {
        l.addEventListener('click', (e) => {
            e.preventDefault();
            const t = document.getElementById(l.getAttribute('data-target') || l.getAttribute('href').substring(1));
            if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
        });
    });
// Add this line inside your initScrollReveal function
document.querySelectorAll('.bottom-bar').forEach(el => observer.observe(el));

    updateLoader(); // Launch sequence
});