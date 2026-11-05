
const items = document.querySelectorAll(".gallery-item");
const filters = document.querySelectorAll(".filter");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("caption");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let visibleItems = Array.from(items);
let currentIndex = 0;

// Filter gallery by category
filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(btn => btn.classList.remove("active"));
        filter.classList.add("active");

        const category = filter.dataset.category;

        items.forEach(item => {
            item.style.display =
                category === "all" ||
                item.dataset.category === category
                    ? ""
                    : "none";
        });

        visibleItems = Array.from(items).filter(
            item => item.style.display !== "none"
        );
    });
});

// Display selected image
function openLightbox(index) {
    if (visibleItems.length === 0) return;

    currentIndex =
        (index + visibleItems.length) % visibleItems.length;

    const item = visibleItems[currentIndex];
    const img = item.querySelector("img");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = item.querySelector("h3").textContent;

    lightbox.classList.add("show");
}

// Open image when clicked
items.forEach(item => {
    item.addEventListener("click", () => {
        const index = visibleItems.indexOf(item);

        if (index !== -1) {
            openLightbox(index);
        }
    });
});

// Navigation buttons
nextBtn.addEventListener("click", () => {
    openLightbox(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
    openLightbox(currentIndex - 1);
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        openLightbox(currentIndex + 1);
    } else if (event.key === "ArrowLeft") {
        openLightbox(currentIndex - 1);
    } else if (event.key === "Escape") {
        closeLightbox();
    }
});
