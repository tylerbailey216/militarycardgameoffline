class MilitaryCard {
    constructor() {
        this.card = document.getElementById('militaryCard');
        this.flipButton = document.getElementById('flipCard');
        
        // Rotation state
        this.rotationX = 0;
        this.rotationY = 0;
        this.isFlipped = false;
        
        // Touch/mouse state
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        
        // Swipe detection
        this.swipeThreshold = 100;
        this.swipeStartX = 0;
        this.swipeStartY = 0;
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.updateCardTransform();
    }
    
    addEventListeners() {
        // Mouse events
        this.card.addEventListener('mousedown', this.handleStart.bind(this));
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleEnd.bind(this));
        
        // Touch events
        this.card.addEventListener('touchstart', this.handleStart.bind(this));
        document.addEventListener('touchmove', this.handleMove.bind(this));
        document.addEventListener('touchend', this.handleEnd.bind(this));
        
        // Flip button
        this.flipButton.addEventListener('click', this.flipCard.bind(this));
        
        // Prevent context menu
        this.card.addEventListener('contextmenu', e => e.preventDefault());
    }
    
    handleStart(e) {
        e.preventDefault();
        this.isDragging = true;
        
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        this.startX = clientX;
        this.startY = clientY;
        this.swipeStartX = clientX;
        this.swipeStartY = clientY;
        
        this.card.style.transition = 'none';
    }
    
    handleMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();

        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        this.currentX = clientX - this.startX;
        this.currentY = clientY - this.startY;

        // Calculate rotation based on movement
        this.rotationY = (this.currentX * 0.5) % 360;
        this.rotationX = -(this.currentY * 0.5) % 360;

        this.updateCardTransform();
        this.updateHoloAndShine(clientX, clientY);
    }

    handleEnd(e) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.card.style.transition = 'transform 0.3s ease';
        
        const endX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
        const swipeDistance = endX - this.swipeStartX;
        
        // Flip card on swipe left or right
        if (Math.abs(swipeDistance) > this.swipeThreshold) {
            this.flipCard();
        }
        
        // Reset to subtle rotation
        setTimeout(() => {
            this.rotationX = Math.random() * 6 - 3;
            this.rotationY = Math.random() * 6 - 3;
            this.updateCardTransform();
        }, 300);
    }
    
    updateCardTransform() {
        const flipRotation = this.isFlipped ? 180 : 0;
        this.card.style.transform = `
            rotateX(${this.rotationX}deg) 
            rotateY(${this.rotationY + flipRotation}deg)
        `;
        this.card.style.webkitTransform = `
            rotateX(${this.rotationX}deg) 
            rotateY(${this.rotationY + flipRotation}deg)
        `;
    }
    
    updateHoloAndShine(clientX, clientY) {
        const cardRect = this.card.getBoundingClientRect();
        const relX = (clientX - cardRect.left) / cardRect.width;
        const relY = (clientY - cardRect.top) / cardRect.height;

        // Move metallic shine
        const shineEls = this.card.querySelectorAll('.metallic-shine');
        shineEls.forEach(shine => {
            shine.style.transform = `translate(${(relX-0.5)*80}%, ${(relY-0.5)*80}%) scale(1.05)`;
            shine.style.opacity = "0.8";
        });

        // Shift holographic overlay hue for color shifting
        const holoEls = this.card.querySelectorAll('.holographic-overlay');
        const hue = Math.round(relX * 360);
        holoEls.forEach(holo => {
            holo.style.filter = `hue-rotate(${hue}deg)`;
        });
    }
    
    flipCard() {
        this.isFlipped = !this.isFlipped;
        this.updateCardTransform();
    }
}

// Initialize the card when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MilitaryCard();
});

// Add some ambient rotation
setInterval(() => {
    const card = document.getElementById('militaryCard');
    if (card && !card.classList.contains('dragging')) {
        const holographicOverlays = document.querySelectorAll('.holographic-overlay');
        holographicOverlays.forEach(overlay => {
            overlay.style.filter = `hue-rotate(${Date.now() * 0.1 % 360}deg)`;
        });
    }
}, 50);
