// Basic smooth scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.experience-item, .project-item, .blog-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    items.forEach((item) => {
        observer.observe(item);
    });
});

// Multiple Carousel Support - Seamless Infinite Sliding
document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll("#accomplishments .carousel-container");


    carousels.forEach(container => {
        const carousel = container.querySelector(".carousel");
        const slides = container.querySelectorAll(".slide");
        const nextBtn = container.querySelector(".carousel-btn.next");
        const prevBtn = container.querySelector(".carousel-btn.prev");

        let index = 0;
        const totalSlides = slides.length;

        // Clone first and last slides for smooth looping
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);

        firstClone.classList.add("clone");
        lastClone.classList.add("clone");

        // Add clones at ends
        carousel.appendChild(firstClone);
        carousel.insertBefore(lastClone, slides[0]);

        // Adjust position to show first real slide initially
        const allSlides = container.querySelectorAll(".slide");
        let slideWidth = allSlides[0].clientWidth;
        index = 1;
        carousel.style.transform = `translateX(${-slideWidth * index}px)`;

        // Function to move slides
        function moveToSlide() {
            carousel.style.transition = "transform 0.45s ease-in-out";
            carousel.style.transform = `translateX(${-slideWidth * index}px)`;
        }

        // When transition ends, reset seamlessly
        carousel.addEventListener("transitionend", () => {
            if (allSlides[index].classList.contains("clone")) {
                carousel.style.transition = "none";
                if (index === allSlides.length - 1) {
                    index = 1; // back to first real slide
                } else if (index === 0) {
                    index = allSlides.length - 2; // last real slide
                }
                carousel.style.transform = `translateX(${-slideWidth * index}px)`;
            }
        });

        // Buttons
        nextBtn.addEventListener("click", () => {
            if (index >= allSlides.length - 1) return;
            index++;
            moveToSlide();
        });

        prevBtn.addEventListener("click", () => {
            if (index <= 0) return;
            index--;
            moveToSlide();
        });

        setInterval(() => {
            if (index >= allSlides.length - 1) return;
            index++;
            moveToSlide();
        }, 8000);


        // Adjust on resize
        window.addEventListener("resize", () => {
            slideWidth = allSlides[0].clientWidth;
            carousel.style.transition = "none";
            carousel.style.transform = `translateX(${-slideWidth * index}px)`;
        });
    });
});
