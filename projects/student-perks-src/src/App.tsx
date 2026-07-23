import { useMemo, useState } from "react";
import offersData from "./data/offers.json";

type Offer = {
  company: string;
  description: string;
  note: string;
  category: string;
  claimLink: string;
  domain: string;
};

const rawOffers = offersData as Offer[];

const POPULAR_ORDER = [
  "lovable", "cursor", "windsurf", "bolt", "v0", "replit",
  "chatgpt", "openai", "claude", "anthropic", "perplexity", "gemini", "google gemini",
  "github", "github copilot", "copilot", "notion", "figma", "canva", "framer", "linear",
  "vercel", "netlify", "supabase", "mongodb", "digitalocean", "cloudflare",
  "spotify", "apple music", "youtube", "youtube premium", "amazon prime", "amazon prime student",
  "adobe", "adobe creative cloud", "microsoft", "microsoft 365", "office 365", "apple",
  "jetbrains", "docker", "postman", "grammarly", "quillbot", "duolingo", "coursera", "udemy", "skillshare",
  "midjourney", "runway", "elevenlabs", "elevenreader", "descript", "loom", "otter", "otter.ai",
  "gamma", "tome", "beautiful.ai", "miro", "airtable", "slack", "discord", "zoom", "linkedin", "linkedin learning",
  "hellofresh", "uber", "uber eats", "deliveroo", "nike", "adidas", "samsung", "hp", "dell",
  "squarespace", "wix", "shopify", "todoist", "fathom", "poe", "hugging face", "huggingface",
  "emirates",
];
const POPULAR_RANK = new Map(POPULAR_ORDER.map((n, i) => [n, i]));
function rankOf(company: string) {
  const key = company.trim().toLowerCase();
  if (POPULAR_RANK.has(key)) return POPULAR_RANK.get(key)!;
  for (const [name, rank] of POPULAR_RANK) {
    if (key.includes(name)) return rank + 0.5;
  }
  return Number.POSITIVE_INFINITY;
}
const offers = [...rawOffers].sort((a, b) => {
  const ra = rankOf(a.company);
  const rb = rankOf(b.company);
  if (ra !== rb) return ra - rb;
  return a.company.localeCompare(b.company);
});

const CATEGORIES = (() => {
  const counts = new Map<string, number>();
  offers.forEach((o) => counts.set(o.category, (counts.get(o.category) ?? 0) + 1));
  return [
    { name: "All", count: offers.length },
    ...Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count })),
  ];
})();

const BADGE_COLORS = [
  "bg-rose-100 text-rose-900",
  "bg-amber-100 text-amber-900",
  "bg-emerald-100 text-emerald-900",
  "bg-sky-100 text-sky-900",
  "bg-violet-100 text-violet-900",
  "bg-orange-100 text-orange-900",
];
function hashColor(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return BADGE_COLORS[h % BADGE_COLORS.length];
}

function Logo({ domain, company }: { domain: string; company: string }) {
  const [failed, setFailed] = useState(false);
  const initial = company.trim().charAt(0).toUpperCase() || "?";
  if (failed || !domain) {
    return (
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-display text-xl font-bold ${hashColor(company)}`}
      >
        {initial}
      </div>
    );
  }
  return (
    <img
      src={`https://unavatar.io/${domain}?fallback=false`}
      alt={`${company} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-14 w-14 shrink-0 rounded-xl border border-border bg-white object-contain p-1"
    />
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return offers.filter((o) => {
      if (cat !== "All" && o.category !== cat) return false;
      if (!needle) return true;
      return (
        o.company.toLowerCase().includes(needle) ||
        o.description.toLowerCase().includes(needle) ||
        o.note.toLowerCase().includes(needle) ||
        o.category.toLowerCase().includes(needle)
      );
    });
  }, [query, cat]);

  const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href={import.meta.env.BASE_URL} className="flex items-center gap-2">
            <img
              src={logoSrc}
              alt="StudentPerks logo"
              className="h-9 w-9 rounded-lg object-contain"
            />
            <span className="font-display text-lg font-bold tracking-tight">
              StudentPerks
            </span>
          </a>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Student perks
            <br />
            <span className="text-primary">worth grabbing.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Search verified student discounts. Pick one, click through, claim
            it on the brand's own site.
          </p>

          <div className="mt-10 max-w-2xl">
            <label htmlFor="search" className="sr-only">
              Search offers
            </label>
            <div className="relative">
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Notion, GitHub, Spotify, Figma…"
                className="w-full rounded-2xl border-2 border-foreground bg-card px-6 py-5 text-lg font-medium shadow-[6px_6px_0_0_var(--foreground)] outline-none transition focus:shadow-[3px_3px_0_0_var(--foreground)] focus:translate-x-[3px] focus:translate-y-[3px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 py-4">
          <div className="flex gap-2 whitespace-nowrap">
            {CATEGORIES.map((c) => {
              const active = cat === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setCat(c.name)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-foreground hover:border-foreground"
                  }`}
                >
                  {c.name}{" "}
                  <span
                    className={`ml-1 text-xs ${active ? "opacity-70" : "text-muted-foreground"}`}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "offer" : "offers"}
            {cat !== "All" && <> in {cat}</>}
            {query && <> matching "{query}"</>}
          </p>
          {(query || cat !== "All") && (
            <button
              onClick={() => {
                setQuery("");
                setCat("All");
              }}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border py-20 text-center">
            <p className="font-display text-2xl font-bold">No offers found.</p>
            <p className="mt-2 text-muted-foreground">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((o, i) => (
              <OfferCard key={`${o.company}-${i}`} offer={o} />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} StudentPerks. All discounts belong to
            their respective brands.
          </p>
          <p>
            Made with <span className="text-primary">♥</span> by Sai Teja
          </p>
        </div>
      </footer>
    </div>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="group flex flex-col rounded-2xl border-2 border-border bg-card p-5 transition hover:-translate-y-1 hover:border-foreground hover:shadow-[6px_6px_0_0_var(--foreground)]">
      <div className="flex items-start gap-4">
        <Logo domain={offer.domain} company={offer.company} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-lg font-bold">
            {offer.company}
          </h3>
          <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${hashColor(offer.category)}`}
          >
            {offer.category}
          </span>
        </div>
      </div>

      {offer.note && (
        <div className="mt-4 rounded-xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
          {offer.note}
        </div>
      )}

      <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">
        {offer.description}
      </p>

      <a
        href={offer.claimLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-center rounded-xl bg-foreground px-4 py-3 font-display text-sm font-bold text-background transition hover:bg-primary"
      >
        Claim offer →
      </a>
    </article>
  );
}
