import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const orderUrl = "/order";
const cakeTypes = [
  "Biscoff Cake",
  "Carrot Cake",
  "Choco Cookies and Cream",
  "Chocolate Fudge Cake",
  "Chocolate Cake",
  "Coconut Cake",
  "Combo Cake",
  "Confetti",
  "EGGLESS Chocolate",
  "EGGLESS COMBO CAKE",
  "Eggless Red Velvet",
  "EGGLESS RED VELVET VANILLA COMBO",
  "German Chocolate Cake",
  "Lemon",
  "Lemon - EGGLESS",
  "Marble",
  "Red Velvet Cake",
  "Red Velvet Choco Combo",
  "Strawberry Cake",
  "Vanilla Cake",
  "Vanilla Almond",
  "Vanilla Biscoff Cake",
  "Vanilla Cake - Eggless",
  "Vanilla Cookie Sand Cream",
  "Something else / not sure yet",
];

const flavourOptions = [
  "Banana",
  "Black Forest",
  "Blueberry",
  "Salted Caramel",
  "Chocolate",
  "Coconut",
  "Coffee",
  "Hazelnut",
  "Lemon",
  "Mango",
  "Matcha Green Tea",
  "Oreo",
  "Pistachio",
  "Raspberry",
  "Red Velvet",
  "Strawberry",
  "Vanilla",
  "Something else / not sure yet",
];


const decorationOptions = [
  "Buttercream Design",
  "Chocolate Decorations",
  "Edible Photo Prints",
  "Flowers",
  "Fondant Figures",
  "Fresh Fruits",
  "Edible Glitter",
  "Edible Gold Leaf",
  "Macarons",
  "Decorative Ribbons",
  "Sprinkles",
  "Themed Decorations",
  "Cake Topper",
];

const budgetOptions = [
  "Under $150",
  "$150 - $300",
  "$300 - $500",
  "$500 - $800",
  "$800+",
  "Not sure yet",
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



function readInitialProducts(searchParams) {
  console.log(searchParams)
  const products = [];

  const cake = searchParams.get("cake");
  const flavour = searchParams.get("flavour");
  const decoration = searchParams.get("decoration");

  if (cake) {
    products.push({
      id: "cake",
      label: "Cake",
      value: cake,
    });
  }

  if (flavour) {
    products.push({
      id: "flavour",
      label: "Flavour",
      value: flavour,
    });
  }

  if (decoration) {
    products.push({
      id: "decoration",
      label: "Decoration",
      value: decoration,
    });
  }

  return products;
}


function useIsDesktop(breakpoint) {
  var bp = breakpoint || 1024;
  var [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > bp : true
  );
  useEffect(function() {
    var mq = window.matchMedia("(min-width: " + (bp + 1) + "px)");
    var handler = function(e) { setIsDesktop(e.matches); };
    mq.addEventListener("change", handler);
    return function() { mq.removeEventListener("change", handler); };
  }, [bp]);
  return isDesktop;
}
export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const fileInputRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const closeMenu = () => setMenuOpen(false);
  const enquiryUrl = `${orderUrl}?cake=${encodeURIComponent("")}&flavour=${encodeURIComponent("")}&decoration=${encodeURIComponent("")}`;

  const handleOrder = () => {
    navigate(enquiryUrl);
  };
  const handleHome = () => {
    navigate('/');
  };
  const [products, setProducts] = useState(() =>
  readInitialProducts(searchParams)
  );
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    phone: "",
    address: "",
    eventDate: "",
    theme: "",
    servings: "",
    budget: "",
    cakeType: "",
    flavour: "",
    decoration: "",
    allergies: "",
    notes: "",
  });

  useEffect(() => {
  const cake = searchParams.get("cake");
  const flavour = searchParams.get("flavour");
  const decoration = searchParams.get("decoration");

  setForm((prev) => ({
    ...prev,
    cakeType:
      cake && cakeTypes.includes(cake)
        ? cake
        : prev.cakeType,

    flavour:
      flavour && flavourOptions.includes(flavour)
        ? flavour
        : prev.flavour,

    decoration:
      decoration && decorationOptions.includes(decoration)
        ? decoration
        : prev.decoration,
  }));
 
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);

}, [searchParams]);
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

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleCancel = () => {
    navigate("/");
  };

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      gsap.from(".site-nav", { y: -70, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".quote-hero > *", {
        y: 38,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray(".reveal-up").forEach((element) => {
        gsap.from(element, {
          y: 45,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.utils.toArray(".button").forEach((element) => {
          const enter = () => gsap.to(element, { y: -4, scale: 1.04, duration: 0.3, ease: "back.out(2.5)", overwrite: "auto" });
          const leave = () => gsap.to(element, { y: 0, scale: 1, duration: 0.45, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
          element.addEventListener("mouseenter", enter);
          element.addEventListener("mouseleave", leave);
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <div className="home-page quote-page" ref={pageRef}>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top"><span className="brand-dots" />Pooja's Patisserie</a>
        <div className="nav-links">
           <a href="#top" onClick={handleHome}>Home</a><a href="#about">Our Story</a><a href="#services">Services</a><a href="#menu">Menu</a><a href="#process">How it Works</a><a href="#testimonials">Reviews</a>
        </div>
        <a className="button button--small nav-order" onClick={handleOrder}>Order Now</a>
        <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>
        <div className="mobile-menu" id="mobile-navigation" ref={mobileMenuRef}>
          <a onClick={handleHome}>Home</a>
          <a href="#about" onClick={closeMenu}>Our Story</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#menu" onClick={closeMenu}>Menu</a>
          <a href="#flavours" onClick={closeMenu}>Build a Cake</a>
          <a href="#process" onClick={closeMenu}>How it Works</a>
          <a href="#testimonials" onClick={closeMenu}>Reviews</a>
          <a className="button" onClick={closeMenu}>Order Now</a>
        </div>
      </nav>

      <header className="quote-hero">
        <span className="eyebrow">Let's plan your order</span>
        <h1>Tell us about your <span>celebration</span></h1>
        <p>
          Fill out the details below and we'll get back to you with availability and a price quote.
          The more detail you share, the better we can plan your cake.
        </p>
      </header>

      {/* <Divider /> */}

      <section className="quote-section">
        {submitted ? (
          <div className="quote-success reveal-up" role="status">
            <span className="success-badge">&#10003;</span>
            <h2>Thanks, your enquiry is in our inbox!</h2>
            <p>
              Submitting this form does not book your order yet. We'll reply as soon as possible to
              confirm whether we have availability for your requested date. For workshops, you'll
              receive a separate email with payment details to confirm your spot.
            </p>
            <a className="button" href="/">Back to home</a>
          </div>
        ) : (
          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="quote-grid">
              <div className="quote-main">
                <div className="form-card reveal-up">
                  <span className="script section-tag">contact details</span>
                  <h2>Who should we get back to?</h2>

                  <div className="field-grid">
                    <label className="field">
                      <span>First name</span>
                      <input type="text" name="firstName" value={form.firstName} onChange={updateField("firstName")} placeholder="Pooja" required />
                    </label>
                    <label className="field">
                      <span>Last name</span>
                      <input type="text" name="lastName" value={form.lastName} onChange={updateField("lastName")} placeholder="Sharma" required />
                    </label>
                    <label className="field field--wide">
                      <span>Email address</span>
                      <input type="email" name="email" value={form.email} onChange={updateField("email")} placeholder="you@example.com" required />
                    </label>
                    <label className="field field--phone">
                      <span>Contact number</span>
                      <div className="phone-input">
                        <select name="countryCode" value={form.countryCode} onChange={updateField("countryCode")} aria-label="Country code">
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+91">+91</option>
                          <option value="+61">+61</option>
                        </select>
                        <input type="tel" name="phone" value={form.phone} onChange={updateField("phone")} placeholder="(832) 555-0100" required />
                      </div>
                    </label>
                    <label className="field field--wide">
                      <span>Address <small>(for delivery enquiries)</small></span>
                      <input type="text" name="address" value={form.address} onChange={updateField("address")} placeholder="Street, city, state, ZIP" />
                    </label>
                  </div>
                </div>

                <div className="form-card reveal-up">
                  <span className="script section-tag">event details</span>
                  <h2>What's the occasion?</h2>

                  <div className="field-grid">
                    <label className="field">
                      <span>Event date</span>
                      <input type="date" name="eventDate" value={form.eventDate} onChange={updateField("eventDate")} required />
                    </label>
                    <label className="field">
                      <span>Servings / guests <small>e.g. 20</small></span>
                      <input type="number" min="1" name="servings" value={form.servings} onChange={updateField("servings")} placeholder="20" />
                    </label>
                    <label className="field field--wide">
                      <span>Theme for the event</span>
                      <input type="text" name="theme" value={form.theme} onChange={updateField("theme")} placeholder="e.g. Pastel balloons, 65th birthday, music notes" />
                    </label>
                    <label className="field">
                      <span>Budget range</span>
                      <select name="budget" value={form.budget} onChange={updateField("budget")}>
                        <option value="">Select a budget range</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label className="field">
                      <span>Cake type</span>
                      <select name="cakeType" value={form.cakeType} onChange={updateField("cakeType")}>
                        <option value="">Select cake type</option>
                        {cakeTypes.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label className="field">
                      <span>Main flavour</span>
                      <select name="flavour" value={form.flavour} onChange={updateField("flavour")}>
                        <option value="">Select main flavour</option>
                        {flavourOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label className="field field--wide">
                      <span>Decoration style</span>
                      <select name="decoration" value={form.decoration} onChange={updateField("decoration")}>
                        <option value="">Select decoration</option>
                        {decorationOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="form-card reveal-up">
                  <span className="script section-tag">images</span>
                  <h2>Got inspiration to share?</h2>
                  <p className="card-hint">Upload a photo or sketch of a design you love &mdash; this helps us match the look and colours.</p>

                  <div className="file-upload">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="inspiration-image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <label htmlFor="inspiration-image" className="file-button">Choose file</label>
                    <span className="file-name">{fileName || "No file selected"}</span>
                  </div>
                </div>

                <div className="form-card reveal-up">
                  <span className="script section-tag">additional information</span>
                  <h2>Anything else we should know?</h2>

                  <div className="field-grid">
                    <label className="field field--wide">
                      <span>Allergies</span>
                      <input type="text" name="allergies" value={form.allergies} onChange={updateField("allergies")} placeholder="Let us know if anyone has allergies" />
                    </label>
                    <label className="field field--wide">
                      <span>Additional information</span>
                      <textarea name="notes" rows="4" value={form.notes} onChange={updateField("notes")} placeholder="Anything else about your order" />
                    </label>
                  </div>
                </div>

                {/* Actions shown at bottom of main column on mobile */}
                {!isDesktop && (
                  <div className="form-actions reveal-up">
                    <button type="button" className="button button--ghost" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="button">Submit enquiry</button>
                  </div>
                )}
              </div>

              <aside className="quote-sidebar">
                <div className="form-card products-card reveal-up">
                  <h2>Requested products</h2>
                  {products.length === 0 ? (
                    <p className="empty-products">No products selected yet</p>
                  ) : (
                    <ul className="product-list">
                      {products.map((product) => (
                        <li key={product.id}>
                          <div>
                            <span className="product-label">{product.label}</span>
                            <span className="product-value">{product.value}</span>
                          </div>
                          <button type="button" onClick={() => removeProduct(product.id)} aria-label={`Remove ${product.value}`}>&times;</button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a className="text-link" href="/#menu">Browse all products <span aria-hidden="true">&rarr;</span></a>
                </div>

                <div className="form-card notice-card reveal-up">
                  <h2>Important notice!</h2>
                  <p>
                    Submitting this form does not book your order. We will reply as soon as possible
                    to let you know if we have availability for your requested date.
                  </p>
                  <p>
                    For workshops, you will receive an email with the payment information to confirm
                    your spot.
                  </p>
                </div>

                {/* Actions shown in sidebar on desktop */}
                {isDesktop && (
                  <div className="form-actions reveal-up">
                    <button type="button" className="button button--ghost" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="button">Submit enquiry</button>
                  </div>
                )}
              </aside>
            </div>
          </form>
        )}
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <h3>Pooja's Patisserie</h3>
            <p>Scratch-made custom cakes, baked with love in Katy, Texas.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="/#about">Our Story</a>
            <a href="/#menu">Menu</a>
            <a href="/#flavours">Flavours</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="/order">Custom Orders</a>
            <a href="tel:+18325429686">Call Us</a>
            <a href="mailto:poojas.patisserie9@gmail.com">Email Us</a>
          </div>
          <div>
            <h4>Visit the Kitchen</h4>
            <p>26511 Reflection Sky Ct<br />Katy, TX 77494<br />Mon-Sat: 7am-11pm<br />Sun: 9am-9pm</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Pooja's Patisserie.</span>
          <span>Made with butter, sugar, and care.</span>
        </div>
      </footer>
    </div>
  );
}