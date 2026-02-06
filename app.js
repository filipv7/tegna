document.addEventListener("DOMContentLoaded", () => {
  // 1. Sett årstall i footer (sikkert)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Priskalkulator-logikk
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
      maximumFractionDigits: 0,
    }).format(n);
  }

  function calc() {
    if (!areaEl || !totalEl) return;

    const area = Math.max(0, Number(areaEl.value || 0));
    const base = area * PRICE_PER_M2;
    const want3d = !!(want3dEl && want3dEl.checked);

    totalEl.textContent = formatNOK(base) + (want3d ? " + 3D-tillegg" : "");
  }

  if (calcBtn) calcBtn.addEventListener("click", calc);
  if (areaEl) areaEl.addEventListener("input", calc);
  if (want3dEl) want3dEl.addEventListener("change", calc);

  // Flytt arealet ned til kontaktskjemaet når man trykker "Gå til bestilling"
  if (toContactBtn) {
    toContactBtn.addEventListener("click", () => {
      const arealVal = areaEl?.value;
      const kontaktArealEl = document.getElementById("kontakt-areal");
      if (kontaktArealEl && arealVal) kontaktArealEl.value = arealVal;

      document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 3. E-post-funksjon (mailto)
  function sendForesporsel() {
    const navn = document.getElementById("kontakt-navn")?.value?.trim() || "";
    const epost = document.getElementById("kontakt-epost")?.value?.trim() || "";
    const areal = document.getElementById("kontakt-areal")?.value?.trim() || "";
    const besk = document.getElementById("kontakt-beskrivelse")?.value?.trim() || "";
    const vilHa3D = want3dEl?.checked ? "JA" : "Nei";

    if (!navn) {
      alert("Vennligst skriv inn navnet ditt.");
      return;
    }

    const mottaker = "post_tegna@yahoo.com";
    const emne = `Forespørsel tegninger - ${navn}`;
    const kropp =
      `Hei Tegna,\n\n` +
      `Jeg ønsker et tilbud på tegninger.\n\n` +
      `Navn: ${navn}\n` +
      `E-post: ${epost || "-"}\n` +
      `Areal: ${areal || "-"} m2\n` +
      `Ønsker 3D: ${vilHa3D}\n\n` +
      `Beskrivelse:\n${besk || "-"}`;

    // VIKTIG: her skal det være &body= (IKKE &amp;body=)
    window.location.href =
      `mailto:${mottaker}` +
      `?subject=${encodeURIComponent(emne)}` +
      `&body=${encodeURIComponent(kropp)}`;
  }

  // 4. Modal functions for image gallery
  function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    if (!modal || !modalImg) return;

    modal.classList.add("active");
    modalImg.src = src;
  }

  function closeModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    if (!modal) return;

    modal.classList.remove("active");
    if (modalImg) modalImg.src = "";
  }

  // Close modal when pressing Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  // Gjør funksjoner tilgjengelige for inline onclick i HTML
  window.sendForesporsel = sendForesporsel;
  window.openModal = openModal;
  window.closeModal = closeModal;
});
