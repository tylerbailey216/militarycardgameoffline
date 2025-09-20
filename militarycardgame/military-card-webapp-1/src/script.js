document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('militaryCard');
    const flipButton = document.getElementById('flipCard');

    flipButton.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    let isDragging = false;
    let startX, startY;

    card.addEventListener('touchstart', (event) => {
        isDragging = true;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });

    card.addEventListener('touchmove', (event) => {
        if (!isDragging) return;

        const deltaX = event.touches[0].clientX - startX;
        const deltaY = event.touches[0].clientY - startY;

        card.style.transform = `rotateY(${deltaX / 5}deg) rotateX(${deltaY / 5}deg)`;
    });

    card.addEventListener('touchend', () => {
        isDragging = false;
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});