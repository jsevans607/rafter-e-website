const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }));
}

document.querySelectorAll("[data-comparison]").forEach(comparison => {
  const range = comparison.querySelector('input[type="range"]');
  const beforeWrap = comparison.querySelector(".comparison-before-wrap");
  const handle = comparison.querySelector(".handle");
  const update = () => {
    const value = range.value;
    beforeWrap.style.width = value + "%";
    handle.style.left = value + "%";
  };
  range.addEventListener("input", update);
  update();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".dropdown-toggle").forEach(button => {
  button.addEventListener("click", event => {
    event.stopPropagation();
    const dropdown = button.closest(".nav-dropdown");
    const open = dropdown.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
});
document.addEventListener("click", () => {
  document.querySelectorAll(".nav-dropdown.open").forEach(dropdown => {
    dropdown.classList.remove("open");
    const button = dropdown.querySelector(".dropdown-toggle");
    if (button) button.setAttribute("aria-expanded", "false");
  });
});
