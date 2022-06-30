const nav = document.getElementsByClassName("primary-navigation")[0];
// forma alternativa: const nav1 = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// console.log(nav, navToggle);

// when someone clicks the hamburger button
navToggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");
  const expanded = document.querySelector(".mobile-nav-toggle");
  if (visibility === "false") {
    nav.setAttribute("data-visible", true);
    expanded.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    expanded.setAttribute("aria-expanded", false);
  }

  // console.log(expanded.getAttribute("aria-expanded"));
});
