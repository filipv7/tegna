// År i footer
document.getElementById('year').textContent = new Date().getFullYear();

// Priskalkulator
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
  const area = Number(areaEl.value || 0);
  if (!area) {
    totalEl.textContent = "0 kr";
    return;
  }
  totalEl.textContent =
    formatNOK(area * PRICE_PER_M2) +
    (want3dEl.checked ? " + 3D‑tillegg" : "");
}

calcBtn.addEventListener('click', calc);
areaEl.addEventListener('input', calc);
want3dEl.addEventListener('change', calc);

// Scroll + overfør areal
toContactBtn.addEventListener('click', () => {
  if (areaEl.value) {
    document.getElementById('kontakt-areal').value = areaEl.value;
  }
  document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
});

// Mailto‑forespørsel
function sendForesporsel() {
  const navn = document.getElementById('kontakt-navn').value.trim();
  if (!navn) {
    alert("Vennligst skriv inn navnet ditt.");
    return;
  }

  const epost = document.getElementById('kontakt-epost').value;
  const areal = document.getElementById('kontakt-areal').value;
  const besk = document.getElementById('kontakt-beskrivelse').value;

  const body =
`Hei Tegna,

Navn: ${navn}
E-post: ${epost}
Areal: ${areal} m²

Beskrivelse:
${besk}`;

  window.location.href =
    `mailto:post_tegna@yahoo.com?subject=${encodeURIComponent("Forespørsel – byggetegninger")}&body=${encodeURIComponent(body)}`;
}
``
