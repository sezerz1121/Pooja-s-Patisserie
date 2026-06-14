import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const orderUrl = "/order";

const cakes = [
  {
    category: "crowd favourite",
    name: "Red Velvet Cake",
    description: "Velvety red sponge layered with rich cream cheese frosting — a timeless crowd-pleaser for any celebration.",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=700&q=85",
    alt: "Sliced red velvet cake with cream cheese frosting",
  },
  {
    category: "classic",
    name: "Vanilla Cake",
    description: "Scratch-baked vanilla sponge, light and moist, dressed however you like — simple, elegant, and always a hit.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=700&q=85",
    alt: "Classic vanilla layer cake with white frosting",
  },
  {
    category: "showstopper",
    name: "Chocolate Fudge Cake",
    description: "Dense, fudgy chocolate layers stacked with silky ganache — rich, indulgent, and impossible to forget.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85",
    alt: "Chocolate fudge cake with ganache drip",
  },
  {
    category: "add-on",
    name: "Chocolate Chip Cookies",
    description: "Soft, chewy cookies baked fresh, perfect with a cake order or as party favours.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=85",
    alt: "Fresh chocolate chip cookies",
  },
];

const flavours = [
  ["Banana", "Sweet, natural banana flavour baked right into every layer."],
  ["Black Forest", "Dark chocolate sponge with cherries and whipped cream — a classic."],
  ["Blueberry", "Bright, juicy blueberry notes in a light, fruity sponge."],
  ["Salted Caramel", "Rich caramel balanced perfectly with a hint of sea salt."],
  ["Chocolate", "Deep, pure chocolate flavour in a moist, crowd-pleasing sponge."],
  ["Coconut", "Tropical and fragrant, with a soft, tender crumb."],
  ["Coffee", "Bold espresso notes in a rich, aromatic sponge."],
  ["Hazelnut", "Warm, nutty hazelnut woven through every bite."],
  ["Lemon", "Bright and zesty, with a refreshing citrus lift."],
  ["Mango", "Sweet, ripe mango in a sunshine-yellow sponge."],
  ["Matcha Green Tea", "Earthy, aromatic matcha for a subtly sophisticated flavour."],
  ["Oreo", "Cookies-and-cream goodness baked into a fun, crowd-pleasing sponge."],
  ["Pistachio", "Earthy pistachios create a luxurious, aromatic cake experience."],
  ["Raspberry", "Tart and vibrant raspberry for a fresh, fruity sponge."],
  ["Red Velvet", "Classic velvety sponge with that signature hint of cocoa."],
  ["Strawberry", "Fresh, sun-ripened strawberry flavour throughout."],
  ["Vanilla", "Pure, fragrant vanilla — simple, elegant, and endlessly versatile."],
];

const fillings = [
  ["Buttercream Design", "Classic, silky buttercream piped or smoothed for a timeless finish."],
  ["Chocolate Decorations", "Rich chocolate shards, curls, or drizzle for an indulgent look."],
  ["Edible Photo Prints", "A favourite photo transferred onto your cake in full colour."],
  ["Flowers", "Fresh or sugar-craft blooms for an elegant, garden-party feel."],
  ["Fondant Figures", "Hand-sculpted fondant characters tailored to your theme."],
  ["Fresh Fruits", "Seasonal fruit arranged for a light, vibrant finish."],
  ["Edible Glitter", "A sparkly, eye-catching shimmer over your cake's surface."],
  ["Edible Gold Leaf", "Luxurious hand-applied gold leaf for a showstopper finish."],
  ["Macarons", "Delicate French macarons stacked or scattered on top."],
  ["Decorative Ribbons", "Satin or fondant ribbons for a polished, gift-wrapped look."],
  ["Sprinkles", "Playful, colourful sprinkles — perfect for birthdays and kids' cakes."],
  ["Themed Decorations", "Custom decorations built around your party's colour and theme."],
  ["Cake Topper", "A personalised topper — names, ages, or figurines — to crown your cake."],
];

const services = [
  {
    icon: "🎂",
    title: "Custom Celebration Cakes",
    description: "Birthdays, baby showers, anniversaries, graduations, and corporate events. Send us a reference photo and we'll recreate or customise it.",
  },
  {
    icon: "💍",
    title: "Wedding Cakes",
    description: "Multi-tier wedding cakes with custom themes, personalised flavour selections, plus delivery and setup at your venue.",
  },
  {
    icon: "🧁",
    title: "Cupcakes",
    description: "Decorated cupcakes for baby showers, birthdays, corporate events, and dessert tables, matched to your event's colours and theme.",
  },
  {
    icon: "🍪",
    title: "Custom Cookies",
    description: "Hand-decorated cookies designed to match your event theme, perfect as favours or part of a dessert spread.",
  },
  {
    icon: "🍡",
    title: "Macarons & Treats",
    description: "French macarons, cake jars, and specialty sweet treats to round out your dessert table.",
  },
  {
    icon: "🌶️",
    title: "Indian Fusion Desserts",
    description: "Indian-inspired cakes and fusion desserts that bring traditional Indian sweet flavours into Western-style baking.",
  },
  {
    icon: "🥚",
    title: "Eggless Cakes",
    description: "Full eggless options across our menu, so dietary preferences never mean missing out on dessert.",
  },
  {
    icon: "👑",
    title: "Quinceañera Cakes",
    description: "Cake and dessert packages designed specifically for quinceañera celebrations, from classic to showstopper.",
  },
];

const reviews = [
  ["G", "My custom cake was an absolute showstopper, with rich, moist flavours and intricate detail.", "Custom cake order"],
  ["M", "Pooja did such a great job on my daughter's cake. It looked beautiful and tasted delicious.", "Repeat customer"],
  ["R", "Each cupcake looked like a tiny work of art, and the frosting was silky-smooth and not too sweet.", "Baby shower order"],
  ["A", "Our son's themed birthday cake looked and tasted wonderful, and it arrived right on time.", "Birthday cake order"],
];

const orderSteps = [
  {
    number: "1",
    title: "Pick your treat",
    description:
      "Choose from our signature menu or send us your dream design - sketches, photos, and even vague descriptions are welcome.",
  },
  {
    number: "2",
    title: "We bake it fresh",
    description:
      "Every order is made from scratch, with custom orders recommended 7-10 days ahead and longer lead times for wedding cakes.",
  },
  {
    number: "3",
    title: "Pickup or delivery",
    description:
      "Swing by our kitchen, or have your order delivered across Katy, Houston, and the surrounding suburbs.",
  },
];

function Divider({ colour = "#ffffff", flip = false }) {
  return (
    <div className={`frosting-divider${flip ? " frosting-divider--flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path d="M0 40C60 80 120 0 180 40s120 0 180 0 120 0 180 0 120 0 180 0 120 0 180 0 120 0 180 0 120 0 180 0v50H0Z" fill={colour} />
      </svg>
    </div>
  );
}

function SectionHeading({ tag, title, accent, children }) {
  return (
    <div className="section-heading reveal-up">
      <span className="script section-tag">{tag}</span>
      <h2>{title} <span>{accent}</span></h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const processRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [selectedFilling, setSelectedFilling] = useState("");

  const closeMenu = () => setMenuOpen(false);
  const hasSelection = selectedCake || selectedFlavour || selectedFilling;

  // Selections made here are passed to the quote page via query params, so
  // they show up pre-filled in "Requested products" and the matching form
  // fields (cake type / main flavour) on /order.
  const enquiryUrl = `${orderUrl}?cake=${encodeURIComponent(selectedCake)}&flavour=${encodeURIComponent(selectedFlavour)}&filling=${encodeURIComponent(selectedFilling)}`;

  const handleOrder = () => {
    navigate(enquiryUrl);
  };
  const selectCake = (cakeName) => {
    setSelectedCake(cakeName);
    document.querySelector("#flavours")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useLayoutEffect(() => {
    if (!mobileMenuRef.current) return undefined;

    const items = mobileMenuRef.current.querySelectorAll("a");
    if (menuOpen) {
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(mobileMenuRef.current, { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(items, { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, stagger: 0.06, duration: 0.3, delay: 0.08 });
    } else {
      gsap.to(mobileMenuRef.current, {
        autoAlpha: 0,
        y: -12,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(mobileMenuRef.current, { display: "none" }),
      });
    }
  }, [menuOpen]);

  useLayoutEffect(() => {
    const hoverCleanups = [];
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(".process-card, .process-line", { clearProps: "all" });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".site-nav", { y: -70, opacity: 0, duration: 0.7 })
        .from(".hero-copy > *", { y: 44, opacity: 0, duration: 0.75, stagger: 0.1 }, "-=0.2")
        .from(".cake-orbit", { scale: 0.72, opacity: 0, rotate: -12, duration: 1 }, "-=0.7")
        .from(".hero-sticker, .sprinkle", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.45 }, "-=0.35");

      gsap.to(".cake-orbit", { rotate: 360, duration: 45, repeat: -1, ease: "none" });
      gsap.to(".cake-orbit img", { rotate: -360, duration: 45, repeat: -1, ease: "none" });
      gsap.to(".float", { y: -16, rotate: 5, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.25 });

      gsap.utils.toArray(".reveal-up").forEach((element) => {
        gsap.from(element, {
          y: 55,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray(".stagger-grid").forEach((grid) => {
        gsap.fromTo(grid.children, {
          y: 48,
          autoAlpha: 0,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
        });
      });

      const processCards = gsap.utils.toArray(".process-card", processRef.current);
      const processTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      processTimeline
        .fromTo(
          ".process-line",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
        )
        .fromTo(
          processCards,
          { y: 85, scale: 0.88, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.75, stagger: 0.2, ease: "back.out(1.5)" },
          "-=0.45",
        )
        .fromTo(
          ".process-number",
          { rotate: -150, scale: 0 },
          { rotate: 0, scale: 1, duration: 0.55, stagger: 0.2, ease: "back.out(2)" },
          "-=0.85",
        );

      gsap.from(".about-photo", {
        x: -70,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: ".about", start: "top 72%", once: true },
      });
      gsap.from(".about-copy", {
        x: 70,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: ".about", start: "top 72%", once: true },
      });

      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const addHover = (selector, enterVars, leaveVars) => {
          gsap.utils.toArray(selector).forEach((element) => {
            const enter = () => gsap.to(element, { ...enterVars, overwrite: "auto" });
            const leave = () => gsap.to(element, { ...leaveVars, overwrite: "auto" });
            element.addEventListener("mouseenter", enter);
            element.addEventListener("mouseleave", leave);
            hoverCleanups.push(() => {
              element.removeEventListener("mouseenter", enter);
              element.removeEventListener("mouseleave", leave);
            });
          });
        };

        addHover(".cake-card", { y: -13, scale: 1.025, rotate: -1, duration: 0.45, ease: "back.out(2)" }, { y: 0, scale: 1, rotate: 0, duration: 0.5, ease: "elastic.out(1, 0.55)" });
        addHover(".process-card", { y: -10, scale: 1.035, rotate: 1, duration: 0.4, ease: "back.out(2)" }, { y: 0, scale: 1, rotate: 0, duration: 0.55, ease: "elastic.out(1, 0.5)" });
        addHover(".service-card", { y: -10, scale: 1.03, rotate: -1, duration: 0.4, ease: "back.out(2)" }, { y: 0, scale: 1, rotate: 0, duration: 0.5, ease: "elastic.out(1, 0.55)" });
        addHover(".review-grid article", { y: -10, rotate: -1.2, scale: 1.025, duration: 0.4, ease: "back.out(2)" }, { y: 0, rotate: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.6)" });
        addHover(".flavour-item", { x: 9, scale: 1.015, duration: 0.3, ease: "back.out(2)" }, { x: 0, scale: 1, duration: 0.35, ease: "power2.out" });
        addHover(".button", { y: -4, scale: 1.055, duration: 0.3, ease: "back.out(2.5)" }, { y: 0, scale: 1, duration: 0.45, ease: "elastic.out(1, 0.45)" });
        addHover(".pill-row span", { y: -5, rotate: -2, scale: 1.05, duration: 0.3, ease: "back.out(2)" }, { y: 0, rotate: 0, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.55)" });
      }

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      requestAnimationFrame(refresh);

      return () => window.removeEventListener("load", refresh);
    }, pageRef);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <div className="home-page" ref={pageRef}>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top"><span className="brand-dots" />Pooja's Patisserie</a>
        <div className="nav-links">
          <a href="#about">Our Story</a><a href="#services">Services</a><a href="#menu">Menu</a><a href="#process">How it Works</a><a href="#testimonials">Reviews</a>
        </div>
        <a className="button button--small nav-order" onClick={handleOrder}>Order Now</a>
        <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>
        <div className="mobile-menu" id="mobile-navigation" ref={mobileMenuRef}>
          <a href="#about" onClick={closeMenu}>Our Story</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#menu" onClick={closeMenu}>Menu</a>
          <a href="#flavours" onClick={closeMenu}>Build a Cake</a>
          <a href="#process" onClick={closeMenu}>How it Works</a>
          <a href="#testimonials" onClick={closeMenu}>Reviews</a>
          <a className="button" onClick={handleOrder} onClick={closeMenu}>Order Now</a>
        </div>
      </nav>

      <header className="hero" id="top">
        {/* <span className="blob blob--one" /><span className="blob blob--two" /> */}
        <div className="hero-copy">
          <span className="eyebrow">Fresh from our kitchen, daily</span>
          <h1>Life's too short<br />for <span>boring</span> cake.<br /><em>Let's fix that.</em></h1>
          <p>Pooja's Patisserie is a home-based, family-run bakery serving Katy, Houston, and the surrounding suburbs with scratch-made cakes, cupcakes, cookies, and Indian-fusion desserts &mdash; all baked to order.</p>
          <div className="hero-actions"><a className="button" href="#menu">Browse the Menu</a><a className="text-link" href="#about">Meet Pooja <span aria-hidden="true">&rarr;</span></a></div>
          <div className="hero-stats"><div><strong>5.0&#9733;</strong><span>198+ Google reviews</span></div><div><strong>113+</strong><span>Custom cakes</span></div><div><strong>8</strong><span>Specialties offered</span></div></div>
        </div>
        <div className="hero-art" aria-label="Pink frosted celebration cake">
          <div className="cake-orbit"><img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=950&q=85" alt="Pink frosted birthday cake with sprinkles" /></div>
          <div className="hero-sticker float">Baked with love today!</div>
          <span className="sprinkle sprinkle--one float">&#10022;</span><span className="sprinkle sprinkle--two float">&#9679;</span><span className="sprinkle sprinkle--three float">&#10022;</span>
        </div>
      </header>

      {/* <Divider /> */}
      <section className="about" id="about">
        <div className="about-photo"><img src="https://images.unsplash.com/photo-1556910103894-f44347d05a4c?auto=format&fit=crop&w=950&q=85" alt="Baker decorating a chocolate cake" /><div className="rating-badge"><strong>5.0&#9733;</strong><span>198+ reviews</span></div></div>
        <div className="about-copy"><span className="script section-tag">our little story</span><h2>From software engineer to scratch-made showstoppers.</h2><p>Pooja Naren traded a career in software engineering for a kitchen full of flour, founding Pooja's Patisserie as a home-based, family-owned bakery. What started with cakes for friends and neighbours has grown into a go-to studio for birthdays, baby showers, weddings, and corporate events across Katy, Houston, and the surrounding suburbs.</p><p>Every order is made to order, never pulled from a freezer &mdash; just real butter, real fruit, careful detail work, and a lot of late nights perfecting buttercream.</p><div className="pill-row"><span>Home-based & family-owned</span><span>Made-to-order, scratch-baked</span><span>Eggless options available</span><span>Delivery across Katy & Houston</span></div></div>
      </section>

      {/* <Divider colour="#fce9d4" flip /> */}
      <section className="services" id="services">
        <SectionHeading tag="what we make" title="Something for" accent="Every Occasion">From everyday birthdays to multi-tier wedding cakes, here's the full range of what Pooja's Patisserie bakes to order.</SectionHeading>
        <div className="service-grid stagger-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span className="service-icon" aria-hidden="true">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <Divider />
      <section className="menu" id="menu">
        <SectionHeading tag="today's lineup" title="Our" accent="Signature Cakes">Every cake is custom-built around your event. These crowd favourites are a delicious place to begin.</SectionHeading>
        <div className="card-grid stagger-grid">{cakes.map((cake) => <article className={`cake-card${selectedCake === cake.name ? " is-selected" : ""}`} key={cake.name}><div className="card-image"><img src={cake.image} alt={cake.alt} /></div><div className="card-body"><span className="script">{cake.category}</span><h3>{cake.name}</h3><p>{cake.description}</p><div className="price-row"><strong>{selectedCake === cake.name ? "Selected" : "Custom quote"}</strong><button type="button" onClick={() => selectCake(cake.name)} aria-label={`Select ${cake.name}`}>{selectedCake === cake.name ? "✓" : "+"}</button></div></div></article>)}</div>
        <div className="center reveal-up"><a className="button" href={orderUrl}>Request a Quote</a></div>
      </section>

      {/* <Divider /> */}
      <section className="flavours" id="flavours">
        <SectionHeading tag="build your cake" title="Flavours &amp;" accent="Decorations">Pick a sponge flavour, then choose your decoration style. Every cake is scratch-baked and built to order.</SectionHeading>
        <div className="flavour-grid stagger-grid">
          <div><h3 className="script">Cake Flavours</h3>{flavours.map(([name, text]) => <button type="button" className={`flavour-item${selectedFlavour === name ? " is-selected" : ""}`} key={name} onClick={() => setSelectedFlavour(name)} aria-pressed={selectedFlavour === name}><span><h4>{name}</h4><p>{text}</p></span><b>{selectedFlavour === name ? "✓" : "+"}</b></button>)}</div>
          <div><h3 className="script">Decoration Style</h3>{fillings.map(([name, text]) => <button type="button" className={`flavour-item${selectedFilling === name ? " is-selected" : ""}`} key={name} onClick={() => setSelectedFilling(name)} aria-pressed={selectedFilling === name}><span><h4>{name}</h4><p>{text}</p></span><b>{selectedFilling === name ? "✓" : "+"}</b></button>)}</div>
        </div>
        <div className="cake-builder reveal-up" aria-live="polite">
          <div><span className="script">your cake so far</span><h3>{selectedCake || "Choose a signature cake"}</h3><p>{selectedFlavour || "Choose a flavour"} <strong>+</strong> {selectedFilling || "choose a decoration"}</p></div>
          <button
  type="button"
  className={`button${hasSelection ? "" : " is-disabled"}`}
  disabled={!hasSelection}
  onClick={handleOrder}
>
  Enquire About This Cake
</button>
        </div>
      </section>

      <section className="process" id="process" ref={processRef}>
        <SectionHeading tag="how it works" title="From Craving to" accent="Cake Box">
          A few simple steps &mdash; just plan ahead, especially for weddings.
        </SectionHeading>
        <div className="process-grid">
          <span className="process-line" aria-hidden="true" />
          {orderSteps.map((step) => (
            <article className="process-card" key={step.number}>
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <p className="lead-time-note reveal-up">Custom orders need at least 7&ndash;10 days' notice, and wedding cakes require a longer lead time &mdash; the earlier you reach out, the more design options we can offer.</p>
      </section>

      <section className="testimonials" id="testimonials">
        <SectionHeading tag="5.0 star rated by 198+ reviewers" title="What our" accent="customers say" />
        <div className="review-grid stagger-grid" aria-label="Customer reviews">{reviews.map(([initial, quote, type]) => <article key={quote}><span className="quote-mark">&ldquo;</span><p>{quote}</p><div className="review-person"><span>{initial}</span><div><strong>Google Review</strong><small>{type}</small></div></div></article>)}</div>
      </section>

      <section className="order-section" id="order"><div className="order-banner reveal-up"><div><h2>Got a celebration coming up?</h2><p>Tell us the date, theme, and guest count. We will confirm availability and pricing &mdash; please reach out at least 7&ndash;10 days ahead (longer for weddings).</p></div><a className="button button--light" onClick={handleOrder}>Submit an Enquiry</a></div></section>

      <footer><div className="footer-grid"><div><h3>Pooja's Patisserie</h3><p>Home-based, family-owned custom bakery serving Katy, Houston, and the surrounding suburbs.</p></div><div><h4>Explore</h4><a href="#about">Our Story</a><a href="#services">Services</a><a href="#menu">Menu</a><a href="#flavours">Flavours</a></div><div><h4>Support</h4><a href={orderUrl}>Custom Orders</a><a href="tel:+18325429686">Call Us</a><a href="mailto:poojas.patisserie9@gmail.com">Email Us</a></div><div><h4>Visit the Kitchen</h4><p>26511 Reflection Sky Ct<br />Katy, TX 77494<br />Mon-Sat: 7am-11pm<br />Sun: 9am-9pm</p></div></div><div className="footer-bottom"><span>&copy; 2026 Pooja's Patisserie.</span><span>Made with butter, sugar, and care.</span></div></footer>
    </div>
  );
}