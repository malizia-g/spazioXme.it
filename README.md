# SpazioxMe — sito web

Sito statico di **SpazioxMe**, uno spazio di crescita personale a Segesta, Milano
(yoga, meditazione, pilates, respirazione olotropica, counseling gestalt, cerchi).
Generato con **[Eleventy (11ty)](https://www.11ty.dev/)** v3, senza backend.

---

## Requisiti

- **Node.js ≥ 18** (consigliato 22, vedi `.nvmrc`).
- **npm**.

## Lavorare in locale

```bash
nvm use            # usa la versione Node di .nvmrc (opzionale)
npm install        # installa le dipendenze
npm start          # server di sviluppo con live reload su http://localhost:8080
npm run build      # build di produzione in dist/
npm run clean      # elimina dist/
```

---

## Struttura del progetto

```
src/
├── _data/           site.json · nav.json · pratiche.json  (dati globali)
├── _includes/
│   ├── layouts/     base · page · post
│   └── partials/    head-seo · header · footer · breadcrumbs · practice-card · icons · cookie-banner
├── assets/          css/ · js/ · fonts/ (self-hosted woff2) · images/
├── diario/posts/    articoli del Diario in Markdown
├── pratiche/        index + pratica.njk (genera 1 pagina per pratica)
├── index.njk        Home
├── lo-spazio.njk · collaborazioni.njk · contatti.njk · privacy.njk · cookie-policy.njk
├── grazie.njk       pagina di conferma invio moduli (noindex)
├── 404.njk · sitemap.njk · robots.njk · feed.njk
```

Output generato in `dist/` (non versionato).

---

## Come aggiungere un articolo al Diario

1. Crea un file Markdown in `src/diario/posts/`, con nome `AAAA-MM-GG-titolo-slug.md`.
2. Inserisci il front matter:

   ```yaml
   ---
   title: "Titolo dell'articolo"
   description: "Descrizione breve per SEO e anteprima (~150 caratteri)."
   date: 2026-05-01
   image: /assets/images/nome-immagine.jpg
   imageAlt: "Testo alternativo descrittivo dell'immagine"
   tags:
     - argomento
   ---
   ```

3. Scrivi il contenuto in Markdown. `layout`, `permalink` e breadcrumb sono applicati
   automaticamente da `src/diario/posts/posts.json`.
4. L'articolo compare da solo nell'elenco del Diario, nell'anteprima in home, nel feed RSS
   e nella sitemap.

### Idee per altri articoli (dal brief)

- Counseling gestalt: 5 domande per capire se fa per te
- Respirare meglio: 3 esercizi da fare a casa
- Perché il corpo ricorda ciò che la mente dimentica
- Yoga per chi pensa di non essere portato
- La nostra storia: da Segesta, dal 2024, con nuove anime
- Meditare quando la testa non si ferma: da dove iniziare

---

## Come aggiungere o modificare una pratica

Modifica `src/_data/pratiche.json`. Ogni oggetto dell'array genera automaticamente la pagina
`/pratiche/<slug>/` e la card nell'indice e in home. Campi:

```jsonc
{
  "ordine": 7,                       // ordine di visualizzazione
  "slug": "nuova-pratica",           // determina l'URL /pratiche/nuova-pratica/
  "titolo": "Nuova pratica",
  "sottotitolo": "Una riga di sintesi",
  "descrizione": "Testo descrittivo…",
  "aChiRivolto": "A chi si rivolge…",
  "infoPratiche": {
    "giorniOrari": "…", "durata": "…", "costo": "…", "iscrizione": "…"
  },
  "icona": "respiro",                // vedi partials/icons.njk per i nomi disponibili
  "immagine": "/assets/images/pratica-nuova.jpg"
}
```

---

## Immagini

Le immagini presenti sono **foto reali dello spazio** (proprietà di SpazioxMe). Gli
originali ad alta risoluzione sono archiviati e organizzati per tema nella cartella
`SpazioXME/` (`ambienti/`, `meditazione-e-cerchi/`, `dettagli/`); vedi
`CREDITS-IMMAGINI.md` per la corrispondenza tra ogni file del sito e la foto sorgente.
Per aggiornare una foto, sostituisci il file in `src/assets/images/` mantenendo lo
stesso nome.

La pipeline `@11ty/eleventy-img` genera automaticamente in build le versioni AVIF/WebP/JPEG
e le larghezze responsive: basta fornire l'originale ad alta risoluzione (lato lungo ≥ 2000px
per l'hero, ≥ 1400px per gallerie e articoli). Non ottimizzare a mano.

Shotlist e specifiche complete: vedi `PROJECT.md` §15.

---

## Moduli (form)

I moduli di **Contatti** e **Collaborazioni** usano **Netlify Forms** (attributo
`data-netlify="true"`), con honeypot anti-spam e casella di consenso privacy obbligatoria.
Funzionano solo una volta pubblicato il sito su Netlify; in locale l'invio non è attivo.
Dopo l'invio l'utente viene reindirizzato a `/grazie/`.

Le notifiche di ricezione si configurano nel pannello Netlify (Forms → Notifications).

---

## Privacy e cookie

- Il sito usa solo **cookie tecnici**. La mappa OpenStreetMap in Contatti è caricata **solo
  dopo il consenso** (banner cookie, gestito da `assets/js/consent.js`, scelta memorizzata in
  `localStorage`).
- Pagine legali: `/privacy/` e `/cookie-policy/`. Contengono **placeholder** da completare
  (vedi sotto).

---

## Deploy

Il flusso di pubblicazione usa una **GitHub Action** (`.github/workflows/build-deploy.yml`):

```
push su  staging  ──▶  Action: npm ci + npm run build  ──▶  push di dist/ sul branch  deploy
```

- Il branch **`staging`** contiene il **sorgente** (questo repo). Ogni push su `staging`
  fa partire la build.
- Il branch **`deploy`** contiene **solo l'output statico già buildato** (il contenuto di
  `dist/`), pronto da servire senza ulteriori build.
- L'hosting (Netlify o Cloudflare Pages) va configurato per **servire il branch `deploy`**
  come sito statico, **senza comando di build**, con publish directory = root del branch.
- Gli header di sicurezza (CSP ecc.) e i redirect viaggiano con l'output tramite i file
  `_headers` e `_redirects` generati dentro `dist/` (quindi presenti sul branch `deploy`).
- Dominio finale: `spazioxme.it` (URL canonico: `https://www.spazioxme.it`), redirect apex → www.

> Il file `netlify.toml` alla radice resta disponibile per lo scenario alternativo in cui
> Netlify builda **direttamente** dal sorgente (base branch `staging`/`main`, build
> `npm run build`, publish `dist`), senza usare il branch `deploy`.

La Action si può lanciare anche manualmente da GitHub (**Actions → Build 11ty e deploy →
Run workflow**).

---

## Placeholder da completare (per il committente)

Cerca nel codice le stringhe tra parentesi quadre `[...]`. Da fornire/aggiornare:

- **`src/_data/site.json`**: indirizzo (via, numero, CAP), email, telefono/WhatsApp, orari,
  eventuale link Google Business.
- **Lo Spazio** (`lo-spazio.njk`): nomi, discipline, presentazioni e foto dei conduttori;
  indirizzo e indicazioni per raggiungere lo spazio.
- **Pratiche** (`_data/pratiche.json`): per ogni pratica giorni/orari, durata, costo, modalità
  di iscrizione.
- **Contatti** (`contatti.njk`): indirizzo e orari.
- **Legali** (`privacy.njk`, `cookie-policy.njk`): titolare del trattamento, dati raccolti,
  finalità, strumenti di terze parti, periodo di conservazione, data di aggiornamento.
- **Immagini**: foto reali dello spazio già in uso; per aggiornarle sostituire i file in `src/assets/images/` (stessi nomi).
- **Logo**: se disponibile in SVG, sostituire il logo testuale nell'header.

---

*Per la specifica completa del progetto vedi `PROJECT.md`.*
