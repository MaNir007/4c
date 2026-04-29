// Data for students with Zagreb slang
const studentsData = [
    { name: "Luka H.", role: "Glavni haker", quote: "Palo mi je na mom kompu...", gender: "boys", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Ana M.", role: "Razredna poglavica", quote: "Daj malo tišine tamo odozada!", gender: "girls", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Marko P.", role: "Dežurni klaun", quote: "Raska, jel mogu na wc?", gender: "boys", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Iva K.", role: "Štreberica", quote: "A kaj smo imali za domaći?", gender: "girls", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Ivan B.", role: "Hakler", quote: "Idemo na hakl poslije nastave?", gender: "boys", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Petra J.", role: "Fantom", quote: "Zakasnila sam, ZET brije po svom...", gender: "girls", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Karlo D.", role: "DJ Špica", quote: "Daj mi AUX da pustim bengere.", gender: "boys", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Maja T.", role: "Artistica", quote: "Crtam grafite po klupi.", gender: "girls", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=500&auto=format&fit=crop" },
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
            // Repaint canvas with light theme colors
            particleColor = 'rgba(255, 117, 195, 0.5)';
            lineColor = '255, 117, 195';
        } else {
            toggleBtn.innerHTML = sunIcon;
            particleColor = 'rgba(255, 117, 195, 0.8)';
            lineColor = '255, 117, 195';
        }
    });

    // Custom Cursor with spring physics emulation
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

        // Use requestAnimationFrame for smoother follower lag
        const updateFollower = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
            requestAnimationFrame(updateFollower);
        };
        updateFollower();

        const addHoverEffects = () => {
            const links = document.querySelectorAll('a, button, .gallery-item, .student-card, .theme-btn');
            links.forEach(link => {
                link.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
                link.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
            });
        };
        addHoverEffects();
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

    // Number Counter Animation via IntersectionObserver
    const observerOptions = { threshold: 0.5 };
    let numbersAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !numbersAnimated) {
                const stats = document.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    if (typeof gsap !== 'undefined') {
                        gsap.to(stat, {
                            innerHTML: target,
                            duration: 2,
                            snap: { innerHTML: 1 },
                            onUpdate: function() {
                                stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + (target > 100 ? '+' : '');
                            }
                        });
                    } else {
                        stat.innerHTML = target + (target > 100 ? '+' : '');
                    }
                });
                numbersAnimated = true;
            }
        });
    }, observerOptions);

    const statsSection = document.getElementById('stats');
    if(statsSection) observer.observe(statsSection);

    // 3D Tilt Effect on Cards (Advanced JS interaction)
    const initTilt = () => {
        const tiltCards = document.querySelectorAll('.tilt-card, .student-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth <= 768) return; // Disable tilt on mobile
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

    // Populate Students with GSAP Stagger
    const studentsContainer = document.getElementById('students-container');
    
    function renderStudents(filter = 'all') {
        const updateDOM = () => {
            studentsContainer.innerHTML = '';
            
            const filtered = filter === 'all' 
                ? studentsData 
                : studentsData.filter(s => s.gender === filter);
                
            filtered.forEach((student, index) => {
                const card = document.createElement('div');
                card.className = 'student-card glass';
                
                card.innerHTML = `
                    <img src="${student.img}" alt="${student.name}" class="student-card-img" onerror="this.src='https://via.placeholder.com/400x500/111/ff75c3?text=${encodeURIComponent(student.name)}'">
                    <div class="student-info">
                        <h3 class="student-name">${student.name}</h3>
                        <p class="student-role">${student.role}</p>
                        <p class="student-quote">"${student.quote}"</p>
                    </div>
                `;
                studentsContainer.appendChild(card);
            });

            // Re-init tilt and hover effects
            initTilt();
            if(window.innerWidth > 768) {
                const newCards = document.querySelectorAll('.student-card');
                newCards.forEach(card => {
                    card.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
                    card.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
                });
            }

            // Fade in new
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.student-card', 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
                );
            }
        };

        if (typeof gsap !== 'undefined' && studentsContainer.children.length > 0) {
            // Fade out existing
            gsap.to('.student-card', {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: updateDOM
            });
        } else {
            updateDOM();
        }
    }

    // Initial render
    renderStudents();

    // Filter Buttons logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderStudents(e.target.getAttribute('data-filter'));
        });
    });

    // Interactive Background Canvas (Particles with mouse attraction)
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
            
            // Mouse interaction - particles are attracted
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
                    this.x += directionX * 0.05; // attract slowly
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

    initTilt(); // init tilt for static elements
});
