const header = document.querySelector("header");
const nav = header?.querySelector("nav");
const main = document.querySelector("main");
const utilityBar = header?.querySelector("nav")?.nextElementSibling;

const atmosphereSection = [...document.querySelectorAll("main section")].find(
  (section) => section.querySelector("h2")?.textContent.includes("Private Suite Experience"),
);

if (main) {
  main.id = "home";
}

if (atmosphereSection) {
  atmosphereSection.id = "atmosphere";
}

const destinations = {
  home: "#home",
  services: "#services-menu",
  atmosphere: "#atmosphere",
  "book-appointment": "#booking-card",
};

document.querySelectorAll("[data-path]").forEach((link) => {
  const destination = destinations[link.dataset.path];
  if (destination) {
    link.setAttribute("href", destination);
  }
});

if (header && nav && utilityBar) {
  nav.classList.remove("hidden", "lg:flex");
  nav.classList.add("mobile-nav");

  const menuButton = document.createElement("button");
  menuButton.className = "mobile-menu-toggle";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">menu</span>';
  utilityBar.prepend(menuButton);

  const menuStyles = document.createElement("style");
  menuStyles.textContent = `
    html { scroll-behavior: smooth; scroll-padding-top: 6rem; }
    .mobile-menu-toggle {
      display: inline-flex; align-items: center; justify-content: center;
      width: 2.5rem; height: 2.5rem; border: 1px solid #4e4639;
      background: transparent; color: #e3e2e6; cursor: pointer;
    }
    @media (max-width: 1023px) {
      header nav.mobile-nav {
        display: none; position: absolute; top: 5rem; left: 0; right: 0;
        padding: 1rem 1.25rem 1.5rem; flex-direction: column; align-items: stretch;
        gap: .75rem; background: #0d0e11; box-shadow: 0 12px 24px #0008;
      }
      header nav.mobile-nav.is-open { display: flex; }
      header nav.mobile-nav a { padding: .5rem 0; }
    }
    @media (min-width: 1024px) {
      header nav.mobile-nav { display: flex; position: static; flex-direction: row; }
      .mobile-menu-toggle { display: none; }
    }
  `;
  document.head.append(menuStyles);

  const setMenuOpen = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.querySelector("span").textContent = isOpen ? "close" : "menu";
  };

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
}

const bookingCard = document.querySelector("#booking-card");
if (bookingCard) {
  const [serviceSelect, daySelect] = bookingCard.querySelectorAll("select");
  const confirmButton = bookingCard.querySelector('button[type="button"]');

  if (serviceSelect && daySelect && confirmButton) {
    serviceSelect.setAttribute("aria-label", "Choose a barbershop service");
    daySelect.setAttribute("aria-label", "Choose a preferred appointment day");

    const status = document.createElement("p");
    status.className = "font-body-sm text-body-sm text-on-surface-variant";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    confirmButton.parentElement.after(status);

    confirmButton.addEventListener("click", () => {
      status.replaceChildren();
      status.append(
        document.createTextNode(
          `Request ${serviceSelect.value} for ${daySelect.value}. Call `,
        ),
      );

      const phoneLink = document.createElement("a");
      phoneLink.href = "tel:5557829782";
      phoneLink.className = "text-primary underline";
      phoneLink.textContent = "(555) 782-9782";
      status.append(phoneLink, document.createTextNode(" to confirm your appointment."));
    });
  }
}
