document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider Functionality
    initSlider();
    
    // Countdown Timer
    initCountdownTimer();
    
    // Initialize other interactive elements
    initProductHover();
    
    // Mobile Menu Toggle
    initMobileMenu();
});

// Hero Slider
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav .prev');
    const nextBtn = document.querySelector('.slider-nav .next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // If there's only one slide, create duplicates for the slider
    if (slideCount === 1) {
        // Clone the slide and add it to the container
        const slideContainer = document.querySelector('.slider-container');
        const clone1 = slides[0].cloneNode(true);
        const clone2 = slides[0].cloneNode(true);
        
        clone1.classList.remove('active');
        clone2.classList.remove('active');
        
        slideContainer.appendChild(clone1);
        slideContainer.appendChild(clone2);
        
        // Update the slides nodelist
        slides = document.querySelectorAll('.slide');
    }
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the active slide
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    }
    
    // Event listeners for buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto sliding when hovering over the slider
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Initialize the first slide
    showSlide(0);
}

// Countdown Timer
function initCountdownTimer() {
    // Set the timer to countdown from current date to 3 days from now
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + 3); // 3 days from now
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result with leading zeros
        daysElement.textContent = days < 10 ? `0${days}` : days;
        hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
        minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
        
        // If the countdown is finished, reset it
        if (distance < 0) {
            const newEndDate = new Date();
            newEndDate.setDate(newEndDate.getDate() + 3);
            endDate = newEndDate;
        }
    }
    
    // Update the timer every second
    updateTimer(); // Initial call
    setInterval(updateTimer, 1000);
}

// Product Hover Effects and Quick Actions
function initProductHover() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Quick view functionality
        const quickViewBtn = card.querySelector('.quick-view');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const productTitle = card.querySelector('.product-title').textContent;
                alert(`Quick view for ${productTitle}`); // Replace with modal implementation
            });
        }
        
        // Add to wishlist functionality
        const wishlistBtn = card.querySelector('.add-to-wishlist');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function(e) {
                e.preventDefault();
                this.classList.toggle('active');
                const productTitle = card.querySelector('.product-title').textContent;
                alert(`${productTitle} added to wishlist!`); // Replace with proper implementation
            });
        }
        
        // Add to cart functionality
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const productTitle = card.querySelector('.product-title').textContent;
                alert(`${productTitle} added to cart!`); // Replace with proper implementation
            });
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    console.log("Initializing mobile menu");
    
    // Get mobile menu elements
    const mobileMenuOpenBtn = document.getElementById('mobile-menu-open');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    
    // Debug check
    console.log({
        mobileMenuOpenBtn: mobileMenuOpenBtn,
        mobileMenuCloseBtn: mobileMenuCloseBtn,
        mobileNav: mobileNav,
        mobileNavOverlay: mobileNavOverlay
    });
    
    // Add direct click handler on mobile menu open button
    if (mobileMenuOpenBtn) {
        console.log("Adding click handler to mobile menu button");
        
        mobileMenuOpenBtn.onclick = function(e) {
            console.log("Mobile menu button clicked");
            e.preventDefault();
            
            if (mobileNav) {
                mobileNav.classList.add('active');
                console.log("Added active class to mobile nav");
            }
            
            if (mobileNavOverlay) {
                mobileNavOverlay.classList.add('active');
            }
            
            document.body.style.overflow = 'hidden';
        };
    }
    
    // Add click handler to close button
    if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.onclick = function(e) {
            e.preventDefault();
            closeMenu();
        };
    }
    
    // Add click handler to overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.onclick = function(e) {
            closeMenu();
        };
    }
    
    // Toggle dropdown menus
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    if (mobileDropdownToggles) {
        mobileDropdownToggles.forEach(toggle => {
            toggle.onclick = function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                const dropdown = parent.querySelector('.mobile-dropdown-content');
                
                if (dropdown) {
                    // Close all other dropdowns
                    document.querySelectorAll('.mobile-dropdown-content').forEach(item => {
                        if (item !== dropdown && item.style.display === 'block') {
                            item.style.display = 'none';
                            const toggleIcon = item.parentElement.querySelector('.mobile-dropdown-toggle i');
                            if (toggleIcon) {
                                toggleIcon.classList.remove('fa-angle-up');
                                toggleIcon.classList.add('fa-angle-down');
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    if (dropdown.style.display === 'block') {
                        dropdown.style.display = 'none';
                        const icon = this.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-angle-up');
                            icon.classList.add('fa-angle-down');
                        }
                    } else {
                        dropdown.style.display = 'block';
                        const icon = this.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-angle-down');
                            icon.classList.add('fa-angle-up');
                        }
                    }
                }
            };
        });
    }
    
    // Function to close mobile menu
    function closeMenu() {
        console.log("Closing mobile menu");
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    // Add fallback click handler using a class selector (in case ID is missing)
    const menuBtns = document.querySelectorAll('.mobile-menu-btn');
    if (menuBtns.length > 0 && !mobileMenuOpenBtn) {
        console.log("Using fallback selector for menu button");
        menuBtns.forEach(btn => {
            btn.onclick = function(e) {
                console.log("Fallback menu button clicked");
                e.preventDefault();
                
                const nav = document.querySelector('.mobile-nav');
                const overlay = document.querySelector('.mobile-nav-overlay');
                
                if (nav) {
                    nav.classList.add('active');
                }
                
                if (overlay) {
                    overlay.classList.add('active');
                }
                
                document.body.style.overflow = 'hidden';
            };
        });
    }
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Initialize dropdown menus for larger screens
document.addEventListener('mouseover', function(e) {
    if (window.innerWidth >= 768) {
        const dropdown = e.target.closest('.dropdown');
        if (dropdown) {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'block';
            }
        }
    }
});

document.addEventListener('mouseout', function(e) {
    if (window.innerWidth >= 768) {
        const dropdown = e.target.closest('.dropdown');
        if (dropdown) {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = '';
            }
        }
    }
});

// Search functionality
const searchForm = document.querySelector('.search-bar form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = this.querySelector('input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`); // Replace with actual search functionality
            // searchInput.value = '';
        }
    });
} 