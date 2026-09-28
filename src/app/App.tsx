import { useEffect, useState } from "react";
import { Phone, MapPin, Clock, Menu, X, Facebook, Instagram, ExternalLink } from "lucide-react";
import heroImg from '../images/sala.jpg';
import storiaImg from '../images/sala2.jpg';
import viniImg from '../images/vino.jpg';
import terrazza3Img from '../images/terrazza3.jpg';
import piatto1Img from '../images/piatto1.jpg';
import piatto4Img from '../images/piatto4.jpg';
import sala3Img from '../images/sala3.jpg';

const PHOTOS = {
  hero: heroImg,
  storia: storiaImg,
  vini: viniImg,
  gallery: [
    { url: terrazza3Img, alt: "La terrazza estiva sotto il portico" },
    { url: piatto1Img, alt: "Secondo di carne con spinaci e patate" },
    { url: piatto4Img, alt: "Risotto della casa" },
    { url: sala3Img, alt: "La sala interna con i tavoli apparecchiati" },
  ],
};

const MAPS_URL = "https://maps.app.goo.gl/5BtoaBxFksyg7LgP9";

// Inserire gli URL delle pagine social: le icone compaiono solo se valorizzati
const SOCIAL = {
  facebook: "",
  instagram: "",
};

type Item = { name: string; price: string };
type Category = { name: string; items: Item[] };

const content = {
  it: {
    nav: { storia: "La Trattoria", menu: "Menù", vini: "Carta Vini", contatti: "Contatti" },
    hero: {
      badge: "Dal 1962 · Treviso",
      title: "Antico Portico",
      subtitle: "Cucina trevigiana autentica nel cuore della città",
      subtitleSub: "Authentic Treviso cuisine in the heart of the city",
      cta1: "Chiama per prenotare",
      cta2: "Scopri la nostra storia",
    },
    storia: {
      label: "La Trattoria",
      title: "Una storia lunga decenni nel cuore di Treviso",
      body: "L'Antico Portico è una trattoria di tradizione, affacciata su Piazza Santa Maria Maggiore da oltre sessant'anni. La sala custodisce travi del Trecento, affreschi antichi e il calore di una casa ospitale: un luogo dove il tempo scorre lento e ogni pasto diventa un ricordo.",
      body2: "D'estate la terrazza apre sul portico storico, offrendo un angolo di freschezza nel cuore della città murata. In cucina si lavora con i prodotti del territorio e le ricette della tradizione veneta, interpretate con cura e rispetto per la stagionalità.",
      counter: "60+",
      counterLabel: "anni nel cuore di Treviso",
      facts: [
        { value: "1962", label: "Anno di fondazione" },
        { value: "XIV", label: "Secolo delle travi originali" },
        { value: "mag–set", label: "Terrazza estiva aperta" },
      ],
    },
    menu: {
      label: "Il Menù",
      title: "Piatti del territorio e specialità della casa",
      subtitle: "Pasta fresca fatta in casa, carni selezionate, verdure di stagione. Una cucina radicata nel territorio, con qualche interpretazione personale.",
      categories: [
        {
          name: "Antipasti",
          items: [
            { name: "Sopressa con polenta abbrustolita", price: "" },
            { name: "Lardo di Colonnata con crostini", price: "" },
            { name: "Verdure grigliate marinate all'olio", price: "" },
            { name: "Carpaccio di manzo con rucola e grana", price: "" },
          ],
        },
        {
          name: "Primi",
          items: [
            { name: "Bigoli al ragù d'anatra", price: "" },
            { name: "Risotto al radicchio di Treviso IGP", price: "" },
            { name: "Pasta e fagioli alla veneta", price: "" },
            { name: "Tagliatelle al tartufo nero di stagione", price: "" },
          ],
        },
        {
          name: "Secondi",
          items: [
            { name: "Guancetta di vitello brasata al Raboso", price: "" },
            { name: "Fegato alla veneziana con polenta bianca", price: "" },
            { name: "Costine di maiale con salvia e rosmarino", price: "" },
            { name: "Baccalà alla vicentina con polenta", price: "" },
          ],
        },
        {
          name: "Specialità",
          items: [
            { name: "Fiori di zucca ripieni in pastella", price: "" },
            { name: "Seppie in umido con polenta bianca", price: "" },
            { name: "Soufflé al radicchio e taleggio", price: "" },
            { name: "Tiramisù della nonna", price: "" },
          ],
        },
      ] as Category[],
      allergeni: "Per informazioni sugli allergeni, il nostro personale è a disposizione.",
      cta: "Scarica il menù completo (PDF)",
    },
    vini: {
      label: "Carta Vini",
      title: "I vini del territorio e della tradizione veneta",
      subtitle: "Una selezione curata di etichette locali e nazionali, con un occhio di riguardo per i vitigni autoctoni del Veneto.",
      sections: [
        {
          name: "Vini del territorio",
          wines: [
            { name: "Raboso del Piave DOC", producer: "Tenuta Castello di Roncade", note: "Rosso tannico e austero, ideale con i brasati" },
            { name: "Prosecco di Valdobbiadene DOCG", producer: "Col Vetoraz", note: "Bollicine fini, bouquet floreale e fruttato" },
            { name: "Verdiso Trevigiano IGT", producer: "Adami", note: "Bianco leggero e minerale, perfetto con i crudi" },
          ],
        },
        {
          name: "Rossi d'autore",
          wines: [
            { name: "Amarone della Valpolicella DOCG", producer: "Zenato", note: "Grande struttura, note di ciliegia e spezie" },
            { name: "Valpolicella Ripasso DOC", producer: "Masi Campofiorin", note: "Elegante, rotondo, frutta rossa matura" },
          ],
        },
        {
          name: "Bianchi e bollicine",
          wines: [
            { name: "Soave Classico DOC", producer: "Pieropan", note: "Minerale, secco, ottimo con il pesce" },
            { name: "Cartizze DOCG", producer: "Bisol", note: "Il cru del Prosecco, elegante e complesso" },
          ],
        },
      ],
    },
    atmosfera: {
      label: "L'Esperienza",
      title: "Un pasto che rimane nel tempo",
      body: "Le recensioni parlano di un luogo dove ci si sente accolti come ospiti di famiglia. Atmosfera rilassata, tavoli curati, tempi giusti: l'Antico Portico invita a mangiare bene, senza fretta.",
    },
    contatti: {
      label: "Contatti",
      title: "Vieni a trovarci",
      address: "Piazza Santa Maria Maggiore, 18\n31100 Treviso (TV)",
      phone: "+39 0422 545 259",
      email: "anticoporticotreviso@gmail.com",
      orariTitle: "Orari di apertura",
      hours: [
        { day: "Lunedì e Martedì", time: "Chiuso" },
        { day: "Mer - Sab", time: "10:30–15:00 · 18:30–23:00" },
        { day: "Domenica", time: "10:30–15:00 · 18:30–22:00" },
      ],
      parking: "A 5 min a piedi da Piazza dei Signori. Centro storico ZTL: verificare gli orari di accesso.",
      note: "Prenotazioni solo telefoniche",
      ctaCall: "Chiama ora",
      ctaMaps: "Apri in Google Maps",
    },
    footer: {
      tagline: "Cucina trevigiana autentica dal 1962",
      links: "Link rapidi",
      rights: "Trattoria Antico Portico. Tutti i diritti riservati.",
    },
  },
  en: {
    nav: { storia: "Our Story", menu: "Menu", vini: "Wine List", contatti: "Contact" },
    hero: {
      badge: "Since 1962 · Treviso",
      title: "Antico Portico",
      subtitle: "Authentic Treviso cuisine in the heart of the city",
      subtitleSub: "Cucina trevigiana autentica nel cuore della città",
      cta1: "Call to reserve",
      cta2: "Discover our story",
    },
    storia: {
      label: "The Trattoria",
      title: "Decades of history in the heart of Treviso",
      body: "Antico Portico is a traditional trattoria overlooking Piazza Santa Maria Maggiore for over sixty years. The dining room preserves 14th-century beams, ancient frescoes, and the warmth of a welcoming home — a place where time slows and every meal becomes a memory.",
      body2: "In summer, the terrace opens onto the historic portico, offering a cool corner in the heart of the walled city. The kitchen works with local products and Venetian recipes, crafted with care and seasonal awareness.",
      counter: "60+",
      counterLabel: "years in the heart of Treviso",
      facts: [
        { value: "1962", label: "Year founded" },
        { value: "XIV", label: "Century of the original beams" },
        { value: "May–Sep", label: "Summer terrace open" },
      ],
    },
    menu: {
      label: "The Menu",
      title: "Local dishes and house specialties",
      subtitle: "Handmade fresh pasta, selected meats, seasonal vegetables. Cuisine rooted in the territory, with a personal touch.",
      categories: [
        {
          name: "Starters",
          items: [
            { name: "Sopressa with grilled polenta", price: "" },
            { name: "Lardo di Colonnata with crostini", price: "" },
            { name: "Marinated grilled vegetables in oil", price: "" },
            { name: "Beef carpaccio with rocket and grana", price: "" },
          ],
        },
        {
          name: "First Courses",
          items: [
            { name: "Bigoli with duck ragù", price: "" },
            { name: "Risotto with Treviso radicchio IGP", price: "" },
            { name: "Venetian-style pasta e fagioli", price: "" },
            { name: "Tagliatelle with seasonal black truffle", price: "" },
          ],
        },
        {
          name: "Main Courses",
          items: [
            { name: "Braised veal cheek in Raboso wine", price: "" },
            { name: "Venetian-style liver with white polenta", price: "" },
            { name: "Pork ribs with sage and rosemary", price: "" },
            { name: "Baccalà alla vicentina with polenta", price: "" },
          ],
        },
        {
          name: "Specialties",
          items: [
            { name: "Stuffed zucchini blossoms in batter", price: "" },
            { name: "Cuttlefish stew with white polenta", price: "" },
            { name: "Radicchio and taleggio soufflé", price: "" },
            { name: "Grandmother's tiramisù", price: "" },
          ],
        },
      ] as Category[],
      allergeni: "For allergen information, our staff is always at your disposal.",
      cta: "Download full menu (PDF)",
    },
    vini: {
      label: "Wine List",
      title: "Wines of the territory and Venetian tradition",
      subtitle: "A curated selection of local and national labels, with special focus on native Veneto grape varieties.",
      sections: [
        {
          name: "Local wines",
          wines: [
            { name: "Raboso del Piave DOC", producer: "Tenuta Castello di Roncade", note: "Tannic and austere red, ideal with braised meats" },
            { name: "Prosecco di Valdobbiadene DOCG", producer: "Col Vetoraz", note: "Fine bubbles, floral and fruity bouquet" },
            { name: "Verdiso Trevigiano IGT", producer: "Adami", note: "Light mineral white, perfect with raw fish" },
          ],
        },
        {
          name: "Red wines",
          wines: [
            { name: "Amarone della Valpolicella DOCG", producer: "Zenato", note: "Full-bodied, cherry and spice notes" },
            { name: "Valpolicella Ripasso DOC", producer: "Masi Campofiorin", note: "Elegant, round, ripe red fruit" },
          ],
        },
        {
          name: "Whites & Sparkling",
          wines: [
            { name: "Soave Classico DOC", producer: "Pieropan", note: "Mineral, dry, excellent with fish" },
            { name: "Cartizze DOCG", producer: "Bisol", note: "The Prosecco cru, elegant and complex" },
          ],
        },
      ],
    },
    atmosfera: {
      label: "The Experience",
      title: "A meal that stays with you",
      body: "Reviews speak of a place where you feel welcomed like family. Relaxed atmosphere, carefully set tables, perfect timing — Antico Portico invites you to eat well, without rush.",
    },
    contatti: {
      label: "Contact",
      title: "Come visit us",
      address: "Piazza Santa Maria Maggiore, 18\n31100 Treviso (TV), Italy",
      phone: "+39 0422 545 259",
      email: "anticoporticotreviso@gmail.com",
      orariTitle: "Opening hours",
      hours: [
        { day: "Monday & Tuesday", time: "Closed" },
        { day: "Wed – Sat", time: "10:30–15:00 · 18:30–23:00" },
        { day: "Sunday", time: "10:30–15:00 · 18:30–22:00" },
      ],
      parking: "Parking at Piazza dei Signori (5 min walk). Historic center ZTL zone — check access times.",
      note: "Reservations by phone only",
      ctaCall: "Call now",
      ctaMaps: "Open in Google Maps",
    },
    footer: {
      tagline: "Authentic Treviso cuisine since 1962",
      links: "Quick links",
      rights: "Trattoria Antico Portico. All rights reserved.",
    },
  },
} as const;

type Lang = "it" | "en";

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-body font-bold mb-4 ${light ? "text-primary-foreground/50" : "text-secondary"}`}>
      <span className={`inline-block w-8 h-px ${light ? "bg-primary-foreground/30" : "bg-secondary"}`} />
      {children}
    </p>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("it");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenuCat, setActiveMenuCat] = useState(0);

  const t = content[lang];
  const phone = t.contatti.phone;
  const tel = `tel:${phone.replace(/\s/g, "")}`;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const navLinks = [
    { href: "#storia", label: t.nav.storia },
    { href: "#menu", label: t.nav.menu },
    { href: "#vini", label: t.nav.vini },
    { href: "#contatti", label: t.nav.contatti },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 h-[60px] flex items-center justify-between gap-4">

          <a href="#" className="flex flex-col leading-none shrink-0">
            <span className="font-display text-[17px] font-semibold text-primary tracking-tight leading-none">
              Antico Portico
            </span>
            <span className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground mt-0.5 font-body">
              Trattoria · Treviso
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] text-foreground/60 hover:text-primary transition-colors tracking-wide font-body">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "it" ? "en" : "it")}
              className="text-[10px] tracking-[0.15em] uppercase font-bold text-muted-foreground hover:text-primary transition-colors border border-border px-2.5 py-1 rounded-sm"
            >
              {lang === "it" ? "EN" : "IT"}
            </button>
            <a
              href={tel}
              className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground text-[13px] px-4 py-2 rounded-sm hover:bg-primary/90 transition-colors"
            >
              <Phone size={13} />
              {phone}
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 text-foreground"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-background border-t border-border px-5 pt-5 pb-7 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-[15px] text-foreground/75 hover:text-primary transition-colors font-medium">
                {l.label}
              </a>
            ))}
            <a href={tel} className="mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-sm text-sm">
              <Phone size={14} />
              {t.hero.cta1}
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[550px] max-h-[960px] flex flex-col justify-center md:justify-end pt-[60px]">
        <div className="absolute inset-0 bg-foreground">
          <img
            src={PHOTOS.hero}
            alt="Sala dell'Antico Portico con travi antiche e luce calda"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180c04]/95 via-[#180c04]/45 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 pb-8 md:pb-20 lg:pb-28">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-secondary font-bold mb-5 border border-secondary/40 px-3 py-1.5 rounded-sm">
              {t.hero.badge}
            </span>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] text-white leading-[1.02] mb-4 font-bold">
              {t.hero.title}
            </h1>
            <p className="text-[1.1rem] md:text-[1.2rem] text-white/80 leading-snug mb-2 font-light">
              {t.hero.subtitle}
            </p>
            <p className="text-sm text-white/40 italic mb-6 md:mb-10 font-body">
              {t.hero.subtitleSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={tel}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 text-[13px] font-bold tracking-wide rounded-sm hover:bg-primary/90 transition-colors uppercase"
              >
                <Phone size={14} />
                {t.hero.cta1}
              </a>
              <a
                href="#storia"
                className="flex items-center justify-center gap-2 border border-white/35 text-white px-7 py-3.5 text-[13px] font-medium rounded-sm hover:border-white/65 transition-colors"
              >
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORIA ── */}
      <section id="storia" className="py-24 lg:py-36">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            <div>
              <SectionLabel>{t.storia.label}</SectionLabel>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] text-foreground leading-tight mb-6 font-semibold">
                {t.storia.title}
              </h2>
              <p className="text-[15px] text-foreground/65 leading-[1.75] mb-4">
                {t.storia.body}
              </p>
              <p className="text-[15px] text-foreground/65 leading-[1.75] mb-10">
                {t.storia.body2}
              </p>

              {/* Facts row — editorial, no emoji */}
              <div className="grid grid-cols-3 divide-x divide-border border border-border rounded-sm overflow-hidden">
                {t.storia.facts.map((f, i) => (
                  <div
                    key={i}
                    className="px-4 sm:px-5 py-5 bg-card flex flex-col items-center justify-center text-center"
                  >
                    <span className="font-display text-[1.35rem] sm:text-2xl font-bold text-primary leading-none mb-1.5 whitespace-nowrap">
                      {f.value}
                    </span>
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wide leading-snug">
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-muted">
                <img
                  src={PHOTOS.storia}
                  loading="lazy"
                  alt="Sala della trattoria con travi antiche e tavoli apparecchiati"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden lg:flex flex-col items-start bg-primary text-primary-foreground p-5 rounded-sm shadow-lg">
                <span className="font-display text-4xl font-bold leading-none">{t.storia.counter}</span>
                <span className="text-[11px] text-primary-foreground/70 leading-snug mt-1.5 max-w-[110px]">{t.storia.counterLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENÙ ── */}
      <section id="menu" className="py-24 lg:py-36 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <SectionLabel>{t.menu.label}</SectionLabel>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-foreground mb-4 font-semibold">{t.menu.title}</h2>
            <p className="text-[15px] text-foreground/55 max-w-xl mx-auto leading-relaxed">{t.menu.subtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {t.menu.categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveMenuCat(i)}
                className={`px-5 py-2 text-[12px] tracking-wide rounded-sm border transition-all font-medium ${
                  activeMenuCat === i
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground/55 hover:border-secondary/50 hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="max-w-[600px] mx-auto">
            <div className="bg-background border border-border rounded-sm px-7 py-8">
              <h3 className="font-display text-xl text-foreground mb-5 pb-4 border-b border-border font-semibold">
                {t.menu.categories[activeMenuCat].name}
              </h3>
              <ul className="divide-y divide-border/50">
                {t.menu.categories[activeMenuCat].items.map((item, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="text-[14.5px] text-foreground/75 leading-relaxed">{item.name}</span>
                    <span className="text-[13px] font-semibold text-primary shrink-0 font-display">{item.price} </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[11px] text-muted-foreground text-center mt-5 italic">{t.menu.allergeni}</p>
          </div>
        </div>
      </section>

      {/* ── CARTA VINI ── */}
      <section id="vini" className="py-24 lg:py-36">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-[5fr,7fr] gap-16 items-start">

            <div>
              <SectionLabel>{t.vini.label}</SectionLabel>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-foreground mb-4 leading-tight font-semibold">
                {t.vini.title}
              </h2>
              <p className="text-[15px] text-foreground/60 leading-relaxed mb-10">{t.vini.subtitle}</p>
                <div className="w-full flex justify-center">
                  <img
                    src={PHOTOS.vini}
                    loading="lazy"
                    alt="Carta Vini"
                    className="w-full h-auto object-contain"
                  />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {t.vini.sections.map((sec, si) => (
                <div key={si}>
                  <h3 className="font-display text-[15px] font-semibold text-foreground mb-4 pb-2 border-b border-border uppercase tracking-wider">
                    {sec.name}
                  </h3>
                  <div className="space-y-4">
                    {sec.wines.map((wine, wi) => (
                      <div key={wi} className="py-3 border-b border-border/30 last:border-0">
                        <span className="text-[14.5px] font-medium text-foreground block">{wine.name}</span>
                        <span className="text-[12px] text-secondary italic mt-0.5 block">{wine.producer}</span>
                        <p className="text-[12.5px] text-foreground/45 mt-1.5 leading-relaxed">{wine.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ATMOSFERA GALLERY ── */}
      <section id="atmosfera" className="py-24 lg:py-36 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <SectionLabel>{t.atmosfera.label}</SectionLabel>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-foreground mb-4 font-semibold">{t.atmosfera.title}</h2>
            <p className="text-[15px] text-foreground/55 max-w-lg mx-auto leading-relaxed">{t.atmosfera.body}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PHOTOS.gallery.map((photo, i) => (
              <div key={i} className={`overflow-hidden rounded-sm bg-muted ${i === 0 ? "lg:col-span-2" : ""}`}>
                <img
                  src={photo.url}
                  loading="lazy"
                  alt={photo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTATTI ── */}
      <section id="contatti" className="py-24 lg:py-36 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: info + CTA */}
            <div>
              <SectionLabel light>{t.contatti.label}</SectionLabel>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] text-primary-foreground mb-10 leading-tight font-semibold">
                {t.contatti.title}
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <MapPin className="shrink-0 mt-0.5 text-primary-foreground/50" size={17} />
                  <div>
                    <p className="text-[14.5px] text-primary-foreground/85 whitespace-pre-line leading-relaxed">{t.contatti.address}</p>
                    <p className="text-[12px] text-primary-foreground/40 mt-1.5 leading-relaxed">{t.contatti.parking}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Phone className="shrink-0 mt-0.5 text-primary-foreground/50" size={17} />
                  <div>
                    <a href={tel} className="text-[14.5px] text-primary-foreground/85 hover:text-primary-foreground transition-colors">
                      {phone}
                    </a>
                    <p className="text-[12px] text-primary-foreground/40 mt-0.5 italic">{t.contatti.note}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={tel}
                  className="flex items-center justify-center gap-2 bg-primary-foreground text-primary px-7 py-3.5 text-[13px] font-bold tracking-wide rounded-sm hover:bg-primary-foreground/90 transition-colors uppercase"
                >
                  <Phone size={14} />
                  {t.contatti.ctaCall}
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 text-[13px] font-medium rounded-sm hover:border-primary-foreground/60 transition-colors"
                >
                  <ExternalLink size={14} />
                  {t.contatti.ctaMaps}
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-primary-foreground/50" />
                <h3 className="font-display text-[15px] text-primary-foreground font-semibold tracking-wide">{t.contatti.orariTitle}</h3>
              </div>
              <div className="divide-y divide-primary-foreground/15">
                {t.contatti.hours.map((h, i) => {
                  const closed = h.time === "Chiuso" || h.time === "Closed";
                  return (
                    <div key={i} className="flex justify-between items-center py-3">
                      <span className="text-[13px] text-primary-foreground/60">{h.day}</span>
                      <span className={`text-[13px] font-medium ${closed ? "text-primary-foreground/30" : "text-primary-foreground"}`}>
                        {h.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Google Maps */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                flex: 1,
                minHeight: 400,
                position: 'relative',
                background: 'var(--muted)',
              }}
            >
              <iframe
                src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5576.555202335212!2d12.249643612075117!3d45.66532717095735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4779482cc7597f8b%3A0xfbe156169948adb2!2sAntico%20Portico!5e0!3m2!1sit!2sit!4v1783942360644!5m2!1sit!2sit"
                style={{ border: 0, width: '100%', height: '100%', minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Mappa: Trattoria Antico Portico, Treviso"
              />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background py-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-10 mb-10">

            <div>
              <h3 className="font-display text-[19px] text-background mb-1.5 font-semibold">Antico Portico</h3>
              <p className="text-[12px] text-background/45 leading-relaxed mb-5">{t.footer.tagline}</p>
              <div className="flex gap-4">
                {SOCIAL.facebook && (
                  <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-background/35 hover:text-background transition-colors"><Facebook size={17} /></a>
                )}
                {SOCIAL.instagram && (
                  <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-background/35 hover:text-background transition-colors"><Instagram size={17} /></a>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-background/35 font-bold mb-4">{t.footer.links}</h4>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[13px] text-background/50 hover:text-background transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-background/35 font-bold mb-4">{t.contatti.label}</h4>
              <div className="space-y-2 text-[13px] text-background/50">
                <p className="whitespace-pre-line">{t.contatti.address}</p>
                <a href={tel} className="block hover:text-background transition-colors">{phone}</a>
                <a href={`mailto:${t.contatti.email}`} className="block hover:text-background transition-colors">{t.contatti.email}</a>
              </div>
              <div className="flex gap-2 mt-5">
                {(["it", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm transition-colors font-bold ${lang === l ? "bg-background/15 text-background" : "text-background/35 hover:text-background"}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-background/10 pt-6 text-center">
            <p className="text-[11px] text-background/25">© {new Date().getFullYear()} {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
