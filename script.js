// Data for students (can be expanded)
const studentsData = [
    { name: "Luka H.", role: "Glavni programer", quote: "Radi na mom kompjuteru...", gender: "boys", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Ana M.", role: "Predsjednica razreda", quote: "Tišina molim!", gender: "girls", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Marko P.", role: "Razredni klaun", quote: "Profesore, mogu na wc?", gender: "boys", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Iva K.", role: "Štreber", quote: "Jel bio domaći?", gender: "girls", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Ivan B.", role: "Sportaš", quote: "Idemo na hakl poslije škole?", gender: "boys", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Petra J.", role: "Uvijek kasni", quote: "Bila je gužva u prometu...", gender: "girls", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Karlo D.", role: "DJ razreda", quote: "Pusti ovu traku...", gender: "boys", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&auto=format&fit=crop" },
    { name: "Maja T.", role: "Artist", quote: "Crtam po klupi.", gender: "girls", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&h=500&auto=format&fit=crop" },
];

document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor (only active on non-mobile)
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            
            // Add slight delay for follower
            setTimeout(() => {
                cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }, 50);
        });

        const links = document.querySelectorAll('a, button, .gallery-item, .student-card');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('hovering');
            });
            link.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('hovering');
            });
        });
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

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Animate numbers if it's the stats section
                if(entry.target.id === 'stats') {
                    animateNumbers();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach((el) => {
        observer.observe(el);
    });

    // Number Counter Animation
    let numbersAnimated = false;
    function animateNumbers() {
        if(numbersAnimated) return;
        
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    stat.innerText = Math.ceil(current) + (target > 100 ? '+' : '');
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.innerText = target + (target > 100 ? '+' : '');
                }
            };
            updateNumber();
        });
        numbersAnimated = true;
    }

    // Populate Students
    const studentsContainer = document.getElementById('students-container');
    
    function renderStudents(filter = 'all') {
        studentsContainer.innerHTML = '';
        
        const filtered = filter === 'all' 
            ? studentsData 
            : studentsData.filter(s => s.gender === filter);
            
        filtered.forEach((student, index) => {
            const delay = index * 0.1;
            const card = document.createElement('div');
            card.className = 'student-card glass';
            card.style.animationDelay = `${delay}s`;
            
            // Re-apply hover class for custom cursor logic if active
            if (window.innerWidth > 768) {
                card.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
                card.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
            }

            card.innerHTML = `
                <img src="${student.img}" alt="${student.name}" class="student-card-img" onerror="this.src='https://via.placeholder.com/400x500/111/00f0ff?text=${encodeURIComponent(student.name)}'">
                <div class="student-info">
                    <h3 class="student-name">${student.name}</h3>
                    <p class="student-role">${student.role}</p>
                    <p class="student-quote">"${student.quote}"</p>
                </div>
            `;
            studentsContainer.appendChild(card);
        });
    }

    renderStudents();

    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderStudents(e.target.getAttribute('data-filter'));
        });
    });

    // Interactive Background Canvas (Particles with connections)
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
            if (this.y > height) this.y = 0;
            if (this.y < 0) this.y = height;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
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
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 - distance/1000})`;
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
