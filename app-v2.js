document.addEventListener("DOMContentLoaded", () => {
  // ===== 1) Footer year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== 2) Price Calculator =====
  const PRICE_PER_M2 = 100;
  const areaEl = document.getElementById("area");
  const want3dEl = document.getElementById("want3d");
  const totalEl = document.getElementById("total");
  const calcBtn = document.getElementById("calcBtn");
  const toContactBtn = document.getElementById("toContact");

  function formatNOK(n) {
    return new Intl.NumberFormat("nb-NO", {
      style: "currency",
      currency: "NOK",
      maximumFractionDigits: 0
    }).format(n);
  }

  function calc() {
    if (!areaEl || !totalEl) return;

    const area = Math.max(0, Number(areaEl.value || 0));
    const base = area * PRICE_PER_M2;
    const want3d = !!(want3dEl && want3dEl.checked);

    if (area === 0) {
      totalEl.textContent = "0 kr";
    } else {
      totalEl.textContent = formatNOK(base) + (want3d ? " + 3D-tillegg" : "");
    }
  }

  if (calcBtn) calcBtn.addEventListener("click", calc);
  if (areaEl) {
    areaEl.addEventListener("input", calc);
    // Auto-calculate on input
    areaEl.addEventListener("input", () => {
      if (areaEl.value) calc();
    });
  }
  if (want3dEl) want3dEl.addEventListener("change", calc);

  // "Gå til bestilling" - scroll to contact and pre-fill area
  if (toContactBtn) {
    toContactBtn.addEventListener("click", () => {
      const arealVal = areaEl?.value;
      const kontaktArealEl = document.getElementById("kontakt-areal");
      if (kontaktArealEl && arealVal) kontaktArealEl.value = arealVal;

      const contactSection = document.getElementById("kontakt");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // ===== 3) Contact form - Email generation =====
  window.sendForesporsel = function() {
    const navn = document.getElementById("kontakt-navn")?.value?.trim() || "";
    const epost = document.getElementById("kontakt-epost")?.value?.trim() || "";
    const telefon = document.getElementById("kontakt-telefon")?.value?.trim() || "";
    const areal = document.getElementById("kontakt-areal")?.value?.trim() || "";
    const besk = document.getElementById("kontakt-beskrivelse")?.value?.trim() || "";
    const vilHa3D = want3dEl?.checked ? "Ja" : "Nei";

    if (!navn) {
      alert("Vennligst skriv inn navnet ditt.");
      return;
    }

    if (!besk) {
      alert("Vennligst beskriv prosjektet ditt kort.");
      return;
    }

    const mottaker = "post_tegna@yahoo.com";
    const emne = `Forespørsel tegninger - ${navn}`;
    const kropp =
      `Hei Tegna,\n\n` +
      `Jeg ønsker et tilbud på tegninger til byggesøknad.\n\n` +
      `--- KONTAKTINFORMASJON ---\n` +
      `Navn: ${navn}\n` +
      `E-post: ${epost || "Ikke oppgitt"}\n` +
      `Telefon: ${telefon || "Ikke oppgitt"}\n\n` +
      `--- PROSJEKTDETALJER ---\n` +
      `Bruksareal: ${areal || "Ikke oppgitt"} m²\n` +
      `Ønsker 3D-illustrasjoner: ${vilHa3D}\n\n` +
      `Beskrivelse:\n${besk}\n\n` +
      `---\n` +
      `Sendt fra tegna.no`;

    window.location.href =
      `mailto:${mottaker}` +
      `?subject=${encodeURIComponent(emne)}` +
      `&body=${encodeURIComponent(kropp)}`;
  };

  // ===== 4) Image Modal =====
  window.openModal = function(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    if (!modal || !modalImg) return;

    modal.classList.add("active");
    modalImg.src = src;
    document.body.style.overflow = "hidden"; // Prevent scroll
  };

  window.closeModal = function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    if (!modal) return;

    modal.classList.remove("active");
    if (modalImg) modalImg.src = "";
    document.body.style.overflow = ""; // Restore scroll
  };

  // Escape key closes modal
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  // ===== 5) Mobile Menu Toggle =====
  window.toggleMobileMenu = function() {
    const mobileNav = document.getElementById("mobileNav");
    if (mobileNav) {
      mobileNav.classList.toggle("active");
    }
  };

  window.closeMobileMenu = function() {
    const mobileNav = document.getElementById("mobileNav");
    if (mobileNav) {
      mobileNav.classList.remove("active");
    }
  };

  // ===== 6) FAQ Accordion =====
  window.toggleFAQ = function(button) {
    const faqItem = button.closest(".faq-item");
    const isActive = faqItem.classList.contains("active");
    
    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach(item => {
      item.classList.remove("active");
    });
    
    // Toggle clicked item
    if (!isActive) {
      faqItem.classList.add("active");
    }
  };

  // ===== 7) Scroll Animations =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all fade-in sections
  document.querySelectorAll(".fade-in-section").forEach(section => {
    observer.observe(section);
  });

  // ===== 8) Back to Top Button =====
  const backToTopBtn = document.getElementById("backToTop");
  
  window.scrollToTop = function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Show/hide back to top button on scroll
  window.addEventListener("scroll", () => {
    if (backToTopBtn) {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  // ===== 9) Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      
      // Skip if it's just "#"
      if (href === "#") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to target with offset for sticky header
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // ===== 10) Header Shadow on Scroll =====
  const header = document.querySelector(".site-header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
      if (currentScroll > 50) {
        header.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
      } else {
        header.style.boxShadow = "0 1px 2px 0 rgb(0 0 0 / 0.05)";
      }
    }
    
    lastScroll = currentScroll;
  });

  // ===== 11) Form Validation Enhancement =====
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    const requiredInputs = contactForm.querySelectorAll("[required]");
    
    requiredInputs.forEach(input => {
      input.addEventListener("invalid", (e) => {
        e.preventDefault();
        input.classList.add("error");
      });
      
      input.addEventListener("input", () => {
        if (input.validity.valid) {
          input.classList.remove("error");
        }
      });
    });
  }

  // ===== 12) Auto-focus first input in contact section when scrolled to =====
  const contactSection = document.getElementById("kontakt");
  if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const firstInput = document.getElementById("kontakt-navn");
          // Only focus if user came from "Gå til bestilling" button
          if (firstInput && document.activeElement.tagName === "BUTTON") {
            setTimeout(() => firstInput.focus(), 500);
          }
        }
      });
    }, { threshold: 0.5 });
    
    contactObserver.observe(contactSection);
  }

  // ===== 13) Performance: Lazy load images (if needed in future) =====
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Observe images with data-src attribute
    document.querySelectorAll("img[data-src]").forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===== Console greeting =====
  console.log("%c🏡 Tegna.no - Tegninger til byggesøknad", "font-size: 16px; font-weight: bold; color: #0ea5e9;");
  console.log("%cLaget med ❤️ for best mulig brukeropplevelse", "font-size: 12px; color: #6b7280;");
});
