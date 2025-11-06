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

document.addEventListener("DOMContentLoaded", function () {

    if (window.innerWidth <= 768) {
        console.log("Mobile detected — carousel disabled for stacked view");
        return;
    }

    const carousels = document.querySelectorAll("#accomplishments .carousel-container");

    carousels.forEach(container => {
        const carousel = container.querySelector(".carousel");
        const slides = container.querySelectorAll(".slide");
        const nextBtn = container.querySelector(".carousel-btn.next");
        const prevBtn = container.querySelector(".carousel-btn.prev");

        let index = 0;
        const totalSlides = slides.length;

        // Clone first and last slides for seamless looping
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);

        firstClone.classList.add("clone");
        lastClone.classList.add("clone");

        carousel.appendChild(firstClone);
        carousel.insertBefore(lastClone, slides[0]);

        const allSlides = container.querySelectorAll(".slide");
        let slideWidth = allSlides[0].clientWidth;

        index = 1;
        carousel.style.transform = `translateX(${-slideWidth * index}px)`;

        function moveToSlide() {
            carousel.style.transition = "transform 0.45s ease-in-out";
            carousel.style.transform = `translateX(${-slideWidth * index}px)`;
        }

        carousel.addEventListener("transitionend", () => {
            if (allSlides[index].classList.contains("clone")) {
                carousel.style.transition = "none";
                if (index === allSlides.length - 1) {
                    index = 1;
                } else if (index === 0) {
                    index = allSlides.length - 2;
                }
                carousel.style.transform = `translateX(${-slideWidth * index}px)`;
            }
        });

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

        // Auto-slide only on desktop
        setInterval(() => {
            if (index >= allSlides.length - 1) return;
            index++;
            moveToSlide();
        }, 8000);

        window.addEventListener("resize", () => {
            slideWidth = allSlides[0].clientWidth;
            carousel.style.transition = "none";
            carousel.style.transform = `translateX(${-slideWidth * index}px)`;
        });
    });
});
