// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery filters
    initGalleryFilters();
    
    // Initialize gallery animations
    initGalleryAnimations();
});

// Gallery filters functionality
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    // Show item with animation
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                        onStart: () => {
                            item.classList.remove('hidden');
                            item.style.position = 'relative';
                        }
                    });
                } else {
                    // Hide item with animation
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.5,
                        ease: 'power3.out',
                        onComplete: () => {
                            item.classList.add('hidden');
                            item.style.position = 'absolute';
                        }
                    });
                }
            });
        });
    });
}

// Gallery animations
function initGalleryAnimations() {
    // Animate gallery hero section
    gsap.from('.gallery-hero h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.gallery-hero .subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    // Animate filter buttons
    gsap.from('.filter-btn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
    });
    
    // Animate gallery items on scroll
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.1 * i,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none none'
            }
        });
    });
}
