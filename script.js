// ORDER NOW button action
document.querySelector(".order-btn")?.addEventListener("click", () => {
  alert("Thank you for your interest! Our team will contact you shortly.");
});

// Navbar link log to console
document.querySelectorAll(".navbar nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(`You clicked: ${link.textContent}`);
  });
});

// Smooth scrolling for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Form submission for uploading documents
<form id="uploadForm" enctype="multipart/form-data">
  <label>
    <span>Name</span>
    <input type="text" id="name" name="name" placeholder="Your name" required />
  </label>

  <label>
    <span>Upload Your Image</span>
    <input type="file" id="document" name="document" required />
  </label>

  <button class="btn-primary btn-submit" type="submit">
    Submit brief
    <i class="fa-solid fa-paper-plane"></i>
  </button>
</form>
  