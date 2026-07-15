const fs = require("fs");
const path = require("path");
const { minify: minifyHtml } = require("html-minifier-terser");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const eleventyImage = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const MESI_IT = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];

module.exports = function (eleventyConfig) {
  // Passthrough copy per asset statici.
  // NB: le foto (.jpg) NON vengono copiate integralmente: le versioni servite sono generate
  // dalla pipeline eleventy-img (shortcode "immagine"). Copiamo solo gli asset referenziati
  // direttamente: font, JS, CSS, SVG e l'immagine OG condivisa.
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/images/*.svg");
  eleventyConfig.addPassthroughCopy("src/assets/images/og-default.jpg");
  // File di configurazione Netlify sul branch deploy (output già buildato)
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // Plugin
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  // Markdown con ancore nei titoli
  const md = markdownIt({ html: true, breaks: false, linkify: true }).use(
    markdownItAnchor,
    {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "heading-anchor",
        symbol: "#",
      }),
    }
  );
  eleventyConfig.setLibrary("md", md);

  // Collection Diario: articoli ordinati per data discendente
  eleventyConfig.addCollection("diario", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/diario/posts/*.md").sort(
      (a, b) => b.date - a.date
    );
  });

  // Anno corrente, per il footer
  eleventyConfig.addGlobalData("anno", () => new Date().getFullYear());

  // Filtro data in formato italiano: "14 luglio 2026"
  eleventyConfig.addFilter("dataIt", (dateObj) => {
    const d = new Date(dateObj);
    return `${d.getDate()} ${MESI_IT[d.getMonth()]} ${d.getFullYear()}`;
  });

  // Filtro data ISO (per <time datetime="">)
  eleventyConfig.addFilter("dataIso", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Filtro estratto: prime N parole da testo semplice
  eleventyConfig.addFilter("estratto", (content, numParole = 30) => {
    if (!content) return "";
    const testo = String(content).replace(/(<([^>]+)>)/gi, "");
    const parole = testo.trim().split(/\s+/);
    if (parole.length <= numParole) return testo.trim();
    return parole.slice(0, numParole).join(" ") + "…";
  });

  // Filtro tempo di lettura (parole al minuto, media italiana ~200)
  eleventyConfig.addFilter("tempoLettura", (content) => {
    if (!content) return 1;
    const testo = String(content).replace(/(<([^>]+)>)/gi, "");
    const parole = testo.trim().split(/\s+/).length;
    return Math.max(1, Math.round(parole / 200));
  });

  // Shortcode immagini responsive (AVIF/WebP/fallback) con eleventy-img.
  // src è un percorso assoluto dal sito, es. "/assets/images/sala-principale.jpg".
  // Se il file sorgente non esiste ancora (foto reali non fornite), ripiega su un <img>
  // semplice così la build non si rompe.
  eleventyConfig.addAsyncShortcode(
    "immagine",
    async function (src, alt, sizes = "100vw", widths = [480, 800, 1200, 2000], eager = false) {
      if (alt === undefined) {
        throw new Error(`Manca l'attributo "alt" per l'immagine ${src}`);
      }

      const sorgente = path.join("src", src.replace(/^\//, ""));
      const loading = eager ? "eager" : "lazy";
      const priorita = eager ? "high" : "auto";

      if (!fs.existsSync(sorgente)) {
        // Placeholder finché non arriva la foto reale
        return `<img src="${src}" alt="${alt}" loading="${loading}" decoding="async" width="1200" height="800">`;
      }

      const metadata = await eleventyImage(sorgente, {
        widths: widths,
        formats: ["avif", "webp", "jpeg"],
        outputDir: "dist/assets/images/ottimizzate/",
        urlPath: "/assets/images/ottimizzate/",
      });

      const imageAttributes = {
        alt,
        sizes,
        loading,
        decoding: "async",
        fetchpriority: priorita,
      };

      return eleventyImage.generateHTML(metadata, imageAttributes);
    }
  );

  // Minificazione HTML in produzione (ENV=production o build Netlify)
  const isProd = process.env.ELEVENTY_RUN_MODE === "build";
  if (isProd) {
    eleventyConfig.addTransform("minificaHtml", async function (content) {
      if (!(this.page.outputPath || "").endsWith(".html")) return content;
      return minifyHtml(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        conservativeCollapse: false,
      });
    });
  }

  // Minificazione CSS (semplice e sicura): strip commenti + collassa spazi.
  eleventyConfig.on("eleventy.after", async ({ dir }) => {
    const cssPath = path.join(dir.output, "assets/css/style.css");
    if (fs.existsSync(cssPath)) {
      let css = fs.readFileSync(cssPath, "utf8");
      css = css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}:;,>])\s*/g, "$1")
        .replace(/;}/g, "}")
        .trim();
      fs.writeFileSync(cssPath, css);
    }
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
