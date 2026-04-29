// Data for incidents with Zagreb slang
const incidentsData = [
    { title: "Zapaljen Koš", desc: "Slučajno pao upaljač... vatrogasci bili na speed dialu.", date: "Prosinac 2024", icon: "fa-fire" },
    { title: "Zaključana Raska", desc: "Zaboravili smo da je unutra na velikom odmoru. Sori raska!", date: "Rujan 2023", icon: "fa-key" },
    { title: "Masovno Bježanje", desc: "Kolektivno preseljenje s fizike u obližnji birc na Vukovarskoj.", date: "Svibanj 2025", icon: "fa-person-running" },
    { title: "Eksplozija Labos", desc: "Malo smo krivo spojili žice, pola škole ostalo bez struje.", date: "Ožujak 2025", icon: "fa-bomb" },
    { title: "Pad Projektora", desc: "Netko je previše zalupio vratima, projektor rekao laku noć.", date: "Studeni 2024", icon: "fa-desktop" },
    { title: "Nestanak Struje", desc: "Glavna sklopka misteriozno iskočila baš pred test iz matke.", date: "Siječanj 2026", icon: "fa-bolt" }
];

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
        // Trigger initial GSAP animations
        if (typeof gsap !== 'undefined') {
            gsap.from(".hero-content > *", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }
    }, 500);
});

document.addEventListener('DOMContentLoaded', () => {
    // Dark / Light mode toggle
    const toggleBtn = document.getElementById("toggleTheme");
    const body = document.body;
    
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // Set initial icon
    toggleBtn.innerHTML = body.classList.contains("light") ? moonIcon : sunIcon;

    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("light");
        
        if (body.classList.contains("light")) {
            toggleBtn.innerHTML = moonIcon;
            particleColor = 'rgba(255, 117, 195, 0.5)';
            lineColor = '255, 117, 195';
        } else {
            toggleBtn.innerHTML = sunIcon;
            particleColor = 'rgba(255, 117, 195, 0.8)';
            lineColor = '255, 117, 195';
        }
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
    let followerX = window.innerWidth/2, followerY = window.innerHeight/2;
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        const updateFollower = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
            requestAnimationFrame(updateFollower);
        };
        updateFollower();

        const addHoverEffects = () => {
            const links = document.querySelectorAll('a, button, .theme-btn, .incident-card');
            links.forEach(link => {
                link.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
                link.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
            });
        };
        setTimeout(addHoverEffects, 1000); // init after render
    }

    // Navigation Scroll Effect
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // GSAP ScrollTrigger Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.hidden').forEach(section => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleClass: "show",
                    once: true
                }
            });
        });
    }

    // 3D Tilt Effect on Cards
    const initTilt = () => {
        const tiltCards = document.querySelectorAll('.tilt-card, .incident-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth <= 768) return; 
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.zIndex = "10";
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                card.style.zIndex = "1";
            });
        });
    };

    // Populate Incidents
    const incidentsContainer = document.getElementById('incidents-container');
    
    function renderIncidents() {
        incidentsContainer.innerHTML = '';
        
        incidentsData.forEach((incident, index) => {
            const card = document.createElement('div');
            card.className = 'incident-card glass tilt-card';
            
            card.innerHTML = `
                <div class="incident-icon-wrapper">
                    <i class="fas ${incident.icon} incident-icon"></i>
                </div>
                <div class="incident-info">
                    <span class="incident-date">${incident.date}</span>
                    <h3 class="incident-title">${incident.title}</h3>
                    <p class="incident-desc">${incident.desc}</p>
                </div>
            `;
            incidentsContainer.appendChild(card);
        });

        initTilt();
        
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.incident-card', 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    stagger: 0.15, 
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: '#incidents',
                        start: "top 70%"
                    }
                }
            );
        }
    }

    renderIncidents();

    // Interactive Background Canvas
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let particleColor = 'rgba(255, 117, 195, 0.8)'; // Pink
    let lineColor = '255, 117, 195';

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.density = (Math.random() * 30) + 1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if(window.innerWidth > 768) {
                let dx = mouseX - this.x;
                let dy = mouseY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = 150;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;
                
                if (distance < maxDistance) {
                    this.x += directionX * 0.05; 
                    this.y += directionY * 0.05;
                }
            }

            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }
        
        draw() {
            ctx.fillStyle = particleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 12), 150);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${lineColor}, ${0.2 - distance/750})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateCanvas);
    }

    initCanvas();
    createParticles();
    animateCanvas();

    window.addEventListener('resize', () => {
        initCanvas();
        createParticles();
    });
});
