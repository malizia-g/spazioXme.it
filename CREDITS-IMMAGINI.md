# Crediti immagini — SpazioxMe

> ✅ **Foto reali dello spazio.** Tutte le immagini in `src/assets/images/` sono
> fotografie originali degli ambienti di SpazioxMe (proprietà di SpazioxMe) e
> hanno sostituito i precedenti segnaposto stock.

Gli **originali ad alta risoluzione** sono archiviati e organizzati per tema nella
cartella `SpazioXME/` alla radice del repo:

- `SpazioXME/ambienti/` — la sala principale e gli spazi comuni
- `SpazioXME/meditazione-e-cerchi/` — area meditazione e sedute in cerchio
- `SpazioXME/dettagli/` — dettagli (libreria, piante, decori)

## Corrispondenza file del sito → foto sorgente

| File in `src/assets/images/` | Foto sorgente in `SpazioXME/` | Note |
|---|---|---|
| `sala-principale.jpg` | `ambienti/sala-principale.HEIC` | Sala principale luminosa |
| `ingresso.jpg` | `ambienti/sala-e-vetrata.HEIC` | Sala che si apre sugli altri ambienti |
| `pratica-pilates-movimento.jpg` | `ambienti/sala-e-vetrata.HEIC` | Spazio aperto per il movimento |
| `pratica-yoga.jpg` | `ambienti/open-space.jpeg` | Ritaglio (libreria, piante, divani) |
| `dettaglio-piante-libreria.jpg` | `dettagli/libreria-e-piante.jpeg` | Libreria in legno con piante |
| `area-meditazione.jpg` | `meditazione-e-cerchi/area-meditazione.jpeg` | Sedute e area meditazione |
| `diario-respirazione-olotropica.jpg` | `meditazione-e-cerchi/area-meditazione.jpeg` | — |
| `angolo-relax.jpg` | `meditazione-e-cerchi/area-meditazione-divani.jpeg` | Divani bassi e cuscini colorati |
| `pratica-counseling-gestalt.jpg` | `meditazione-e-cerchi/area-meditazione-divani.jpeg` | — |
| `pratica-meditazione-respirazione.jpg` | `meditazione-e-cerchi/cerchio-sedute.jpeg` | Cerchio di sedute |
| `diario-cerchio-uomini.jpg` | `meditazione-e-cerchi/cerchio-sedute.jpeg` | — |
| `pratica-respirazione-olotropica.jpg` | `meditazione-e-cerchi/cerchio-sedute-ampio.HEIC` | Cerchio ampio |
| `pratica-cerchi.jpg` | `meditazione-e-cerchi/cerchio-sedute-ampio.HEIC` | — |
| `vetrata-decori.jpg` | `meditazione-e-cerchi/sala-con-decori.jpeg` | Decori colorati in vetro |

Foto d'archivio non ancora usate sul sito (alternative disponibili):
`ambienti/sala-luce-serale.jpeg` e `dettagli/libreria-e-piante-alt.jpeg`.

## Note

- `og-default.jpg` (1200×630, anteprima social) è un ritaglio di
  `ambienti/sala-principale.HEIC`.
- I file HEIC (foto da iPhone) sono stati convertiti in JPEG ottimizzato per il web
  (lato lungo 2000px). La pipeline `@11ty/eleventy-img` genera in build le versioni
  AVIF/WebP/JPEG e le larghezze responsive.
