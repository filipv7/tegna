// 1. Årstall i footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Priskalkulator
const PRICE_PER_M2 = 100;
const areaEl = document.getElementById('area');
const want3dEl = document.getElementById('want3d');
const totalEl = document.getElementById('total');
const calcBtn = document.getElementById('calcBtn');
const toContactBtn = document.getElementById('toContact');

function formatNOK(n) {
  return new Intl.NumberFormat('no-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0
  }).format(n);
}

function calc() {
  const area = Math.max(0, Number(areaEl.value || 0));
  if (!area) {
    totalEl.textContent = "0 kr";
    return;
  }
  const base = area * PRICE_PER_M2;
  totalEl.textContent =
    formatNOK(base) + (want3dEl.checked ? " + 3D‑tillegg" : "");
}

calcBtn?.addEventListener('click', calc);
areaEl?.addEventListener('input', calc);
want3dEl?.addEventListener('change', calc);

// 3. Scroll til forespørsel + fyll areal
toContactBtn?.addEventListener('click', () => {
  if (areaEl.value) {
    document.getElementById('kontakt-areal').value = areaEl.value;
  }
  document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
});

// 4. E‑post (mailto)
function sendForesporsel() {
  const navn = document.getElementById('kontakt-navn').value.trim();
  const epost = document.getElementById('kontakt-epost').value.trim();
  const areal = document.getElementById('kontakt-areal').value.trim();
  const besk = document.getElementById('kontakt-beskrivelse').value.trim();
  const vilHa3D = want3dEl?.checked ? "Ja" : "Nei";

  if (!navn) {
    alert("Vennligst skriv inn navnet ditt.");
    return;
  }

  const mottaker = "post_tegna@yahoo.com";
  const emne = `Forespørsel tegninger – ${navn}`;
  const kropp =
`Hei Tegna,

Jeg ønsker en forespørsel på tegninger.

Navn: ${navn}
E-post: ${epost || "Ikke oppgitt"}
Areal: ${areal || "Ikke oppgitt"} m²
Ønsker 3D: ${vilHa3D}

Beskrivelse:
${besk || "Ikke oppgitt"}
`;

  const mailtoUrl =
    `mailto:${mottaker}?subject=${encodeURIComponent(emne)}&body=${encodeURIComponent(kropp)}`;

  window.location.href = mailtoUrl;

  // Fallback hvis mailklient ikke åpnes
  setTimeout(() => {
    document.getElementById('mailtoFallback')?.removeAttribute('hidden');
  }, 1200);
}
