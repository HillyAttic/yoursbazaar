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
});

// Initialize Image Gallery
function initImageGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || !thumbnails.length) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            const newImageSrc = this.querySelector('img').getAttribute('data-src');
            mainImage.src = newImageSrc;
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
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize Quantity Selector
function initQuantitySelector() {
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (!minusBtn || !plusBtn || !quantityInput) return;
    
    // Decrease quantity
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value, 10);
        value = isNaN(value) ? 1 : value;
        if (value > 1) {
            value--;
            quantityInput.value = value;
        }
    });
    
    // Increase quantity
    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value, 10);
        value = isNaN(value) ? 1 : value;
        if (value < 10) { // Maximum quantity
            value++;
            quantityInput.value = value;
        }
    });
    
    // Validate input
    quantityInput.addEventListener('input', function() {
        let value = parseInt(this.value, 10);
        if (isNaN(value) || value < 1) {
            this.value = 1;
        } else if (value > 10) { // Maximum quantity
            this.value = 10;
        }
    });
}

// Initialize Color Options
function initColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (!colorOptions.length) return;
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Get selected color (you can use this to update product info)
            const selectedColor = this.getAttribute('data-color');
            console.log(`Selected color: ${selectedColor}`);
        });
    });
}

// Initialize Review Rating Selection
function initReviewRating() {
    const stars = document.querySelectorAll('.rating-select i');
    
    if (!stars.length) return;
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', function() {
            // Clear previous rating
            resetStars();
            
            // Set rating up to current star
            for (let i = 0; i <= index; i++) {
                stars[i].classList.remove('far');
                stars[i].classList.add('fas');
            }
        });
        
        star.addEventListener('click', function() {
            // Set the rating value
            const rating = index + 1;
            console.log(`Selected rating: ${rating}`);
            
            // You can add a hidden input field to store the rating
            const ratingInput = document.createElement('input');
            ratingInput.type = 'hidden';
            ratingInput.name = 'rating';
            ratingInput.value = rating;
            
            // Remove existing rating input if any
            const existingInput = document.querySelector('input[name="rating"]');
            if (existingInput) {
                existingInput.parentNode.removeChild(existingInput);
            }
            
            // Add the new rating input
            this.parentNode.appendChild(ratingInput);
        });
    });
    
    // Reset stars on mouseout
    const ratingSelect = document.querySelector('.rating-select');
    if (ratingSelect) {
        ratingSelect.addEventListener('mouseleave', function() {
            resetStars();
            
            // Restore selected rating if any
            const ratingInput = document.querySelector('input[name="rating"]');
            if (ratingInput) {
                const rating = parseInt(ratingInput.value, 10);
                for (let i = 0; i < rating; i++) {
                    stars[i].classList.remove('far');
                    stars[i].classList.add('fas');
                }
            }
        });
    }
    
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
            let selectedColor = '';
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