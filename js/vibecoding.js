// Vibecoding Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    // Handle header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Initialize vibecoding canvas animation
    initVibeCodingCanvas();

    // Initialize scroll animations
    initScrollAnimations();
});

function initVibeCodingCanvas() {
    const canvas = document.getElementById('vibecoding-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particles array
    const particles = [];
    const particleCount = 100;
    const colors = ['#00c8ff', '#ffffff', '#00a6d6'];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.3
        });
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Move particles
            p.x += p.speedX;
            p.y += p.speedY;

            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = 0.2 * (1 - distance / 150);
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start animation
    animate();
}

function initScrollAnimations() {
    // Initialize GSAP ScrollTrigger animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Animate featured projects on scroll
        gsap.utils.toArray('.featured-project').forEach((project, i) => {
            gsap.from(project, {
                y: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: project,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // Animate process steps on scroll
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.from(step, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                scrollTrigger: {
                    trigger: '.process-steps',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
}
