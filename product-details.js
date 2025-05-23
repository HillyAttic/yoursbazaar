document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery
    initImageGallery();
    
    // Tabs
    initTabs();
    
    // Quantity Selector
    initQuantitySelector();
    
    // Color Options
    initColorOptions();
    
    // Review Rating Selection
    initReviewRating();
    
    // Product Actions
    initProductActions();
    
    // Mobile optimization
    initMobileOptimizations();
});

// Initialize Image Gallery
function initImageGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let selectedColor = 'Black'; // Default color
    
    if (!mainImage || !thumbnails.length) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            const imgSrc = this.querySelector('img').getAttribute('data-src');
            mainImage.src = imgSrc;
            
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Initialize Tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (!tabButtons.length || !tabPanes.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current button and corresponding pane
            const tabId = this.getAttribute('data-tab');
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // In mobile view, scroll to the tab content
            if (window.innerWidth < 768) {
                const tabContent = document.querySelector('.tab-content');
                if (tabContent) {
                    setTimeout(() => {
                        tabContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            }
        });
    });
}

// Initialize Quantity Selector
function initQuantitySelector() {
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (!quantityInput || !minusBtn || !plusBtn) return;
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value, 10);
        value = Math.max(1, value - 1); // Ensure minimum is 1
        quantityInput.value = value;
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value, 10);
        value = Math.min(parseInt(quantityInput.max, 10) || 10, value + 1); // Respect max attribute
        quantityInput.value = value;
    });
    
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value, 10);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (this.max && value > parseInt(this.max, 10)) {
            this.value = this.max;
        }
    });
}

// Initialize Color Options
function initColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    let selectedColor = 'Black'; // Default color
    
    if (!colorOptions.length) return;
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update selected color
            selectedColor = this.getAttribute('data-color');
            console.log('Selected color:', selectedColor);
        });
    });
}

// Initialize Review Rating Selection
function initReviewRating() {
    const ratingSelect = document.querySelector('.rating-select');
    const stars = ratingSelect ? ratingSelect.querySelectorAll('i') : [];
    
    if (!stars.length) return;
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            resetStars();
            
            // Fill stars up to current
            for (let i = 0; i <= index; i++) {
                stars[i].classList.remove('far');
                stars[i].classList.add('fas');
            }
        });
        
        star.addEventListener('click', function() {
            // Set the rating value
            const ratingValue = index + 1;
            
            // Check if input already exists
            let ratingInput = document.querySelector('input[name="rating"]');
            if (!ratingInput) {
                ratingInput = document.createElement('input');
                ratingInput.type = 'hidden';
                ratingInput.name = 'rating';
                ratingSelect.appendChild(ratingInput);
            }
            
            ratingInput.value = ratingValue;
            console.log('Rating selected:', ratingValue);
            
            // Keep stars filled
            resetStars();
            for (let i = 0; i <= index; i++) {
                stars[i].classList.remove('far');
                stars[i].classList.add('fas');
            }
        });
    });
    
    // Reset on mouseleave if no rating selected
    ratingSelect.addEventListener('mouseleave', function() {
        const ratingInput = document.querySelector('input[name="rating"]');
        if (!ratingInput) {
            resetStars();
        } else {
            const rating = parseInt(ratingInput.value, 10);
            resetStars();
            for (let i = 0; i < rating; i++) {
                stars[i].classList.remove('far');
                stars[i].classList.add('fas');
            }
        }
    });
    
    function resetStars() {
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
    }
}

// Initialize Product Actions
function initProductActions() {
    // Add to Cart Button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productTitle = document.querySelector('.product-title').textContent;
            const quantity = document.querySelector('.quantity-input').value;
            
            // Get selected color if available
            let selectedColor = null;
            const activeColor = document.querySelector('.color-option.active');
            if (activeColor) {
                selectedColor = activeColor.getAttribute('data-color');
            }
            
            // Add to cart logic (in a real app, you'd send this to your cart system)
            console.log(`Added to cart: ${quantity} x ${productTitle} (${selectedColor})`);
            alert(`${quantity} x ${productTitle} added to cart!`);
        });
    }
    
    // Buy Now Button
    const buyNowBtn = document.querySelector('.buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            const productTitle = document.querySelector('.product-title').textContent;
            const quantity = document.querySelector('.quantity-input').value;
            
            // In a real app, you'd redirect to checkout
            console.log(`Buy Now: ${quantity} x ${productTitle}`);
            alert(`Proceeding to checkout with ${quantity} x ${productTitle}`);
            // window.location.href = 'checkout.html';
        });
    }
    
    // Wishlist Button
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            // Toggle wishlist icon
            const wishlistIcon = this.querySelector('i');
            wishlistIcon.classList.toggle('far');
            wishlistIcon.classList.toggle('fas');
            
            const productTitle = document.querySelector('.product-title').textContent;
            
            if (wishlistIcon.classList.contains('fas')) {
                console.log(`Added to wishlist: ${productTitle}`);
                alert(`${productTitle} added to your wishlist!`);
            } else {
                console.log(`Removed from wishlist: ${productTitle}`);
                alert(`${productTitle} removed from your wishlist!`);
            }
        });
    }
    
    // Compare Button
    const compareBtn = document.querySelector('.compare-btn');
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            const productTitle = document.querySelector('.product-title').textContent;
            console.log(`Added to compare: ${productTitle}`);
            alert(`${productTitle} added to comparison!`);
        });
    }
    
    // Share Buttons
    const shareButtons = document.querySelectorAll('.social-share');
    if (shareButtons.length) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const platform = this.querySelector('i').className;
                const productTitle = document.querySelector('.product-title').textContent;
                const productUrl = window.location.href;
                
                // In a real app, you'd implement actual sharing functionality
                console.log(`Sharing ${productTitle} on ${platform}: ${productUrl}`);
                alert(`Sharing on ${platform} (demo functionality)`);
            });
        });
    }
    
    // Load More Reviews Button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real app, you'd load more reviews from the server
            console.log('Loading more reviews...');
            alert('Loading more reviews... (demo functionality)');
        });
    }
    
    // Submit Review Form
    const reviewForm = document.querySelector('.review-form form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const titleInput = this.querySelector('input[placeholder="Give your review a title"]');
            const contentTextarea = this.querySelector('textarea');
            const nameInput = this.querySelector('input[placeholder="Your name"]');
            const ratingInput = document.querySelector('input[name="rating"]');
            
            if (!titleInput.value || !contentTextarea.value || !nameInput.value || !ratingInput) {
                alert('Please fill all fields and provide a rating.');
                return;
            }
            
            const reviewData = {
                title: titleInput.value,
                content: contentTextarea.value,
                name: nameInput.value,
                rating: parseInt(ratingInput.value, 10),
                date: new Date().toLocaleDateString()
            };
            
            console.log('Review submitted:', reviewData);
            
            // In a real app, you'd send this to your server
            alert('Thank you for your review! It will be visible after moderation.');
            
            // Reset form
            this.reset();
            document.querySelectorAll('.rating-select i').forEach(star => {
                star.classList.remove('fas');
                star.classList.add('far');
            });
            if (ratingInput) {
                ratingInput.parentNode.removeChild(ratingInput);
            }
        });
    }
}

// Mobile optimizations
function initMobileOptimizations() {
    // Handle tab scroll behavior for better mobile experience
    const tabsNav = document.querySelector('.tabs-nav');
    
    if (tabsNav && window.innerWidth < 768) {
        // Center active tab in scrollable tab navigation on page load
        const activeTab = tabsNav.querySelector('.tab-btn.active');
        if (activeTab) {
            setTimeout(() => {
                tabsNav.scrollLeft = activeTab.offsetLeft - (tabsNav.clientWidth / 2) + (activeTab.offsetWidth / 2);
            }, 100);
        }
        
        // Handle horizontal tab scrolling with drag
        let isDown = false;
        let startX;
        let scrollLeft;

        tabsNav.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - tabsNav.offsetLeft;
            scrollLeft = tabsNav.scrollLeft;
        });

        tabsNav.addEventListener('mouseleave', () => {
            isDown = false;
        });

        tabsNav.addEventListener('mouseup', () => {
            isDown = false;
        });

        tabsNav.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - tabsNav.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            tabsNav.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        tabsNav.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - tabsNav.offsetLeft;
            scrollLeft = tabsNav.scrollLeft;
        }, { passive: true });

        tabsNav.addEventListener('touchend', () => {
            isDown = false;
        });

        tabsNav.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - tabsNav.offsetLeft;
            const walk = (x - startX) * 2;
            tabsNav.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    }
    
    // Improve thumbnail gallery behavior on mobile
    const thumbnails = document.querySelector('.image-thumbnails');
    if (thumbnails && window.innerWidth < 576) {
        // Similar drag scroll behavior for thumbnails on small screens
        let isDown = false;
        let startX;
        let scrollLeft;

        thumbnails.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - thumbnails.offsetLeft;
            scrollLeft = thumbnails.scrollLeft;
        });

        thumbnails.addEventListener('mouseleave', () => {
            isDown = false;
        });

        thumbnails.addEventListener('mouseup', () => {
            isDown = false;
        });

        thumbnails.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - thumbnails.offsetLeft;
            const walk = (x - startX) * 2;
            thumbnails.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events
        thumbnails.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - thumbnails.offsetLeft;
            scrollLeft = thumbnails.scrollLeft;
        }, { passive: true });

        thumbnails.addEventListener('touchend', () => {
            isDown = false;
        });

        thumbnails.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - thumbnails.offsetLeft;
            const walk = (x - startX) * 2;
            thumbnails.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    }
} 