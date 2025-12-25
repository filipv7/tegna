# Tegna – statisk nettside

Dette repoet inneholder en enkel, rask og responsiv statisk nettside for **tegna.no**.

## Struktur
```
index.html
styles.css
app.js
personvern.html
robots.txt
netlify.toml
assets/
  ├─ tegna-logo.png (placeholder – bytt til din logo)
  ├─ tegna-info.jpg (placeholder – bytt til ditt informasjonsbilde)
  └─ favicon.svg
```

## Lokalt
Åpne `index.html` i nettleser.

## Deploy med Netlify (anbefalt)
1. Push til GitHub.
2. I Netlify: **Add new site → Import an existing project** → velg repo → Deploy.
3. Legg til domenet `tegna.no` i **Domain management** og sett DNS (CNAME `www` → Netlify-subdomenet). 
4. Skru på gratis SSL (Let’s Encrypt).

## GitHub Pages (alternativ)
Slå på *Pages* i repoet og pek DNS til GitHub Pages. Merk: For skjema må du bruke Formspree eller Netlify.

## Bytt ut bilder
Erstatt `assets/tegna-logo.png` og `assets/tegna-info.jpg` med dine faktiske filer. Behold filnavnene eller oppdater stiene i `index.html`.

## Skjema
Kontaktskjemaet er klart for Netlify Forms (`data-netlify="true"`). Gå til **Forms** i Netlify for å se innsendinger.

## Lisens
All kode er gitt uten garanti. Innhold og bilder tilhører deg.
