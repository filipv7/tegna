document.getElementById("year").textContent = new Date().getFullYear();

const PRICE = 100;
const area = document.getElementById("area");
const total = document.getElementById("total");

document.getElementById("calcBtn").onclick = () => {
  const m2 = Number(area.value);
  if (!m2) return;
  total.textContent = (m2 * PRICE).toLocaleString("no-NO") + " kr";
};

document.getElementById("toContact").onclick = () => {
  document.getElementById("kontakt-areal").value = area.value;
  document.getElementById("kontakt").scrollIntoView({behavior:"smooth"});
};

function sendForesporsel(){
  const navn = document.getElementById("kontakt-navn").value;
  if(!navn){ alert("Skriv navn"); return; }

  const body = `
Navn: ${navn}
Epost: ${kontakt-epost.value}
Areal: ${kontakt-areal.value}

${kontakt-beskrivelse.value}
`;
  location.href =
    "mailto:post_tegna@yahoo.com?subject=Forespørsel&body=" +
    encodeURIComponent(body);
}
