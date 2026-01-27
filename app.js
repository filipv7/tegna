// 1. Sett årstall i footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Priskalkulator-logikk
const PRICE_PER_M2 = 100;
const areaEl = document.getElementById('area');
const want3dEl = document.getElementById('want3d');
const totalEl = document.getElementById('total');
const calcBtn = document.getElementById('calcBtn');
const toContactBtn = document.getElementById('toContact');

function formatNOK(n) {
    return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(n);
}

function calc() {
    const area = Math.max(0, Number(areaEl.value || 0));
    const base = area * PRICE_PER_M2;
    totalEl.textContent = formatNOK(base) + (want3dEl.checked ? ' + 3D-tillegg' : '');
}

if (calcBtn) calcBtn.addEventListener('click', calc);
if (areaEl) areaEl.addEventListener('input', calc);
if (want3dEl) want3dEl.addEventListener('change', calc);

// Flytt arealet ned til kontaktskjemaet når man trykker "Gå til bestilling"
if (toContactBtn) {
    toContactBtn.addEventListener('click', () => {
        const arealVal = areaEl.value;
        if (arealVal) {
            document.getElementById('kontakt-areal').value = arealVal;
        }
        document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
    });
}

// 3. E-post-funksjon (Løsningen for GitHub)
function sendForesporsel() {
    const navn = document.getElementById('kontakt-navn').value;
    const epost = document.getElementById('kontakt-epost').value;
    const areal = document.getElementById('kontakt-areal').value;
    const besk = document.getElementById('kontakt-beskrivelse').value;
    const vilHa3D = want3dEl.checked ? "JA" : "Nei";

    if (!navn) {
        alert("Vennligst skriv inn navnet ditt.");
        return;
    }

    const mottaker = "post_tegna@yahoo.com";
    const emne = `Forespørsel tegninger - ${navn}`;
    const kropp = `Hei Tegna,\n\nJeg ønsker et tilbud på tegninger.\n\nNavn: ${navn}\nE-post: ${epost}\nAreal: ${areal} m2\nØnsker 3D: ${vilHa3D}\n\nBeskrivelse:\n${besk}`;

    // Åpner brukerens e-postprogram
    window.location.href = `mailto:${mottaker}?subject=${encodeURIComponent(emne)}&body=${encodeURIComponent(kropp)}`;
}
