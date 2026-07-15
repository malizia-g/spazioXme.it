# SpazioxMe — Sito web statico con Eleventy (11ty)

> **Project brief per l'agente di sviluppo (Claude Sonnet).**
> Questo documento è la specifica completa del sito. Contiene obiettivi, identità, stack tecnico, struttura del repository, contenuti pronti e una **task list dettagliata e sequenziale** da eseguire. Segui le fasi nell'ordine indicato, committa a piccoli passi e verifica ogni fase contro i criteri di accettazione (§13).

---

## 1. Obiettivo del progetto

Realizzare il sito web di **SpazioxMe**, uno spazio di crescita personale a Milano (zona Segesta) che propone yoga, meditazione e respirazione, pilates e movimento consapevole, respirazione olotropica, counseling gestalt e cerchi di gruppo.

Il sito deve essere:

- **Statico e veloce** — generato con Eleventy (11ty), nessun backend, hosting su CDN.
- **Ottimizzato per la SEO** — in particolare SEO locale (Milano/Segesta), dati strutturati, performance.
- **Accessibile** (WCAG 2.1 AA) e **responsive** (mobile-first).
- **Facile da aggiornare** — il blog e le pratiche gestiti tramite file Markdown e file di dati, senza toccare i template.
- **Caldo e curato** nell'estetica, coerente con l'identità del brand.

Pubblico: persone di Milano e dintorni interessate al benessere, alla crescita personale e a pratiche di corpo/respiro; inoltre facilitatori/professionisti interessati a collaborare.

---

## 2. Funzionalità richieste

1. **Home** — presentazione dello spazio, panoramica pratiche, valori, anteprima blog, inviti al contatto.
2. **Lo Spazio** — chi siamo, storia, valori, il luogo, i conduttori.
3. **Pratiche & Percorsi** — pagina indice + una pagina dedicata per ogni pratica (generate da un file dati).
4. **Diario (blog)** — elenco articoli + articoli singoli, scritti in Markdown; feed RSS.
5. **Collaborazioni** — pagina per facilitatori/professionisti, con modulo dedicato.
6. **Contatti** — recapiti, modulo di contatto (con consenso privacy), mappa, social.
7. **Privacy Policy** e **Cookie Policy** (obbligatorie GDPR).
8. **Funzioni trasversali**: menu responsive, SEO completa, dati strutturati, sitemap, RSS, ottimizzazione immagini, form gestiti da servizio esterno.

---

## 3. Identità visiva e tono

**Palette (CSS custom properties):**

| Ruolo | Nome | HEX |
|---|---|---|
| Primario | Verde petrolio | `#17817A` |
| Secondario | Blu navy | `#1C2B4A` |
| Sfondo | Panna/avorio | `#FAF7F2` |
| Accento | Sabbia/terracotta | `#B07D48` |
| Testo | Grigio scuro | `#3A3A3A` |

**Font (Google Fonts, self-hosted per performance):**

- Titoli: **Cormorant Garamond** (serif elegante).
- Testo: **Nunito Sans** (sans-serif leggibile).
- Caricare solo i pesi usati (es. 400/600/700), in formato `woff2`, con `font-display: swap` e `preload` del font principale.

**Stile fotografico:** foto reali dello spazio — sala luminosa in appartamento milanese d'epoca (soffitti alti, cornici, grandi finestre con tende chiare), tatami blu, panchetti da meditazione, piante, libreria, luce naturale calda. Trattamento: naturale, caldo, poco saturo. **Le immagini vanno fornite dal committente** (proprietario dello spazio); non usare foto prese da Google Maps o da terzi per motivi di copyright. Predisporre placeholder finché non arrivano.

**Tono di voce:** caldo, accogliente, diretto, si dà del "tu". Umano e concreto, mai clinico. Ammesso un tocco di leggerezza. Inviti gentili all'azione ("scrivici", "vieni a trovarci", "prenota un primo incontro").

---

## 4. Stack tecnico

- **Generatore:** Eleventy (`@11ty/eleventy`) v3.x, output in `dist/`.
- **Template engine:** Nunjucks (`.njk`) per layout e pagine; **Markdown** (`.md`) per gli articoli del blog.
- **Stile:** CSS moderno con custom properties (variabili) e `clamp()` per la tipografia fluida. Nessun framework CSS pesante. Ammesso PostCSS per autoprefixer + minificazione. Mobile-first.
- **JavaScript:** minimo e in progressive enhancement (solo per: toggle menu mobile, eventuale lazy-loading di dettaglio). Nessun framework front-end (no React/Vue).
- **Plugin Eleventy consigliati:**
  - `@11ty/eleventy-img` — immagini responsive (AVIF/WebP/fallback), lazy loading.
  - `@11ty/eleventy-plugin-rss` — feed del Diario.
  - `@11ty/eleventy-navigation` — menu e breadcrumb dai front matter.
  - `markdown-it` + `markdown-it-anchor` — rendering Markdown con ancore nei titoli.
  - (opzionale) `@11ty/eleventy-plugin-syntaxhighlight` non necessario.
- **Form:** il sito è statico → usare un servizio esterno per il modulo (scegliere **uno**): Netlify Forms (se hosting Netlify), **Formspree** o **Web3Forms**. Con protezione anti-spam (honeypot + eventuale captcha del servizio) e casella di consenso privacy obbligatoria.
- **Hosting/deploy:** repository GitHub → **Netlify** o **Cloudflare Pages** (build automatica ad ogni push). Dominio finale: `spazioxme.it`.
- **Node:** LTS (>=18). Gestione dipendenze con `npm`. Definire `.nvmrc`.

---

## 5. Struttura del repository

```
spazioxme/
├── .eleventy.js                 # configurazione Eleventy
├── .nvmrc
├── .gitignore
├── package.json
├── netlify.toml                 # (o config Cloudflare Pages)
├── README.md
└── src/
    ├── _data/
    │   ├── site.json            # metadati globali (nome, url, lang, social, NAP)
    │   ├── nav.json             # voci di menu (fallback se non si usa eleventy-navigation)
    │   └── pratiche.json        # elenco pratiche (guida la generazione delle pagine)
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.njk         # <html>, <head> (SEO), header, footer
    │   │   ├── page.njk         # layout pagina standard
    │   │   └── post.njk         # layout articolo del Diario
    │   └── partials/
    │       ├── head-seo.njk     # meta, OG, Twitter, canonical, JSON-LD
    │       ├── header.njk       # logo + menu responsive
    │       ├── footer.njk       # contatti, social, link legali
    │       ├── practice-card.njk
    │       └── breadcrumbs.njk
    ├── assets/
    │   ├── css/style.css
    │   ├── js/menu.js
    │   ├── fonts/               # woff2 self-hosted
    │   └── images/              # foto reali + og-images (placeholder iniziali)
    ├── index.njk                # Home
    ├── lo-spazio.njk
    ├── pratiche/
    │   ├── index.njk            # pagina indice pratiche
    │   └── pratica.njk          # template paginato: genera 1 pagina per pratica da pratiche.json
    ├── diario/
    │   ├── index.njk            # elenco articoli
    │   └── posts/               # articoli in Markdown (.md con front matter)
    │       └── 2026-... .md
    ├── collaborazioni.njk
    ├── contatti.njk
    ├── privacy.njk
    ├── cookie-policy.njk
    ├── 404.njk
    ├── sitemap.njk              # genera sitemap.xml
    └── robots.njk              # genera robots.txt
```

---

## 6. Architettura dei contenuti

- **`site.json`** — dati globali riusati ovunque: `name`, `shortName`, `url`, `lang: "it"`, `description`, `tagline`, indirizzo completo (NAP: nome/indirizzo/telefono), `email`, `phone`, `geo` (lat `45.475269`, lng `9.1393808`), `social.instagram`, `openingHours`, `priceRange`. Serve anche ai dati strutturati.
- **`pratiche.json`** — array di oggetti pratica: `slug`, `titolo`, `sottotitolo`, `descrizione`, `aChiRivolto`, `infoPratiche` (placeholder), `icona`/`immagine`, `ordine`. La pagina `pratiche/pratica.njk` usa `pagination` su questo array (`size: 1`, `alias: pratica`) per generare automaticamente `/pratiche/<slug>/`.
- **Blog** — ogni articolo è un `.md` in `diario/posts/` con front matter (`title`, `description`, `date`, `tags`, `image`, `imageAlt`, `layout: post.njk`). Definire una collection `diario` ordinata per data discendente.
- **Cascade dei dati** — usare `diario/posts/posts.json` (directory data) per applicare layout, tag e permalink comuni a tutti gli articoli.
- **Permalink** puliti e stabili: `/lo-spazio/`, `/pratiche/`, `/pratiche/yoga/`, `/diario/`, `/diario/<slug>/`, `/collaborazioni/`, `/contatti/`, `/privacy/`, `/cookie-policy/`.

---

## 7. Mappa delle pagine e contenuti pronti

I testi seguenti sono **pronti**: inseriscili come contenuto iniziale. Il testo tra parentesi quadre `[...]` è un placeholder che resterà finché il committente non fornisce il dato reale — realizzalo come contenuto visibile ma chiaramente provvisorio (o come commento/nota se indicato).

### 7.1 Home (`index.njk`)

- **Hero** — Titolo: «Uno spazio per te.» · Sottotitolo: «A Segesta, a Milano, un luogo accogliente dove ritrovare corpo, respiro e presenza. Yoga, meditazione, movimento, respirazione olotropica e counseling gestalt: percorsi per prenderti cura di te, al tuo ritmo.» · CTA: «Scopri le pratiche» (→ /pratiche/) e «Scrivici» (→ /contatti/). Immagine di sfondo: foto della sala.
- **Chi siamo (anteprima)** — «SpazioxMe nasce da una lunga storia di crescita personale e, dal 2024, da nuove anime che l'hanno riportato a vivere. È un posto pensato per stare bene insieme: piccoli gruppi, ascolto autentico e la libertà di essere sé stessi. Nessuna prestazione da raggiungere, solo lo spazio per ritrovarti.» · CTA: «Conosci lo spazio» (→ /lo-spazio/).
- **Griglia pratiche** — 6 card (da `pratiche.json`), ognuna con titolo + una riga + link alla pagina pratica.
- **Valori** — Accoglienza · Ascolto · Corpo e presenza · Comunità (icona + 1 riga ciascuno).
- **Anteprima Diario** — ultimi 3 articoli (collection `diario`).
- **Chiusura** — «Curioso di iniziare? Il primo passo è una chiacchierata, senza impegno. Scrivici e troviamo insieme la pratica giusta per te.» + CTA «Contattaci».

### 7.2 Lo Spazio (`lo-spazio.njk`)

Titolo «Lo Spazio». Testo:

> SpazioxMe è, prima di tutto, un luogo dove sentirsi a casa. Si trova a Segesta, a Milano, e ha alle spalle una lunga storia di crescita personale: un percorso fatto di persone, incontri e cambiamenti. Dal 2024 nuove anime lo hanno riacceso, portando energie fresche e nuove pratiche, senza dimenticare da dove veniamo.
>
> Crediamo che il benessere non sia una prestazione, ma un modo di stare: con il proprio corpo, con il respiro, con gli altri. Per questo qui trovi gruppi piccoli, tempi umani e un ascolto autentico. Che tu venga per lo yoga, per un cerchio, per un percorso di counseling o semplicemente per curiosità, lo spazio è pensato per accoglierti.
>
> Non serve essere "bravi", allenati o esperti. Serve solo la voglia di concederti un momento per te.

- **Valori**: Accoglienza · Autenticità · Corpo e respiro · Comunità (con breve spiegazione).
- **I conduttori**: griglia di schede `[Nome]`, `[Disciplina]`, `[2–3 frasi di presentazione]`, `[foto]` — placeholder ripetibile.
- **Il luogo**: «Ci trovi a `[via e numero]`, a Segesta, a Milano. Uno spazio caldo e raccolto, facile da raggiungere `[indicazioni: metro Segesta M1, mezzi, parcheggio]`.» + galleria foto reali.

### 7.3 Pratiche (`pratiche/index.njk` + pagine generate)

Intro pagina indice: «Ogni persona ha il suo ritmo e il suo modo di prendersi cura di sé. Per questo proponiamo pratiche diverse, che si possono vivere singolarmente o intrecciare tra loro. Se non sai da dove iniziare, scrivici: troviamo insieme il punto di partenza giusto per te.»

Contenuto di `pratiche.json` (usare questi testi):

| slug | titolo | sottotitolo | descrizione | a chi è rivolto |
|---|---|---|---|---|
| `yoga` | Yoga | Ritrova il respiro e la presenza | Un tempo per tornare al respiro e alla presenza. Attraverso posture, respiro e ascolto del corpo, lo yoga aiuta a sciogliere tensioni, ritrovare equilibrio e portare calma nella mente. Lezioni adatte a tutti i livelli, principianti compresi. | Chi cerca equilibrio tra corpo e mente, flessibilità e una pausa dallo stress. |
| `meditazione-respirazione` | Meditazione & Respirazione | Fermarsi, ascoltarsi, tornare al centro | Pratiche di meditazione e di respiro consapevole per allenare l'attenzione, ridurre l'ansia e ritrovare uno spazio di quiete dentro di sé. | Chi vuole imparare a rallentare, gestire lo stress e coltivare presenza. |
| `pilates-movimento` | Pilates & Movimento consapevole | Un corpo più libero, forte e presente | Il movimento consapevole rinforza il centro del corpo, migliora la postura e riporta attenzione al modo in cui ci muoviamo, dentro e fuori dal tappetino. | Chi vuole prendersi cura del corpo con dolcezza, migliorare postura e tono. |
| `respirazione-olotropica` | Respirazione olotropica | Un viaggio profondo attraverso il respiro | Una pratica intensa che, guidata in sicurezza, utilizza il respiro per accedere a stati profondi di consapevolezza, emozione e liberazione. Si svolge in sessioni dedicate e in un contesto protetto. | Chi desidera un'esperienza interiore intensa di ascolto e trasformazione. Consigliato un colloquio preliminare. |
| `counseling-gestalt` | Counseling Gestalt | Uno spazio di ascolto per capirti meglio | Il counseling gestaltico accompagna la persona nel presente, aiutandola a riconoscere emozioni, bisogni e modi di stare in relazione. Non è una terapia clinica, ma un sostegno alla consapevolezza e al cambiamento. | Chi attraversa un momento di transizione, vuole conoscersi meglio o ritrovare direzione. |
| `cerchi` | I Cerchi | Gruppi per condividere ed esplorare insieme | Spazi di parola e di ascolto dedicati a temi ed esperienze condivise — come il Cerchio degli uomini — dove ci si incontra in un ambiente sicuro e senza giudizio. | Chi cerca condivisione autentica e la forza del gruppo. |

Ogni pagina pratica: titolo, sottotitolo, descrizione, "A chi è rivolto", blocco «Info pratiche: `[giorni e orari]`, `[durata]`, `[costo]`, `[come iscriversi]`», CTA «Prenota un primo incontro» (→ /contatti/), link di ritorno all'indice.

### 7.4 Diario (`diario/index.njk` + articoli)

Intro: «Pensieri, pratiche e racconti dallo SpazioxMe. Un posto dove condividiamo ciò che impariamo lungo la strada: sul corpo, sul respiro, sulle relazioni e sul prendersi cura di sé. Buona lettura.»

Creare **2 articoli di esempio** completi in Markdown (per mostrare la struttura), scelti da questa lista; gli altri restano come idee nel README:

1. *Cos'è la respirazione olotropica (e cosa non è)*
2. *Il Cerchio degli uomini: uno spazio tra maschi, per stare bene*
3. *Counseling gestalt: 5 domande per capire se fa per te*
4. *Respirare meglio: 3 esercizi da fare a casa*
5. *Perché il corpo ricorda ciò che la mente dimentica*
6. *Yoga per chi pensa di non essere portato*
7. *La nostra storia: da Segesta, dal 2024, con nuove anime*
8. *Meditare quando la testa non si ferma: da dove iniziare*

### 7.5 Collaborazioni (`collaborazioni.njk`)

Titolo «Collaborazioni». «SpazioxMe è un luogo vivo, che cresce grazie alle persone che lo attraversano. Se sei un facilitatore, un insegnante, un counselor o un professionista del benessere e cerchi uno spazio accogliente dove proporre le tue pratiche — o vuoi unire le forze per un progetto — ci farebbe piacere conoscerti.»

- **Cosa offriamo**: spazio curato a Segesta per lezioni/gruppi/sessioni · una comunità attiva · collaborazione su eventi e percorsi.
- **A chi è rivolto**: insegnanti di yoga/pilates, counselor e facilitatori, operatori olistici, conduttori di gruppi.
- **Come proporre**: «Scrivici raccontandoci chi sei, cosa proponi e come immagini di collaborare.» + modulo dedicato (campi: Nome, Email, Disciplina/Ambito, Messaggio, consenso privacy).

### 7.6 Contatti (`contatti.njk`)

Titolo «Contatti». «Hai una domanda, una curiosità o vuoi prenotare un primo incontro? Scrivici: rispondiamo con piacere. Il primo passo è sempre una chiacchierata, senza impegno.»

- Recapiti: `[via e numero]`, Segesta – Milano · `[email]` · `[telefono/WhatsApp]` · Instagram @spazioxme · `[orari]`.
- Modulo: Nome, Email, Telefono (facoltativo), «Sono interessato a…» (select: Yoga, Meditazione, Pilates, Respirazione olotropica, Counseling, Cerchi, Altro), Messaggio, **casella consenso privacy obbligatoria**.
- Mappa: embed leggero (immagine statica linkata a Google Maps, o iframe caricato solo dopo consenso cookie).

### 7.7 Legali

Pagine `privacy.njk` e `cookie-policy.njk` con struttura pronta e placeholder `[titolare del trattamento]`, `[dati raccolti]`, `[finalità]`, `[strumenti di terze parti usati]`. Includere banner cookie (vedi §9).

---

## 8. Requisiti SEO (dettagliati)

**On-page / tecnica**

- HTML semantico: un solo `<h1>` per pagina, gerarchia corretta di heading, `<main>`, `<nav>`, `<article>`, `<header>`, `<footer>`.
- `<title>` e `<meta name="description">` **unici** per ogni pagina, generati dal front matter (`title`, `description`) con fallback dai dati del sito. Titoli entro ~60 caratteri, description ~150–160.
- URL puliti, minuscoli, con trattini; nessun `index.html` esposto.
- `<link rel="canonical">` assoluto su ogni pagina.
- `lang="it"` su `<html>`. Sito monolingua (niente hreflang).
- **Open Graph** e **Twitter Card** completi (title, description, `og:image` per pagina con fallback, `og:type`, `og:url`, `og:locale=it_IT`).
- `sitemap.xml` generata da tutte le pagine pubblicate (escludi bozze e 404); `robots.txt` che la referenzia.
- Feed RSS del Diario, linkato nel `<head>`.
- Immagini con `alt` descrittivo sempre presente; `width`/`height` per evitare CLS.
- Link interni sensati (home ↔ pratiche ↔ diario ↔ contatti); breadcrumb sulle pagine profonde.

**Dati strutturati (JSON-LD)**

- Su tutte le pagine: `LocalBusiness` (tipo più specifico `HealthAndBeautyBusiness` o `HealthClub`) con `name`, `image`, `@id`, `url`, `telephone`, `priceRange`, `address` (PostalAddress: via, Milano, CAP, IT), `geo` (lat/lng), `openingHoursSpecification`, `sameAs` (Instagram). Alimentato da `site.json`.
- Sugli articoli: `BlogPosting`/`Article` con `headline`, `datePublished`, `dateModified`, `author`, `image`.
- Sulle pagine con percorso: `BreadcrumbList`.

**SEO locale (Milano / Segesta)**

- NAP coerente ovunque (footer, contatti, JSON-LD).
- Parole chiave naturali nei testi e nei title/description, es.: «yoga a Milano», «yoga zona Segesta», «counseling gestalt Milano», «respirazione olotropica Milano», «meditazione Milano». Non forzare (no keyword stuffing).
- Predisporre collegamento al **profilo Google Business** (link nel footer se disponibile) e coerenza dati con esso.

---

## 9. Accessibilità, privacy e performance

**Accessibilità (target WCAG 2.1 AA)**

- Contrasto colore conforme (verificare le combinazioni della palette; usare navy/grigio su panna per il testo).
- Navigazione da tastiera completa, focus visibile, `skip-to-content` link.
- Menu mobile accessibile (`aria-expanded`, `aria-controls`, chiusura con Esc).
- Form con `<label>` associati, messaggi di errore chiari, `aria-describedby`.
- Rispetto di `prefers-reduced-motion`.

**Privacy / GDPR**

- Banner cookie con scelta (accetta/rifiuta), che blocca gli strumenti non essenziali (es. mappa/analytics) finché non c'è consenso.
- Pagine Privacy e Cookie Policy collegate nel footer.
- Consenso esplicito nei moduli.
- Se si usa analytics, preferire una soluzione privacy-friendly (es. Plausible/Umami) o Google Analytics solo previo consenso.

**Performance (target Lighthouse ≥ 95 su tutte le metriche)**

- Immagini responsive con `@11ty/eleventy-img` (AVIF + WebP + fallback), `loading="lazy"` sotto la piega, dimensioni esplicite.
- Font self-hosted `woff2`, `preload` del font critico, `font-display: swap`.
- CSS minimo e minificato; evitare JS non necessario.
- Nessuna libreria pesante; niente jQuery.
- Cache headers e asset con hash (gestiti da Netlify/Cloudflare).
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP basso.

---

## 10. Deploy

- Repo su GitHub. Branch `main` = produzione.
- **Netlify** (consigliato se si usano Netlify Forms) o **Cloudflare Pages**.
- `netlify.toml`: comando build `npm run build`, publish `dist`, versione Node da `.nvmrc`.
- Configurare dominio `spazioxme.it`, HTTPS automatico, redirect `www` → apex (o viceversa), pagina 404 personalizzata.
- Header di sicurezza base (CSP compatibile con gli asset, `X-Content-Type-Options`, `Referrer-Policy`).

---

## 11. Script npm attesi

```jsonc
{
  "scripts": {
    "start": "eleventy --serve",     // dev con live reload
    "build": "eleventy",             // build di produzione in dist/
    "clean": "rimraf dist"
  }
}
```

---

## 12. Task list per Sonnet (eseguire in ordine)

> Committa a fine di ogni fase con messaggi chiari. Dopo ogni fase esegui `npm run build` e correggi eventuali errori prima di procedere.

### Fase 0 — Setup
- [ ] Inizializza repo: `package.json`, `.gitignore`, `.nvmrc`, install `@11ty/eleventy` e plugin (§4).
- [ ] Crea `.eleventy.js`: input `src`, output `dist`, passthrough per `assets/`, watch CSS; registra plugin (img, rss, navigation), collection `diario`, filtri per date (formato italiano) e per estratti.
- [ ] Struttura cartelle come §5. Verifica che `npm run build` produca output.

### Fase 1 — Design system e layout
- [ ] `assets/css/style.css`: reset, custom properties (palette §3), tipografia fluida (`clamp`), griglia/container, componenti base (bottoni, card, form), utility. Mobile-first.
- [ ] Font self-hosted in `assets/fonts/` + `@font-face` + `preload`.
- [ ] `layouts/base.njk`: `<head>` con include `head-seo.njk`, skip-link, `header.njk`, `<main>`, `footer.njk`.
- [ ] `partials/header.njk`: logo (SVG/testo provvisorio "SpazioxMe"), menu da `eleventy-navigation`/`nav.json`, toggle mobile + `assets/js/menu.js` accessibile.
- [ ] `partials/footer.njk`: NAP, social, link legali, link RSS.

### Fase 2 — SEO di base
- [ ] `partials/head-seo.njk`: title/description unici, canonical, OG/Twitter, `og:image` con fallback, favicon, JSON-LD `LocalBusiness` da `site.json`.
- [ ] `_data/site.json` compilato con i dati noti e placeholder per quelli mancanti (indirizzo, telefono, email, orari).

### Fase 3 — Pagine di contenuto
- [ ] `index.njk` (Home) con tutte le sezioni §7.1.
- [ ] `lo-spazio.njk` §7.2 (con galleria placeholder).
- [ ] `_data/pratiche.json` §7.3; `pratiche/index.njk` (griglia card) e `pratiche/pratica.njk` (pagination → 1 pagina per pratica) con JSON-LD e breadcrumb.
- [ ] `collaborazioni.njk` §7.5 con modulo dedicato.
- [ ] `contatti.njk` §7.6 con modulo completo + consenso + mappa consent-aware.
- [ ] `privacy.njk` e `cookie-policy.njk` §7.7.
- [ ] `404.njk`.

### Fase 4 — Blog / Diario
- [ ] `layouts/post.njk` (con JSON-LD `Article`, data, tempo di lettura, breadcrumb, condivisione).
- [ ] `diario/posts/posts.json` (layout/permalink/tags comuni).
- [ ] 2 articoli di esempio in Markdown (§7.4) con front matter completo e immagine placeholder.
- [ ] `diario/index.njk`: elenco paginato per data discendente, con estratti.
- [ ] Feed RSS (`feed.njk` → `/feed.xml`) e link nel `<head>`.

### Fase 5 — SEO tecnica e performance
- [ ] `sitemap.njk` → `sitemap.xml`; `robots.njk` → `robots.txt` con riferimento sitemap.
- [ ] Pipeline immagini con `eleventy-img` (shortcode responsive) applicata a hero, card, galleria, articoli.
- [ ] Verifica heading, alt, dimensioni immagini, minificazione CSS/HTML.
- [ ] Test Lighthouse; correggi finché tutte le metriche ≥ 95.

### Fase 6 — Form e privacy runtime
- [ ] Integra il servizio form scelto (Netlify/Formspree/Web3Forms) su Contatti e Collaborazioni, con honeypot e messaggi di successo/errore.
- [ ] Banner cookie che blocca la mappa/analytics fino al consenso.

### Fase 7 — Deploy
- [ ] `netlify.toml` (o config Cloudflare Pages), pagina 404, redirect, header di sicurezza.
- [ ] README con: come lavorare in locale, come aggiungere un articolo, come aggiungere/modificare una pratica, come sostituire i placeholder, come pubblicare.

### Fase 8 — QA finale
- [ ] Esegui la checklist §13. Correggi. Consegna.

---

## 13. Definition of Done (criteri di accettazione)

- [ ] `npm run build` senza errori; `npm start` con live reload funzionante.
- [ ] Tutte le pagine di §2 presenti, responsive (mobile/tablet/desktop) e navigabili da menu.
- [ ] Pagine pratica generate automaticamente da `pratiche.json`.
- [ ] Blog funzionante con 2 articoli, elenco, feed RSS valido.
- [ ] Ogni pagina ha title/description unici, canonical, OG image, JSON-LD corretto (validato con Rich Results Test).
- [ ] `sitemap.xml` e `robots.txt` corretti.
- [ ] Lighthouse ≥ 95 in Performance, Accessibility, Best Practices, SEO su Home e su un articolo.
- [ ] Contrasti e navigazione da tastiera conformi AA; skip-link e focus visibile.
- [ ] Moduli funzionanti con consenso privacy; banner cookie attivo.
- [ ] Nessuna immagine di terzi/Google usata; solo placeholder o foto fornite.
- [ ] README completo per la manutenzione.
- [ ] Tutti i `[placeholder]` chiaramente identificabili e elencati nel README per il committente.

---

## 14. Dati che il committente deve fornire (elenco placeholder)

- Indirizzo esatto (via e numero), CAP, orari di apertura.
- Email, telefono/WhatsApp, link Google Business, eventuale P.IVA/titolare per la privacy.
- Nomi, foto e presentazioni dei conduttori.
- Giorni, orari e costi di ogni pratica.
- Foto reali dello spazio e delle attività (per hero, gallerie, OG image).
- Logo in vettoriale (SVG) se disponibile.
- Testi definitivi di Privacy e Cookie Policy (o dati per generarli).

---

## 15. Immagini (shotlist e specifiche)

Le foto vanno fornite dal committente in **originale ad alta risoluzione**. Fonte consigliata: profilo **Google Business** di SpazioxMe (Foto → Le tue foto → scarica), oppure file originali di chi ha scattato. Non usare screenshot di Google Maps né foto di terzi. Finché non arrivano, Sonnet inserisce placeholder con le proporzioni corrette e i relativi `alt`.

**Shotlist (priorità alta → bassa):**

| # | Soggetto | Uso | Orientamento |
|---|---|---|---|
| 1 | Sala principale ampia con pavimento in legno e luce naturale | Hero Home + og:image | Orizzontale |
| 2 | Area meditazione con tatami blu e panchetti | Galleria "Lo Spazio" / card pratiche | Orizzontale |
| 3 | Angolo relax: divani bassi con cuscini colorati lungo la parete | Galleria / sezione valori | Orizzontale |
| 4 | Dettaglio caldo: piante, libreria, oggetti | Blocco "Il luogo" | Orizz./Vert. |
| 5 | Vetrata/decori colorati (l'opera in vetro giallo-blu) | Dettaglio atmosfera | Verticale |
| 6 | Ingresso / insegna esterna | Contatti / "come arrivare" | Orizzontale |
| 7 | Ritratti dei conduttori (uno per persona) | Schede "Lo Spazio" | Verticale |

**Specifiche tecniche:**

- Formato sorgente: JPEG qualità alta (o PNG per il logo). Lato lungo ≥ **2000px** per l'hero, ≥ **1400px** per la galleria, ≥ **1000px** per i ritratti.
- Pipeline: `@11ty/eleventy-img` genera automaticamente AVIF + WebP + fallback e le larghezze responsive (es. 480/800/1200/2000). Non ottimizzare a mano: fornire l'originale grande.
- og:image: derivare un ritaglio **1200×630** dalla foto #1.
- Nomi file descrittivi e con trattini: `sala-principale.jpg`, `area-meditazione.jpg`, `angolo-relax.jpg`, ecc. in `src/assets/images/`.
- `alt` in italiano, descrittivo e non ridondante (es. «Sala luminosa di SpazioxMe con pavimento in legno e grandi finestre»). Mai `alt` vuoto sulle immagini di contenuto.
- Rispettare `width`/`height` per evitare CLS; `loading="lazy"` sotto la piega, `eager` solo per l'hero.

---

*Fine del brief. Procedi dalla Fase 0. In caso di ambiguità, scegli l'opzione più semplice, accessibile e performante, e annota la decisione nel README.*
