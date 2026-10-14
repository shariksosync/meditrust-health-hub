import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import heroImage from "../assets/meditrust-healthcare.jpg";
import { adminSections, articles as seedArticles, categories as seedCategories, company, doctors, faqs as seedFaqs, labTests as seedLabTests, offers as seedOffers, specialties } from "../data/demo";
import { useApp } from "../context/AppContext";

const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;
const safeImage = (id, width = 560) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
const slug = (text) => String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function go(path) {
  if (typeof window === "undefined") return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "instant" });
}

function A({ href = "#", children, className = "", ...props }) {
  return <a href={href} className={className} onClick={(event) => {
    props.onClick?.(event);
    if (!event.defaultPrevented && href.startsWith("/") && !event.metaKey && !event.ctrlKey && event.button === 0) {
      event.preventDefault(); go(href);
    }
  }}>{children}</a>;
}

function Icon({ name, size = 20, className = "" }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": true };
  const paths = {
    shield: <><path d="M12 3 20 6v5c0 5-3.5 8.4-8 10-4.5-1.6-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></>,
    cart: <><path d="M3 4h2l2.1 11h10.8l2-8H6"/><circle cx="9" cy="19" r="1"/><circle cx="17" cy="19" r="1"/></>,
    heart: <path d="M20.8 8.8c0 5.2-8.8 10.4-8.8 10.4S3.2 14 3.2 8.8A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.5Z"/>,
    user: <><circle cx="12" cy="8" r="3.4"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    cross: <><path d="M12 4v16M4 12h16"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    leaf: <><path d="M20 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 10-5 10-15Z"/><path d="M4 21c2-5 6-8 12-11"/></>,
    bottle: <><path d="M9 3h6M10 3v4l-3 3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9l-3-3V3"/><path d="M8 13h8"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    drop: <><path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12Z"/><path d="M9 16a3 3 0 0 0 3 3"/></>,
    flower: <><circle cx="12" cy="12" r="2"/><path d="M12 10c-4-8 5-9 4-3 5-2 8 4 2 6 6 4 0 9-4 4-3 7-9 3-4-2-7-1-6-8 0-7-1-6 6-6 6 0"/></>,
    sparkle: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    menuDots: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    lab: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"/><path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20"/></>,
    package: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8m-9 5v9"/></>,
    back: <><path d="M19 12H5m7 7-7-7 7-7"/></>,
  };
  return <svg {...common}>{paths[name] || paths.cross}</svg>;
}

function Brand({ small = false }) {
  return <A href="/" className="brand"><span className="brand-mark"><Icon name="shield" size={25}/></span><span><strong>MEDITRUST</strong>{!small && <small>LIFE SCIENCE</small>}</span></A>;
}

function SearchBox({ prominent = false }) {
  const { state } = useApp();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const suggestions = useMemo(() => value.trim() ? state.products.filter((item) => `${item.name} ${item.category} ${item.brand}`.toLowerCase().includes(value.toLowerCase())).slice(0, 4) : [], [value, state.products]);
  const submit = (event) => { event.preventDefault(); go(`/search?q=${encodeURIComponent(value)}`); setOpen(false); };
  return <form className={`search-box ${prominent ? "search-box-large" : ""}`} onSubmit={submit} role="search">
    <Icon name="search" size={19}/><input aria-label="Search medicines and healthcare" value={value} onChange={(event) => { setValue(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} placeholder="Search medicines, products & more"/>
    <button type="submit" className="search-submit" aria-label="Search"><span>Search</span><Icon name="arrow" size={17}/></button>
    {open && suggestions.length > 0 && <div className="suggestions">{suggestions.map((item) => <A href={`/product/${item.id}`} key={item.id}><Icon name="bottle" size={16}/>{item.name}<span>{money(item.price)}</span></A>)}</div>}
  </form>;
}

function Header() {
  const { state } = useApp();
  const [mobile, setMobile] = useState(false);
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const nav = [["Medicines", "/medicines"], ["Healthcare products", "/healthcare"], ["Lab tests", "/lab-tests"], ["Consult a doctor", "/consult-doctor"], ["Health articles", "/health-articles"], ["Offers", "/offers"], ["About us", "/about"]];
  return <>
    {state.settings.announcementVisible && <div className="announcement"><div className="page-width announcement-inner"><span><Icon name="sparkle" size={14}/>{state.settings.announcement}</span><A href="/healthcare-disclaimer">Demonstration site · Learn more <Icon name="arrow" size={14}/></A></div></div>}
    <header className="site-header">
      <div className="page-width header-main"><Brand/><div className="location-pill"><Icon name="pin" size={17}/><span><small>DEMO LOCATION</small><strong>Pimpri-Chinchwad</strong></span></div>
        <div className="desktop-search"><SearchBox/></div>
        <div className="header-actions"><A href="/profile" aria-label="Account" className="icon-action"><Icon name="user"/><span>Account</span></A><A href="/wishlist" aria-label="Wishlist" className="icon-action"><span className="icon-count"><Icon name="heart"/>{state.wishlist.length > 0 && <i>{state.wishlist.length}</i>}</span><span>Wishlist</span></A><A href="/cart" aria-label="Cart" className="icon-action"><span className="icon-count"><Icon name="cart"/>{count > 0 && <i>{count}</i>}</span><span>Cart</span></A><button className="mobile-menu-trigger" onClick={() => setMobile(!mobile)} aria-label={mobile ? "Close menu" : "Open menu"}><Icon name={mobile ? "close" : "menu"}/></button></div>
      </div>
      <div className="mobile-search"><div className="page-width"><SearchBox/></div></div>
      <nav className={`main-nav ${mobile ? "nav-open" : ""}`} aria-label="Main navigation"><div className="page-width nav-inner">{nav.map(([label, href]) => <A key={href} href={href} onClick={() => setMobile(false)}>{label}</A>)}</div></nav>
    </header>
  </>;
}

function Footer() {
  return <footer className="site-footer"><div className="page-width"><div className="footer-grid">
    <div className="footer-brand"><Brand/><p>Thoughtful access to everyday healthcare essentials and services.</p><p className="footer-contact"><Icon name="pin" size={16}/>{company.address}</p><p className="footer-contact"><Icon name="user" size={16}/><a href={`tel:${company.phone}`}>{company.phone}</a></p><p className="footer-contact"><Icon name="book" size={16}/><a href={`mailto:${company.email}`}>{company.email}</a></p></div>
    <div><h3>Company</h3><A href="/about">About MEDITRUST</A><A href="/about">Our services</A><A href="/contact">Contact us</A><A href="/careers">Careers</A></div>
    <div><h3>Healthcare services</h3><A href="/medicines">Order medicines</A><A href="/healthcare">Healthcare products</A><A href="/lab-tests">Book lab tests</A><A href="/consult-doctor">Consult a doctor</A><A href="/health-articles">Health articles</A></div>
    <div><h3>Customer support</h3><A href="/faq">FAQs</A><A href="/shipping-policy">Shipping policy</A><A href="/returns-policy">Returns & refunds</A><A href="/privacy-policy">Privacy policy</A><A href="/terms">Terms & conditions</A></div>
  </div><div className="footer-bottom"><span>© 2026 MEDITRUST LIFE SCIENCE PVT LTD</span><span>Prototype only. No medicines, tests, appointments or payments are fulfilled.</span><A className="admin-entry" href="/admin/login">Admin Login <Icon name="arrow" size={13}/></A></div></div></footer>;
}

function Layout({ children }) {
  return <div className="app-shell"><Header/><main>{children}</main><Footer/><a href="/cart" className="mobile-cart" aria-label="Open cart"><Icon name="cart" size={19}/> View cart</a></div>;
}

function SectionHeading({ eyebrow, title, description, href, action = "View all" }) {
  return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{href && <A className="text-link" href={href}>{action}<Icon name="arrow" size={16}/></A>}</div>;
}

function Breadcrumbs({ items = [] }) {
  return <div className="breadcrumbs"><A href="/">Home</A>{items.map(([label, href], index) => <span key={`${label}-${index}"><b>/</b>{href ? <A href={href}>{label}</A> : <span>{label}</span>}</span>)}</div>;
}

function CategoryArt({ category, index = 0 }) {
  const map = { "Prescription medicines": "bottle", "OTC medicines": "bottle", "Vitamins & supplements": "sun", "Diabetes care": "drop", "Women's health": "flower", "Baby care": "heart", "Personal care": "sparkle", "Medical devices": "monitor", "Nutrition & wellness": "leaf", "First aid": "plus" };
  return <div className={`category-art art-tone-${index % 6}`}><span className="art-ring"/><span className="art-item"><Icon name={map[category] || "cross"} size={42}/></span><span className="art-caption">MEDITRUST</span></div>;
}

function ProductCard({ product }) {
  const { state, addToCart, toggleWishlist } = useApp();
  const wished = state.wishlist.includes(product.id);
  return <article className="product-card"><div className="product-visual"><A href={`/product/${product.id}`}><CategoryArt category={product.category} index={Number(product.id.slice(-1))}/></A>{product.prescription && <span className="rx-badge">Prescription</span>}<button className={`wishlist-button ${wished ? "is-wished" : ""}`} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} onClick={() => toggleWishlist(product.id)}><Icon name="heart" size={18}/></button>{product.featured && <span className="featured-tag">Popular</span>}</div><div className="product-copy"><span className="product-category">{product.category}</span><A href={`/product/${product.id}`} className="product-title">{product.name}</A><span className="product-pack">{product.brand} · {product.pack}</span><div className="product-price"><strong>{money(product.price)}</strong>{product.mrp > product.price && <><del>{money(product.mrp)}</del><span>{Math.round((1 - product.price / product.mrp) * 100)}% off</span></>}</div><button className="button button-outline add-button" onClick={() => addToCart(product)}><Icon name="plus" size={16}/> Add to cart</button></div></article>;
}

function ProductGrid({ items }) {
  if (!items.length) return <EmptyState icon="search" title="Nothing matched this search" message="Try another name or choose a different category."/>
  return <div className="product-grid">{items.map((item) => <ProductCard key={item.id} product={item}/>)}</div>;
}

function EmptyState({ icon = "package", title, message, action, href = "/medicines" }) {
  return <div className="empty-state"><span className="empty-icon"><Icon name={icon} size={26}/></span><h3>{title}</h3><p>{message}</p>{action && <A href={href} className="button button-primary">{action}</A>}</div>;
}

const serviceCards = [
  ["Order medicines", "Browse a sample pharmacy catalog", "bottle", "/medicines"], ["Healthcare products", "Everyday wellness essentials", "leaf", "/healthcare"],
  ["Book lab tests", "Explore sample diagnostic listings", "lab", "/lab-tests"], ["Consult a doctor", "See example specialties", "user", "/consult-doctor"],
  ["Personal care", "Care for your everyday routine", "sparkle", "/healthcare/personal-care"], ["Health records", "A private demo profile area", "book", "/profile"],
];

function HomePage() {
  const { state } = useApp();
  const setting = state.settings;
  const image = setting.heroImage || heroImage;
  const visibleProducts = state.products.filter((item) => item.visible && item.featured).slice(0, 8);
  return <>
    <section className="hero-section"><div className="page-width hero-layout"><div className="hero-copy"><span className="eyebrow"><Icon name="shield" size={15}/> MEDITRUST · EVERYDAY HEALTHCARE</span><h1>{setting.heroTitle}</h1><p>{setting.heroSubtitle}</p><div className="hero-actions"><A href="/medicines" className="button button-primary">{setting.heroPrimaryText}<Icon name="arrow" size={17}/></A><A href="/lab-tests" className="button button-light">{setting.heroSecondaryText}</A></div><div className="hero-search-label">Find what you need</div><SearchBox prominent/><span className="demo-note"><Icon name="check" size={15}/> A demonstration platform · no real services connected</span></div><div className="hero-photo"><img src={image} alt="A pharmacist speaking with a customer at a bright pharmacy" width="1600" height="1008"/><div className="photo-caption"><span><Icon name="shield" size={19}/></span><div><strong>Healthcare, made more considered.</strong><small>Explore a thoughtful digital healthcare experience</small></div></div></div></div></section>
    <section className="page-width service-section"><SectionHeading eyebrow="A better everyday" title="Care, all in one place" description="Explore the services in this MEDITRUST demonstration."/><div className="service-grid">{serviceCards.map(([title, text, icon, href], index) => <A href={href} className="service-card" key={title}><span className={`service-icon service-tone-${index}`}><Icon name={icon} size={22}/></span><strong>{title}</strong><small>{text}</small><span className="service-arrow"><Icon name="arrow" size={16}/></span></A>)}</div></section>
    <section className="category-section"><div className="page-width"><SectionHeading eyebrow="Thoughtfully selected" title="Shop by category" description="Everyday essentials across health, wellness and personal care." href="/healthcare"/><div className="category-grid">{state.categories.filter((category) => category.visible !== false).map((category, index) => <A href={`/healthcare/${category.slug}`} className="category-card" key={category.slug}><CategoryArt category={category.name} index={index}/><span><strong>{category.name}</strong><small>{category.description}</small></span></A>)}</div></div></section>
    <section className="page-width featured-section"><SectionHeading eyebrow="Popular picks" title="Everyday essentials" description="A selection of illustrative products from our demo catalog." href="/medicines"/><ProductGrid items={visibleProducts}/></section>
    <section className="page-width promo-grid"><A href="/healthcare" className="promo-banner promo-mint"><span className="eyebrow">WELLNESS & NUTRITION</span><h2>Small rituals.<br/>A little more care.</h2><span className="text-link">Explore wellness <Icon name="arrow" size={16}/></span><span className="promo-illustration"><Icon name="leaf" size={72}/></span></A><A href="/lab-tests" className="promo-banner promo-blue"><span className="eyebrow">DIAGNOSTIC SERVICES · DEMO</span><h2>Explore health<br/>check-up listings.</h2><span className="text-link">View sample tests <Icon name="arrow" size={16}/></span><span className="promo-illustration"><Icon name="lab" size={72}/></span></A></section>
    <section className="lab-section"><div className="page-width"><SectionHeading eyebrow="Diagnostic services · demonstration" title="Explore sample lab tests" description="Example listings only. No lab partner or booking service is connected." href="/lab-tests"/><div className="lab-grid">{state.labTests.slice(0, 4).map((test) => <article className="lab-card" key={test.id}><span className="lab-icon"><Icon name="lab" size={21}/></span><span className="lab-category">{test.category}</span><h3>{test.name}</h3><p>{test.sample}</p><div><strong>{money(test.price)}</strong><A href={`/lab-tests/${test.id}`}>View details <Icon name="arrow" size={14}/></A></div></article>)}</div></div></section>
    <section className="page-width consult-strip"><div><span className="eyebrow">DOCTOR CONSULTATION · DEMO</span><h2>Explore care by specialty</h2><p>Example profiles only. No real consultation is available here.</p></div><div className="specialty-list">{specialties.slice(0, 4).map((item) => <A href={`/doctors/${slug(item)}`} key={item}><Icon name="cross" size={17}/>{item}<Icon name="arrow" size={15}/></A>)}<A className="specialty-all" href="/consult-doctor">See all specialties <Icon name="arrow" size={15}/></A></div></section>
    <section className="trust-section"><div className="page-width"><SectionHeading eyebrow="Our approach" title="A more thoughtful way to explore healthcare"/><div className="trust-grid">{[["Authenticity-focused sourcing", "A product-first experience designed around clear information.", "shield"], ["Convenient ordering", "Browse a demonstration catalog and explore the shopping flow.", "package"], ["Customer assistance", "Company contact details are available whenever you need them.", "user"], ["Transparent pricing", "Illustrative prices are displayed before the mock checkout.", "check"]].map(([title, description, icon]) => <div className="trust-item" key={title}><Icon name={icon} size={23}/><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>
    <section className="page-width articles-section"><SectionHeading eyebrow="From the journal" title="A little more to know" description="General educational information, not a substitute for professional advice." href="/health-articles"/><div className="article-grid">{state.articles.slice(0, 3).map((article) => <ArticleCard article={article} key={article.slug}/>)}</div><p className="disclaimer-inline">Health information on this site is for general educational purposes only. Consult a qualified healthcare professional for personal advice.</p></section>
    <Newsletter/>
  </>;
}

function ArticleCard({ article, compact = false }) {
  return <article className={`article-card ${compact ? "article-compact" : ""}`}><A href={`/health-articles/${article.slug}`} className="article-image"><img loading="lazy" src={safeImage(article.image, 700)} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }}/><span className="article-image-mark"><Icon name="book" size={28}/></span></A><div className="article-copy"><span className="product-category">{article.category} <b>·</b> {article.readingTime} read</span><A href={`/health-articles/${article.slug}`} className="article-title">{article.title}</A><p>{article.excerpt}</p><A className="text-link" href={`/health-articles/${article.slug}`}>Read article <Icon name="arrow" size={15}/></A></div></article>;
}

function Newsletter() {
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  return <section className="newsletter"><div className="page-width newsletter-inner"><div><span className="eyebrow">A NOTE FROM MEDITRUST</span><h2>Thoughtful updates, now and then.</h2><p>A demo-only sign-up. Nothing will be sent or stored.</p></div>{done ? <div className="newsletter-success"><Icon name="check" size={19}/>Thanks — this was a demonstration submission.</div> : <form onSubmit={(event) => { event.preventDefault(); if (email.includes("@")) setDone(true); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="Your email address"/><button className="button button-primary" type="submit">Join the list <Icon name="arrow" size={16}/></button></form>}</div></section>;
}

function ListingPage({ path, query = "" }) {
  const { state } = useApp();
  const [search, setSearch] = useState(query);
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("Popular");
  const [maximum, setMaximum] = useState(3000);
  const healthcareOnly = path.startsWith("/healthcare");
  const categorySlug = path.split("/")[2];
  const initialCategory = categorySlug ? state.categories.find((item) => item.slug === categorySlug)?.name : null;
  const candidates = state.products.filter((item) => item.visible && (healthcareOnly ? item.category !== "Prescription medicines" : true));
  const filtered = candidates.filter((item) => (category === "All categories" ? !initialCategory || item.category === initialCategory : item.category === category) && item.price <= maximum && `${item.name} ${item.brand} ${item.category}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === "Price: low to high" ? a.price - b.price : sort === "Price: high to low" ? b.price - a.price : sort === "Name" ? a.name.localeCompare(b.name) : b.featured - a.featured);
  const title = initialCategory || (path === "/search" ? "Search results" : healthcareOnly ? "Healthcare products" : "Medicines & pharmacy");
  return <div className="page-width page-main"><Breadcrumbs items={[[healthcareOnly ? "Healthcare" : "Medicines", healthcareOnly ? "/healthcare" : "/medicines"], ...(initialCategory ? [[initialCategory]] : [])]}/><div className="listing-intro"><div><span className="eyebrow">DEMONSTRATION CATALOG</span><h1>{title}</h1><p>Illustrative listings only. No medicine dispensing or product fulfillment is connected.</p></div><div className="result-count">{filtered.length} products <span>·</span> demo</div></div><div className="catalog-toolbar"><label className="catalog-search"><Icon name="search" size={18}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products"/></label><label className="catalog-select">Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option>{state.categories.map((item) => <option key={item.slug}>{item.name}</option>)}</select></label><label className="catalog-select">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option>Popular</option><option>Price: low to high</option><option>Price: high to low</option><option>Name</option></select></label><label className="price-range">Up to {money(maximum)}<input aria-label="Maximum price" type="range" min="100" max="3000" step="100" value={maximum} onChange={(event) => setMaximum(Number(event.target.value))}/></label></div><div className="listing-layout"><aside className="filter-rail"><h3>Browse categories</h3>{state.categories.map((item, index) => <A className={initialCategory === item.name ? "filter-active" : ""} href={`/healthcare/${item.slug}`} key={item.slug}><span className={`filter-dot dot-${index % 6}`}/>{item.name}</A>)}<A href="/medicines">Prescription medicines</A></aside><div className="listing-products"><ProductGrid items={filtered}/></div></div></div>;
}

function ProductDetailPage({ id }) {
  const { state, addToCart, toggleWishlist, update } = useApp();
  const product = state.products.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);
  const [fileName, setFileName] = useState("");
  useEffect(() => { if (product) update((current) => ({ recent: [product.id, ...current.recent.filter((value) => value !== product.id)].slice(0, 8) })); }, [id]);
  if (!product) return <NotFoundPage/>;
  const needsRx = product.prescription;
  return <div className="page-width page-main"><Breadcrumbs items={[["Medicines", "/medicines"], [product.category, `/healthcare/${slug(product.category)}`], [product.name]]}/><div className="product-detail"><div className="detail-visual"><CategoryArt category={product.category} index={Number(product.id.slice(-1))}/>{needsRx && <span className="rx-badge">Prescription required · demo only</span>}</div><div className="detail-copy"><span className="eyebrow">{product.category} · DEMO LISTING</span><h1>{product.name}</h1><p className="detail-brand">{product.brand} · {product.pack}</p><div className="detail-price"><strong>{money(product.price)}</strong><del>{money(product.mrp)}</del><span>Illustrative price</span></div><p>{product.description}</p>{needsRx && <div className="rx-notice"><Icon name="shield" size={18}/><p>Prescription-required sample product. No medicine is supplied or approved through this demo.</p><A href="/prescription-upload">See demo prescription upload</A></div>}<div className="quantity-row"><span>Quantity</span><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><strong>{quantity}</strong><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>+</button></div><div className="detail-actions"><button className="button button-primary" onClick={() => addToCart(product, quantity)}><Icon name="cart" size={18}/> Add to demo cart</button><button className={`button button-light ${state.wishlist.includes(product.id) ? "is-wished" : ""}`} onClick={() => toggleWishlist(product.id)}><Icon name="heart" size={18}/> Wishlist</button></div><div className="detail-assurance"><Icon name="check" size={16}/>This is a product listing demonstration only.</div></div></div><section className="detail-description"><h2>About this listing</h2><p>{product.description} Always review official product information and consult a qualified healthcare professional if you have questions.</p></section><SectionHeading title="You may also like" href="/medicines"/><ProductGrid items={state.products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)}/><div className="rx-inline"><div><Icon name="book" size={22}/><p><strong>Have a prescription?</strong><br/>Try the demonstration-only upload preview.</p></div><label className="button button-outline">{fileName ? "Choose another file" : "Select a file"}<input className="sr-only" type="file" accept="image/*,.pdf" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}/></label>{fileName && <span>{fileName} · preview only, not sent</span>}</div></div>;
}

function CartPage() {
  const { state, changeQuantity } = useApp();
  const [coupon, setCoupon] = useState(""); const [message, setMessage] = useState("");
  const [activeOffer, setActiveOffer] = useState(null);
  const detailed = state.cart.map((item) => ({ ...item, product: state.products.find((product) => product.id === item.id) })).filter((item) => item.product);
  const subtotal = detailed.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = activeOffer ? (activeOffer.type === "percent" ? Math.round(subtotal * activeOffer.value / 100) : activeOffer.value) : 0;
  return <div className="page-width page-main"><Breadcrumbs items={[["Your cart"]]}/><div className="listing-intro"><div><span className="eyebrow">YOUR DEMO CART</span><h1>Cart summary</h1><p>Review your sample products before the simulated checkout.</p></div></div>{detailed.length === 0 ? <EmptyState icon="cart" title="Your cart is empty" message="Explore the demonstration catalog and add something to your cart." action="Browse products"/> : <div className="cart-layout"><div className="cart-items">{detailed.map(({ product, quantity }) => <article className="cart-row" key={product.id}><div className="cart-art"><CategoryArt category={product.category}/></div><div className="cart-item-copy"><A href={`/product/${product.id}`}>{product.name}</A><span>{product.brand} · {product.pack}</span>{product.prescription && <small>Prescription required · demonstration</small>}</div><div className="cart-quantity"><button aria-label="Decrease quantity" onClick={() => changeQuantity(product.id, -1)}>−</button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => changeQuantity(product.id, 1)}>+</button></div><strong className="cart-item-price">{money(product.price * quantity)}</strong><button className="remove-item" onClick={() => changeQuantity(product.id, -quantity)} aria-label={`Remove ${product.name}`}>Remove</button></article>)}<A href="/medicines" className="text-link"><Icon name="back" size={16}/> Continue browsing</A></div><aside className="summary-panel"><span className="eyebrow">ORDER SUMMARY · DEMO</span><h2>Summary</h2><div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-line"><span>Delivery</span><strong>Demo only</strong></div>{discount > 0 && <div className="summary-line discount-line"><span>Demo offer</span><strong>−{money(discount)}</strong></div>}<form className="coupon-form" onSubmit={(event) => { event.preventDefault(); const found = state.offers.find((offer) => offer.active && offer.code.toUpperCase() === coupon.trim().toUpperCase()); if (!found) { setMessage("That demo code is not active."); setActiveOffer(null); } else if (subtotal < found.minimum) { setMessage(`Add items worth ${money(found.minimum - subtotal)} more to try this code.`); setActiveOffer(null); } else { setMessage(`${found.code} applied in this demonstration.`); setActiveOffer(found); } }}><label htmlFor="coupon-code">Demo offer code</label><div><input id="coupon-code" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Try WELCOME10"/><button className="button button-light" type="submit">Apply</button></div>{message && <small>{message}</small>}</form><div className="summary-total"><span>Demo total</span><strong>{money(Math.max(0, subtotal - discount))}</strong></div><A href="/checkout" className="button button-primary summary-cta">Continue to mock checkout <Icon name="arrow" size={17}/></A><p className="summary-disclaimer">No payment is collected and no order is fulfilled.</p></aside></div>}</div>;
}

function CheckoutPage() {
  const { state, update } = useApp(); const [submitted, setSubmitted] = useState(false); const [error, setError] = useState("");
  const total = state.cart.reduce((sum, item) => sum + (state.products.find((product) => product.id === item.id)?.price || 0) * item.quantity, 0);
  const submit = (event) => { event.preventDefault(); if (!state.cart.length) { setError("Your demo cart is empty. Add a product before continuing."); return; } const data = new FormData(event.currentTarget); const order = { id: `DEMO-${Date.now().toString().slice(-6)}`, status: "Demo order created", total, date: new Date().toLocaleDateString("en-IN"), customer: String(data.get("name")) }; update((current) => ({ orders: [order, ...current.orders], cart: [] })); setSubmitted(true); };
  if (submitted) return <Confirmation icon="check" eyebrow="SIMULATED CHECKOUT" title="Your demo order is ready" text="This is a local prototype confirmation. No payment, fulfillment or delivery was initiated." id="Order reference" value={state.orders[0]?.id} href="/orders" action="View demo orders"/>;
  return <div className="page-width page-main"><Breadcrumbs items={[["Cart", "/cart"], ["Mock checkout"]]}/><div className="listing-intro"><div><span className="eyebrow">NO PAYMENT REQUIRED</span><h1>Mock checkout</h1><p>Use sample details only. Do not enter real health or payment information.</p></div></div><div className="checkout-layout"><form className="form-panel checkout-form" onSubmit={submit}><h2>Delivery details</h2><p>Information stays in this browser demonstration.</p><div className="form-grid"><Field label="Full name" name="name" required/><Field label="Phone number" name="phone" type="tel" pattern="[0-9 +()-]{8,16}" required/><Field label="Email address" name="email" type="email" required/><Field label="PIN code" name="pin" pattern="[0-9]{6}" required/></div><label className="field-label" htmlFor="address">Delivery address</label><textarea id="address" name="address" required rows="3" placeholder="Enter a sample address"/><div className="mock-payment"><span className="mock-radio"/><div><strong>Demo checkout only</strong><small>No payment method is connected. No charge will be made.</small></div></div>{error && <p className="field-error">{error}</p>}<button className="button button-primary" type="submit">Place demo order <Icon name="arrow" size={17}/></button></form><aside className="summary-panel"><span className="eyebrow">DEMONSTRATION</span><h2>Order summary</h2>{state.cart.map((item) => { const product = state.products.find((p) => p.id === item.id); return product ? <div key={item.id} className="summary-line"><span>{product.name} × {item.quantity}</span><strong>{money(product.price * item.quantity)}</strong></div> : null; })}<div className="summary-total"><span>Demo total</span><strong>{money(total)}</strong></div></aside></div></div>;
}

function Field({ label, name, type = "text", required = false, pattern }) {
  return <label className="field-label">{label}<input name={name} type={type} required={required} pattern={pattern} autoComplete={name === "phone" ? "tel" : name === "email" ? "email" : "on"}/></label>;
}

function Confirmation({ icon, eyebrow, title, text, id, value, href, action }) {
  return <div className="page-width page-main"><div className="confirmation"><span className="confirmation-icon"><Icon name={icon} size={29}/></span><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{id && <div className="confirmation-ref"><span>{id}</span><strong>{value}</strong></div>}<A href={href} className="button button-primary">{action}<Icon name="arrow" size={17}/></A><A href="/" className="text-link">Return home</A></div></div>;
}

function LabTestsPage({ id, booking = false }) {
  const { state, update } = useApp(); const [search, setSearch] = useState(""); const [confirmed, setConfirmed] = useState(false); const [picked, setPicked] = useState(id || "");
  const test = id ? state.labTests.find((item) => item.id === id) : null;
  const list = state.labTests.filter((item) => `${item.name} ${item.category}`.toLowerCase().includes(search.toLowerCase()));
  if (confirmed) return <Confirmation icon="lab" eyebrow="DEMO BOOKING" title="Sample booking recorded" text="Your example details were kept only in this browser demo. No laboratory or collection service has been contacted." id="Demo booking" value={state.bookings[0]?.id} href="/lab-tests" action="Explore more tests"/>;
  if (booking) return <div className="page-width page-main"><Breadcrumbs items={[["Lab tests", "/lab-tests"], ["Demo booking"]]}/><div className="listing-intro"><div><span className="eyebrow">DEMONSTRATION ONLY</span><h1>Book a sample test</h1><p>No real laboratory, booking or diagnostic service is connected.</p></div></div><form className="form-panel booking-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const record = { id: `LAB-${Date.now().toString().slice(-6)}`, test: state.labTests.find((item) => item.id === picked)?.name || "General Wellness Checkup", status: "Demo request", date: String(data.get("date")) }; update((current) => ({ bookings: [record, ...current.bookings] })); setConfirmed(true); }}><h2>Appointment details</h2><label className="field-label">Select a sample listing<select value={picked} onChange={(event) => setPicked(event.target.value)} required><option value="">Choose a test</option>{state.labTests.map((item) => <option key={item.id} value={item.id}>{item.name} — {money(item.price)}</option>)}</select></label><div className="form-grid"><Field label="Patient name (sample only)" name="name" required/><Field label="Contact number" name="phone" type="tel" pattern="[0-9 +()-]{8,16}" required/><Field label="Sample collection date" name="date" type="date" required/></div><label className="field-label">Sample address<textarea required rows="3" placeholder="Sample address only"/></label><button className="button button-primary">Save demo request <Icon name="arrow" size={17}/></button></form></div>;
  if (test) return <div className="page-width page-main"><Breadcrumbs items={[["Lab tests", "/lab-tests"], [test.name]]}/><div className="service-detail"><div className="service-detail-art"><Icon name="lab" size={62}/></div><div><span className="eyebrow">{test.category} · SAMPLE LISTING</span><h1>{test.name}</h1><p>{test.description}</p><div className="test-meta"><span>Sample type <strong>{test.sample}</strong></span><span>Preparation <strong>{test.prep}</strong></span></div><div className="detail-price"><strong>{money(test.price)}</strong><span>Demonstration price</span></div><p className="demo-warning">No lab partners, availability or diagnostic result is represented as connected.</p><A href={`/lab-tests/booking?test=${test.id}`} className="button button-primary">Book this sample test <Icon name="arrow" size={17}/></A></div></div></div>;
  return <div className="page-width page-main"><Breadcrumbs items={[["Lab tests"]]}/><div className="listing-intro"><div><span className="eyebrow">DIAGNOSTICS · DEMO LISTINGS</span><h1>Explore lab tests</h1><p>Sample test information and prices. No laboratory integration or real booking is available.</p></div></div><label className="catalog-search test-search"><Icon name="search" size={18}/><input aria-label="Search sample tests" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tests or categories"/></label><div className="lab-grid lab-list-grid">{list.map((item) => <article className="lab-card" key={item.id}><span className="lab-icon"><Icon name="lab" size={21}/></span><span className="lab-category">{item.category}</span><h3>{item.name}</h3><p>{item.sample}</p><div><strong>{money(item.price)}</strong><A href={`/lab-tests/${item.id}`}>View details <Icon name="arrow" size={14}/></A></div></article>)}</div><div className="demo-banner"><Icon name="shield" size={19}/>Demonstration only — real bookings, diagnostic results and lab integrations are not connected.</div></div>;
}

function DoctorsPage({ specialty, doctorId, booking = false }) {
  const { state, update } = useApp(); const [confirmed, setConfirmed] = useState(false); const doctor = state.doctors.find((item) => item.id === doctorId);
  if (confirmed) return <Confirmation icon="user" eyebrow="DEMO APPOINTMENT" title="Example appointment saved" text="This browser-only example did not contact a doctor or create a real appointment." id="Demo reference" value={state.appointments[0]?.id} href="/consult-doctor" action="Browse demo profiles"/>;
  if (booking) return <div className="page-width page-main"><Breadcrumbs items={[["Consult a doctor", "/consult-doctor"], ["Demo appointment"]]}/><div className="listing-intro"><div><span className="eyebrow">EXAMPLE APPOINTMENT</span><h1>Choose a sample time</h1><p>No real video call or medical consultation is connected.</p></div></div><form className="form-panel booking-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const appointment = { id: `APT-${Date.now().toString().slice(-6)}`, doctor: String(data.get("doctor")), date: String(data.get("date")), time: String(data.get("time")), status: "Demo request" }; update((current) => ({ appointments: [appointment, ...current.appointments] })); setConfirmed(true); }}><h2>Appointment details</h2><label className="field-label">Choose a demo profile<select name="doctor" required defaultValue={doctor?.id || ""}><option value="">Select a profile</option>{state.doctors.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.specialty} · demo</option>)}</select></label><div className="form-grid"><Field label="Your name (sample only)" name="name" required/><Field label="Contact number" name="phone" type="tel" pattern="[0-9 +()-]{8,16}" required/><Field label="Sample date" name="date" type="date" required/><label className="field-label">Sample time<select name="time" required><option>10:30 AM</option><option>12:00 PM</option><option>4:30 PM</option></select></label></div><label className="field-label">Consultation mode<select name="mode"><option>Phone · demo</option><option>Video · demo</option></select></label><button className="button button-primary">Save sample appointment <Icon name="arrow" size={17}/></button></form></div>;
  if (doctor) return <div className="page-width page-main"><Breadcrumbs items={[["Consult a doctor", "/consult-doctor"], [doctor.name]]}/><div className="doctor-detail"><span className="doctor-avatar"><Icon name="user" size={44}/></span><span className="eyebrow">DEMO PROFILE · NOT VERIFIED</span><h1>{doctor.name}</h1><p>{doctor.specialty} · {doctor.mode} example</p><p>{doctor.description}</p><div className="detail-price"><strong>{money(doctor.fee)}</strong><span>Illustrative consultation fee</span></div><A href={`/consultation/booking?doctor=${doctor.id}`} className="button button-primary">Select a demo time <Icon name="arrow" size={17}/></A><p className="demo-warning">Not a real doctor. No consultation, diagnosis, treatment or video call is available.</p></div></div>;
  const list = specialty ? state.doctors.filter((item) => slug(item.specialty) === specialty.toLowerCase()) : state.doctors;
  return <div className="page-width page-main"><Breadcrumbs items={[["Consult a doctor"]]}/><div className="listing-intro"><div><span className="eyebrow">ONLINE CONSULTATION · DEMO</span><h1>{specialty ? decodeURIComponent(specialty) : "Explore by specialty"}</h1><p>Example healthcare profiles only. No real consultations or medical advice are available.</p></div></div><div className="specialty-chips">{specialties.map((item) => <A key={item} href={`/doctors/${slug(item)}`}>{item}</A>)}</div><div className="doctor-grid">{list.map((item) => <article className="doctor-card" key={item.id}><span className="doctor-avatar"><Icon name="user" size={38}/></span><div><span className="doctor-demo-tag">DEMO PROFILE · NOT VERIFIED</span><h3>{item.name}</h3><p>{item.specialty}</p><span className="doctor-fee">{money(item.fee)} <small>illustrative fee</small></span><A href={`/doctor/${item.id}`} className="text-link">View sample profile <Icon name="arrow" size={15}/></A></div></article>)}</div><div className="demo-banner"><Icon name="shield" size={19}/>These are fictional examples, not verified professionals. No appointment is fulfilled.</div></div>;
}

function ArticlesPage({ articleSlug }) {
  const { state } = useApp(); const [search, setSearch] = useState(""); const article = state.articles.find((item) => item.slug === articleSlug);
  if (articleSlug && !article) return <NotFoundPage/>;
  if (article) return <div className="page-width page-main"><Breadcrumbs items={[["Health articles", "/health-articles"], [article.title]]}/><article className="article-detail"><span className="eyebrow">{article.category} · {article.readingTime} read</span><h1>{article.title}</h1><p className="article-byline">{article.author} · Demonstration content</p><div className="article-detail-image"><img src={safeImage(article.image, 1280)} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }}/></div><p className="article-lead">{article.excerpt}</p><p>{article.body}</p><div className="demo-banner"><Icon name="shield" size={19}/>General educational information only. Not a substitute for professional medical advice.</div><SectionHeading title="Related reads" href="/health-articles"/><div className="article-grid">{state.articles.filter((item) => item.slug !== article.slug).slice(0, 3).map((item) => <ArticleCard article={item} key={item.slug}/>)}</div><button className="button button-light" onClick={async () => { if (navigator.share) { await navigator.share({ title: article.title, url: window.location.href }); } else { await navigator.clipboard?.writeText(window.location.href); } }}>Share this article</button></article></div>;
  const visible = state.articles.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="page-width page-main"><Breadcrumbs items={[["Health articles"]]}/><div className="listing-intro"><div><span className="eyebrow">THE MEDITRUST JOURNAL</span><h1>Everyday health, made clearer</h1><p>General health education to support more informed conversations with a professional.</p></div></div><label className="catalog-search test-search"><Icon name="search" size={18}/><input aria-label="Search health articles" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search articles"/></label><div className="article-grid article-list-grid">{visible.map((item) => <ArticleCard article={item} key={item.slug}/>)}</div><p className="disclaimer-inline">All content is for general education and is not a substitute for professional medical advice, diagnosis or treatment.</p></div>;
}