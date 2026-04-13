
/* ---------- SIDEBAR ---------- */
function showsidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = 'none';
    document.body.style.overflow = '';
}
document.addEventListener('click', function (e) {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.menu-button');
    if (
        sidebar.style.display === 'flex' &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        hideSidebar();
    }
});

/* ---------- NAVBAR SCROLL EFFECT ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ---------- TYPING ANIMATION---------- */
const line1 = "Pooja Veg";
const line2 = "Authentic Indian Catering";

let i = 0;
let j = 0;
let typingStarted = false;

function typeLine1() {
    if (i < line1.length) {
        document.getElementById("typeLine1").innerHTML += line1.charAt(i);
        i++;
        setTimeout(typeLine1, 45);
    } else {
        setTimeout(startLine2, 120);
    }
}

function startLine2() {
    typeLine2();
}

function typeLine2() {
    if (j < line2.length) {
        document.getElementById("typeLine2").innerHTML += line2.charAt(j);
        j++;
        setTimeout(typeLine2, 38);
    } else {
        setTimeout(() => {
            document.getElementById("fadeParagraph").classList.add("show");
        }, 200);
    }
}

/* ---------- SCROLL-TRIGGERED ANIMATIONS ---------- */
function handleScroll() {
    /* Information section typing */
    const cateringSection = document.getElementById("cateringSection");
    if (cateringSection) {
        const pos = cateringSection.getBoundingClientRect().top;
        const screen = window.innerHeight / 1.2;
        if (pos < screen && !typingStarted) {
            cateringSection.classList.add("show-section");
            typeLine1();
            typingStarted = true;
        }
    }
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const pos = card.getBoundingClientRect().top;
        if (pos < window.innerHeight - 60) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        }
    });
    const menuSection = document.querySelector('.menu-section');
    if (menuSection) {
        const pos = menuSection.getBoundingClientRect().top;
        if (pos < window.innerHeight - 80) {
            menuSection.style.opacity = '1';
            menuSection.style.transform = 'translateY(0)';
        }
    }
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        const pos = contactSection.getBoundingClientRect().top;
        if (pos < window.innerHeight - 80) {
            contactSection.style.opacity = '1';
            contactSection.style.transform = 'translateY(0)';
        }
    }
}

function initAnimations() {
    /* Service*/
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.32s ease';
    });

    /* Menu*/
    const menuSection = document.querySelector('.menu-section');
    if (menuSection) {
        menuSection.style.opacity = '0';
        menuSection.style.transform = 'translateY(30px)';
        menuSection.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    }

    /* Contact*/
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.style.opacity = '0';
        contactSection.style.transform = 'translateY(30px)';
        contactSection.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", () => {
    initAnimations();
    handleScroll(); 
});

/* ---------- MENU TABS ---------- */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-tab');
        const pane = document.getElementById(target);
        if (pane) pane.classList.add('active');
    });
});

/* ---------- CONTACT FORM ---------- */
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const event = document.querySelector('#event').value;
    const guests = document.querySelector('#guests').value;
    const date = document.querySelector('#date').value;
    const message = document.querySelector('#message').value;

    const btn = document.querySelector('.submit-btn');

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    const text = `*New Catering Inquiry*%0A%0A
    Name: ${name}%0A
   Phone: ${phone}%0A
Email: ${email}%0A
Event: ${event}%0A
 Guests: ${guests}%0A
 Date: ${date}%0A
   Message: ${message}`;
    const whatsappNumber = "919845146394"; 

    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    setTimeout(() => {
        window.open(url, '_blank');

        btn.innerHTML = 'Send Inquiry <i class="fa-solid fa-paper-plane"></i>';
        btn.disabled = false;

        e.target.reset();
    }, 800);
}
const sections = document.querySelectorAll('section[id], .hero[id]');
const navLinks = document.querySelectorAll('.nav-main a[href^="#"]');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                link.style.fontWeight = '';
            });
            const activeLink = document.querySelector(`.nav-main a[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--green)';
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));