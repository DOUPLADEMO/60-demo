import { useState } from "react";

const BASE_CHAR = "middle-aged man, average build, salt-and-pepper short hair, neutral expression, white t-shirt, dark jeans, plain background, standing";
const BASE_PARAMS = "--v 7.0 --raw --p l3h4vio gtbhewc";

const CATEGORIES = [
  { id: "all", label: "Mind", color: "#888888" },
  { id: "outfit", label: "Öltözet", color: "#3B82F6" },
  { id: "pose", label: "Póz", color: "#22C55E" },
  { id: "style", label: "Vizuális stílus", color: "#A855F7" },
  { id: "scene", label: "Szituáció", color: "#F59E0B" },
  { id: "era", label: "Korszak", color: "#EC4899" },
  { id: "light", label: "Fény / hangulat", color: "#14B8A6" },
];

const CARDS = [
  // ÖLTÖZET
  { id: 1, cat: "outfit", title: "Üzleti öltöny", hu: "sötétszürke öltöny, fehér ing, nyakkendő nélkül", modify: "wearing a dark charcoal business suit, white dress shirt, no tie, polished oxford shoes" },
  { id: 2, cat: "outfit", title: "Casual streetwear", hu: "kapucnis pulóver, cargo nadrág, futócipő", modify: "wearing a grey hoodie, olive cargo pants, white sneakers, relaxed urban style" },
  { id: 3, cat: "outfit", title: "Séf-egyenruha", hu: "fehér séf-kabát, kötény, toque", modify: "wearing a crisp white chef's coat, kitchen apron, toque blanche, professional kitchen attire" },
  { id: 4, cat: "outfit", title: "Sportruha", hu: "futófelszerelés, tech szövet", modify: "wearing technical running gear, compression shorts, performance fabric jacket, athletic shoes" },
  { id: 5, cat: "outfit", title: "Télikabát", hu: "nehéz gyapjú kabát, sál", modify: "wearing a heavy wool overcoat, dark scarf wrapped around neck, winter gloves" },
  { id: 6, cat: "outfit", title: "Munkásruha", hu: "mechaniküs overall, olajfolt", modify: "wearing mechanic's coveralls, oil-stained work gloves tucked in pocket, steel-toed boots" },
  { id: 7, cat: "outfit", title: "Gálaöltözet", hu: "fekete smoking, csokornyakkendő", modify: "wearing a black tuxedo, white dress shirt, black bow tie, patent leather shoes, formal gala attire" },
  { id: 8, cat: "outfit", title: "Vintage 70s", hu: "széles galléros ing, bővülő nadrág", modify: "wearing a wide-collar patterned shirt, flared trousers, platform shoes, 1970s fashion" },
  { id: 9, cat: "outfit", title: "Tengerész kabát", hu: "navy peacoat, kapitány sapka", modify: "wearing a navy peacoat, dark turtleneck, captain's cap, nautical style" },
  { id: 10, cat: "outfit", title: "Punk / alternatív", hu: "bőrdzseki, szakadt farmernadrág", modify: "wearing a black leather jacket with patches, band t-shirt, ripped jeans, boots, punk aesthetic" },
  { id: 11, cat: "outfit", title: "Linen nyári", hu: "vászon ing, fehér chino", modify: "wearing a loose linen shirt, white chino pants, leather sandals, summer casual Mediterranean style" },
  { id: 12, cat: "outfit", title: "Vadász / outdoor", hu: "waxed jacket, terep nadrág", modify: "wearing a waxed cotton field jacket, tactical trousers, hiking boots, outdoor field gear" },

  // PÓZ
  { id: 13, cat: "pose", title: "Ülő, elgondolkodó", hu: "ülő, áll kézre támaszkodva", modify: "seated in a chair, elbow on knee, chin resting on hand, contemplative expression" },
  { id: 14, cat: "pose", title: "Séta közben", hu: "mozgás közbeni fénykép", modify: "mid-stride, walking toward camera, natural motion blur on feet, candid street photography style" },
  { id: 15, cat: "pose", title: "Karba tett kézzel", hu: "határozott, magabiztos", modify: "arms crossed over chest, feet shoulder-width apart, confident direct eye contact" },
  { id: 16, cat: "pose", title: "Falnak dőlve", hu: "relaxált, oldal", modify: "leaning casually against a wall, one hand in pocket, relaxed posture, looking slightly off camera" },
  { id: 17, cat: "pose", title: "Félprofilban", hu: "3/4 arcrészlet, oldalnézet", modify: "3/4 profile view, facing left, slight upward gaze" },
  { id: 18, cat: "pose", title: "Hátulról / elvonuló", hu: "háttal, távolodó", modify: "shot from behind, walking away, rear view, receding figure" },
  { id: 19, cat: "pose", title: "Dinamikus akció", hu: "sportszerű ugró póz", modify: "dynamic action pose, mid-jump, arms extended, full body motion" },
  { id: 20, cat: "pose", title: "Szemközt ülve", hu: "tárgyaláson, előrehajoló", modify: "seated at a table, leaning forward slightly, hands clasped, engaged business meeting posture" },

  // VIZUÁLIS STÍLUS
  { id: 21, cat: "style", title: "Olajfestmény – flamand", hu: "barokk portré, Rembrandt stílus", modify: "rendered as a Flemish Baroque oil painting, dramatic chiaroscuro lighting, Rembrandt style, museum quality canvas texture" },
  { id: 22, cat: "style", title: "Akvarell", hu: "laza ecsetkezelés, vizes határok", modify: "rendered as loose watercolor illustration, soft wet edges, visible paper texture, delicate washes of color" },
  { id: 23, cat: "style", title: "Grafikus novel / képregény", hu: "vastag körvonal, lapos szín", modify: "graphic novel illustration style, bold ink outlines, flat cel-shaded colors, comic book panel aesthetic" },
  { id: 24, cat: "style", title: "Film noir", hu: "fekete-fehér, drámai árnyékok", modify: "black and white film noir style, harsh shadow contrast, venetian blind shadow patterns, 1940s cinematic atmosphere" },
  { id: 25, cat: "style", title: "Art Deco plakát", hu: "geometrikus, vintage poszter", modify: "vintage Art Deco poster illustration, geometric flat shapes, limited color palette, 1930s poster typography, bold composition" },
  { id: 26, cat: "style", title: "Anime karakter", hu: "japán animáció stílusban", modify: "anime character design style, large expressive eyes, clean line art, cel-shading, manga-inspired illustration" },
  { id: 27, cat: "style", title: "Cyberpunk", hu: "neon, esős éjszaka, holografikus", modify: "cyberpunk aesthetic, neon purple and teal reflections on wet streets, holographic UI elements, rain, dark futuristic cityscape" },
  { id: 28, cat: "style", title: "Impresszionista festmény", hu: "Renoir / Monet hatás", modify: "Impressionist oil painting style, visible loose brushstrokes, dappled light, Renoir palette, soft outdoor light" },
  { id: 29, cat: "style", title: "Pixar 3D karakter", hu: "animációs film renderelés", modify: "3D animated character, Pixar rendering quality, subsurface skin scattering, expressive proportions, studio animation lighting" },
  { id: 30, cat: "style", title: "Retro 80s szintwave", hu: "neon, geometrikus grid, lila-pink", modify: "synthwave retro 80s aesthetic, neon pink and purple color palette, geometric grid background, chrome chrome chrome" },
  { id: 31, cat: "style", title: "Ceruza vázlat", hu: "kézzel rajzolt, keresztvonalazás", modify: "detailed pencil sketch illustration, cross-hatching shadows, graphite texture, sketchbook aesthetic" },
  { id: 32, cat: "style", title: "Linómetszet", hu: "fametszet nyomat stílus", modify: "linocut print illustration, bold carved lines, limited two-color palette, woodblock print aesthetic, handmade texture" },
  { id: 33, cat: "style", title: "Lapos vektor illusztráció", hu: "minimál, SVG-szerű stílus", modify: "flat vector illustration style, minimal geometric shapes, clean lines, limited color palette, editorial infographic aesthetic" },
  { id: 34, cat: "style", title: "Pointillizmus", hu: "Seurat pontok, festett", modify: "Pointillist painting style, composed entirely of colored dots, Seurat technique, soft warm palette, outdoor light" },
  { id: 35, cat: "style", title: "Papírkivágás / collage", hu: "rétegelt papír illusztráció", modify: "paper cut collage art, layered paper illustration, visible paper edges and shadows, flat geometric shapes, Matisse-inspired" },

  // SZITUÁCIÓ / JELENET
  { id: 36, cat: "scene", title: "Fine dining étterem", hu: "Michelin-csillagos, gyertyafény", modify: "interior of a Michelin-starred restaurant, candlelit, white tablecloths, sommelier in background, warm intimate lighting" },
  { id: 37, cat: "scene", title: "Városi utca – arany óra", hu: "golden hour, európai belvárosnál", modify: "European city street, golden hour sunlight, long shadows, cobblestones, pedestrians blurred in background" },
  { id: 38, cat: "scene", title: "Irodai tárgyaló", hu: "üvegfalas boardroom, kilátás", modify: "modern boardroom interior, floor-to-ceiling windows with city view, conference table, professional corporate environment" },
  { id: 39, cat: "scene", title: "Erdő / természet", hu: "erdei ösvény, szórt fény", modify: "forest trail, dappled morning light through tree canopy, moss-covered ground, peaceful nature setting" },
  { id: 40, cat: "scene", title: "Kávézó", hu: "presszó, reggeli fény", modify: "espresso bar interior, morning light, marble counter, coffee equipment, newspaper, casual urban cafe atmosphere" },
  { id: 41, cat: "scene", title: "Ipari csarnok", hu: "raktár, beton, acél", modify: "industrial warehouse interior, exposed steel beams, concrete floor, dramatic raking light through high windows" },
  { id: 42, cat: "scene", title: "Havas hegycsúcs", hu: "alpesi panoráma, tél", modify: "snow-covered alpine mountain peak, clear blue sky, frozen landscape, dramatic elevation, winter wilderness" },
  { id: 43, cat: "scene", title: "Vasútállomás", hu: "gőz, gőzgép, peron", modify: "historic railway station platform, steam from locomotive, dramatic vaulted ceiling, travelers with luggage, atmospheric haze" },
  { id: 44, cat: "scene", title: "Tengerpart naplement", hu: "homok, tenger, lila égbolt", modify: "ocean beach at sunset, wet sand reflections, purple and orange sky, gentle waves, solitary atmosphere" },
  { id: 45, cat: "scene", title: "Nagy könyvtár", hu: "spirális lépcső, könyvek", modify: "grand library interior, spiral staircase, floor-to-ceiling bookshelves, warm reading lamp, late afternoon light" },

  // KORSZAK / IDŐSZAK
  { id: 46, cat: "era", title: "Reneszánsz portré", hu: "XV. századi flamand festmény", modify: "15th century Flemish Renaissance portrait, dark background, detailed clothing of the period, Holbein portrait style" },
  { id: 47, cat: "era", title: "Viktoriánus kor", hu: "1880-as évek, mellény, cilinder", modify: "Victorian era 1880s fashion, tweed waistcoat, pocket watch chain, top hat, formal stiff collar" },
  { id: 48, cat: "era", title: "1950-es évek Amerika", hu: "diner, kockás ing, pompadour", modify: "1950s American Americana style, plaid shirt, rolled denim cuffs, pompadour hairstyle, classic diner background" },
  { id: 49, cat: "era", title: "1980-as évek", hu: "neon, laza öltöny, wide lapels", modify: "1980s fashion, wide lapel blazer, Miami Vice pastel colors, aviator sunglasses, power suit aesthetic" },
  { id: 50, cat: "era", title: "Középkori lovag", hu: "páncél, tarisnya, kastély", modify: "medieval knight in full plate armor, castle courtyard background, sword at belt, heraldic shield, 14th century period costume" },
  { id: 51, cat: "era", title: "Jövőbeli / 2150", hu: "sci-fi öltözet, holografikus UI", modify: "year 2150 futuristic outfit, sleek minimalist design, bioluminescent fabric accents, holographic interface elements floating nearby" },
  { id: 52, cat: "era", title: "I. világháború korszak", hu: "szépiahatás, 1910-es évek", modify: "World War I era 1910s clothing, wool coat, flat cap, sepia tone photography style, period-accurate wardrobe" },

  // FÉNY / HANGULAT
  { id: 53, cat: "light", title: "Rembrandt-fény", hu: "drámai oldalfény, árnyékos arc", modify: "dramatic Rembrandt lighting, single directional light source from upper left, deep shadow on half the face, warm amber tones" },
  { id: 54, cat: "light", title: "Golden hour háttérfény", hu: "napfény hátulról, bokeh", modify: "golden hour backlight, warm amber rim light, soft bokeh foreground, lens flare, late afternoon sun low on horizon" },
  { id: 55, cat: "light", title: "Kék óra / blue hour", hu: "szürkület, városi fények", modify: "blue hour twilight lighting, cool blue ambient light, warm city lights in background, post-sunset atmosphere" },
  { id: 56, cat: "light", title: "Studio fehér", hu: "tiszta fehér háttér, softbox", modify: "clean white studio background, soft even softbox lighting, minimal shadows, professional commercial photography setup" },
  { id: 57, cat: "light", title: "Neon éjszaka", hu: "lila-türkiz neon fénybevonás", modify: "nighttime neon lighting, purple and teal neon signs reflecting on skin and clothes, dark urban night scene, wet pavement reflections" },
  { id: 58, cat: "light", title: "Kandallófény", hu: "meleg, intim, meleg narancs", modify: "fireplace glow lighting, warm orange flickering light, intimate atmosphere, deep shadows, cozy interior evening" },
  { id: 59, cat: "light", title: "Ködfátyol / mist", hu: "reggeli köd, diffúz fény", modify: "early morning mist, soft diffused foggy light, hazy atmospheric depth, cool blue-gray tones, forest or park setting" },
  { id: 60, cat: "light", title: "Alulról megvilágított", hu: "drámai, horror hangulat", modify: "dramatic under-lighting, single light source from below illuminating face upward, high contrast, theatrical moody atmosphere" },
];

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function NanoBananaDemo() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [copied, setCopied] = useState(null);

  const filtered = activeCategory === "all"
    ? CARDS
    : CARDS.filter(c => c.cat === activeCategory);

  const getCategoryMeta = (catId) => CATEGORIES.find(c => c.id === catId);

  const buildFullPrompt = (card) => {
    return `${BASE_CHAR}, ${card.modify} ${BASE_PARAMS}`;
  };

  const handleCopy = (card) => {
    const text = buildFullPrompt(card);
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
      setCopied(card.id);
      setTimeout(() => setCopied(null), 1800);
    } catch (err) {
      console.error("Copy failed:", err);
    }
    document.body.removeChild(textarea);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0C0C0C",
      color: "#F0F0F0",
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      padding: "0 0 80px 0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #222",
        padding: "36px 40px 28px",
        position: "sticky",
        top: 0,
        background: "#0C0C0C",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "#FF5C1A", textTransform: "uppercase", fontWeight: 600 }}>NanoBanana Pro</span>
          <span style={{ color: "#333", fontSize: 11 }}>—</span>
          <span style={{ fontSize: 11, color: "#666", letterSpacing: "0.06em", textTransform: "uppercase" }}>Modify variáció demo</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px", lineHeight: 1.2 }}>
          1 alap karakter →{" "}
          <span style={{ color: "#FF5C1A" }}>{CARDS.length} modify variáció</span>
        </h1>

        {/* Base character pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 14,
          background: "#161616",
          border: "1px solid #2A2A2A",
          borderRadius: 6,
          padding: "7px 14px",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%", background: "#22C55E",
            boxShadow: "0 0 6px #22C55E",
          }} />
          <span style={{ fontSize: 11, color: "#888", fontFamily: "monospace", letterSpacing: "0.02em" }}>
            BASE: {BASE_CHAR}
            <span style={{ color: "#555", marginLeft: 8 }}>{BASE_PARAMS}</span>
          </span>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 6, marginTop: 18, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => {
            const count = cat.id === "all" ? CARDS.length : CARDS.filter(c => c.cat === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 4,
                  border: isActive ? `1px solid ${cat.color}` : "1px solid #2A2A2A",
                  background: isActive ? `${cat.color}18` : "transparent",
                  color: isActive ? cat.color : "#888",
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                  transition: "all 0.12s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {cat.label}
                <span style={{
                  fontSize: 10,
                  opacity: 0.7,
                  background: isActive ? `${cat.color}30` : "#1E1E1E",
                  padding: "1px 5px",
                  borderRadius: 3,
                }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
        gap: 1,
        padding: "1px 0",
      }}>
        {filtered.map(card => {
          const catMeta = getCategoryMeta(card.cat);
          const isCopied = copied === card.id;
          const fullPrompt = buildFullPrompt(card);

          return (
            <div
              key={card.id}
              style={{
                background: "#111111",
                padding: "18px 20px",
                borderBottom: "1px solid #1A1A1A",
                borderRight: "1px solid #1A1A1A",
                transition: "background 0.1s",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#151515"}
              onMouseLeave={e => e.currentTarget.style.background = "#111111"}
            >
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: catMeta.color,
                    fontWeight: 700,
                    background: `${catMeta.color}15`,
                    padding: "2px 6px",
                    borderRadius: 3,
                  }}>
                    {catMeta.label}
                  </span>
                  <span style={{ fontSize: 10, color: "#444" }}>#{String(card.id).padStart(2, "0")}</span>
                </div>
                <button
                  onClick={() => handleCopy(card)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: isCopied ? "1px solid #22C55E" : "1px solid #252525",
                    background: isCopied ? "#22C55E18" : "transparent",
                    color: isCopied ? "#22C55E" : "#555",
                    fontSize: 11,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {isCopied ? <CheckIcon /> : <CopyIcon />}
                  {isCopied ? "Másolva" : "Prompt"}
                </button>
              </div>

              {/* Title */}
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", color: "#F0F0F0", marginBottom: 3 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {card.hu}
                </div>
              </div>

              {/* Modify fragment */}
              <div style={{
                background: "#0A0A0A",
                border: "1px solid #1E1E1E",
                borderRadius: 5,
                padding: "8px 10px",
              }}>
                <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                  MODIFY FRAGMENT
                </div>
                <div style={{ fontSize: 11, color: "#888", fontFamily: "monospace", lineHeight: 1.5, wordBreak: "break-word" }}>
                  {card.modify}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer count */}
      <div style={{
        textAlign: "center",
        padding: "40px 20px 20px",
        color: "#333",
        fontSize: 12,
        letterSpacing: "0.04em",
      }}>
        {filtered.length} variáció megjelenítve · összes: {CARDS.length} · alap prompt zárolva: BASE + modify + {BASE_PARAMS}
      </div>
    </div>
  );
}
