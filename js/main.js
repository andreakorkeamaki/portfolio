// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Custom cursor
    initCustomCursor();
    
    // Loading screen animation
    initLoadingScreen();
    
    // Initialize Three.js hero animation
    initHeroAnimation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form submission
    initContactForm();
});

// Custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Cursor hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .project, .menu-toggle');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderColor = 'rgba(0, 200, 255, 0.4)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
    });
}

// Loading screen animation
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading time
    gsap.to('.loader-bar::before', {
        left: '100%',
        duration: 2,
        ease: 'power2.inOut'
    });
    
    // Hide loading screen after animation completes
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        delay: 2.2,
        onComplete: () => {
            loadingScreen.style.display = 'none';
            // Start page animations after loading
            animateHeroSection();
        }
    });
}

// Three.js hero background animation
function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    for (let i = 0; i < particlesCount; i++) {
        scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00c8ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 3;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // Mouse interaction
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;
        
        renderer.render(scene, camera);
    };
    
    animate();
}

// GSAP animations
function initAnimations() {
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Project animations
    gsap.utils.toArray('.project').forEach(project => {
        gsap.from(project, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: project,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // About section animation
    gsap.from('.about-content', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.about-image', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        }
    });
    
    // Skills animation
    gsap.from('.skill-category', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.skills',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        }
    });
    
    // Contact section animation
    gsap.from('.contact-info', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.contact-form', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
        }
    });
    
    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Hero section animation
function animateHeroSection() {
    const tl = gsap.timeline();
    
    tl.from('.hero h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('header', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8');
}

// Mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// Contact form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // Here you would normally send the form data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
}
