
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  X,
} from "lucide-react";
import "./index.css";

const colors = [
  { name: "Moss", value: "#7f8870", top: "#b8c0a9", side: "#606951" },
  { name: "Coral", value: "#d77d69", top: "#f1b5a0", side: "#a95749" },
  { name: "Butter", value: "#d6bd79", top: "#f0dfa6", side: "#a58a4c" },
  { name: "Cloud", value: "#dedbd4", top: "#faf8f1", side: "#a8a59e" },
  { name: "Ink", value: "#343a39", top: "#747a76", side: "#242927" },
];

function Charger({ color, large = false }) {
  return (
    <div
      className={`charger-scene ${large ? "charger-scene-large" : ""}`}
      aria-label={`Mushroom wireless charger in ${color.name}`}
      role="img"
    >
      <div className="charger-orbit orbit-one" />
      <div className="charger-orbit orbit-two" />

      <div className="charger">
        <div className="charger-stem">
          <div className="stem-highlight" />
          <div className="stem-shadow" />
        </div>

        <div
          className="charger-cap"
          style={{
            "--cap-top": color.top,
            "--cap-side": color.side,
            "--cap-color": color.value,
          }}
        >
          <div className="cap-fabric" />
          <div className="cap-top-shine" />
          <div className="cap-rim" />
          <div className="cap-side" />
          <div className="cap-bottom" />
        </div>

        <div className="charger-indicator">
          <span />
        </div>

        <div className="charger-cable" />
        <div className="charger-shadow" />
      </div>

      <div className="scene-caption">
        <span>01 / OBJECT STUDY</span>
        <span>15W · WIRELESS</span>
      </div>
    </div>
  );
}

function Navbar({ onPreorder }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <a className="brand" href="#home" onClick={closeMenu}>
        mush<span className="brand-dot">.</span>
      </a>

      <button
        className="mobile-menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
        <a href="#specs" onClick={closeMenu}>Specs</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#store" onClick={closeMenu}>Store</a>
      </nav>

      <button className="nav-preorder" onClick={onPreorder}>
        Preorder <span>+</span>
      </button>
    </header>
  );
}

function PreorderModal({ onClose, color }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="preorder-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={21} />
        </button>

        {!submitted ? (
          <>
            <div className="modal-eyebrow">A LITTLE OBJECT. A BETTER ROUTINE.</div>
            <h2 id="modal-title">Make room for <em>mushroom.</em></h2>
            <p>
              Join the early-access list for product updates and preorder
              announcements.
            </p>

            <div className="modal-product">
              <span
                className="color-swatch"
                style={{ background: color.value }}
              />
              Mushroom / {color.name}
              <strong>$129</strong>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="preorder-email">Your email address</label>
              <input
                id="preorder-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />
              <button className="dark-button modal-submit" type="submit">
                Join the list <ArrowRight size={17} />
              </button>
            </form>

            <small>
              Demo only. No payment is collected and no email is sent yet.
            </small>
          </>
        ) : (
          <div className="success-state">
            <div className="success-icon"><Check size={27} /></div>
            <h2 id="modal-title">You're on the list.</h2>
            <p>
              The interface is working! Email registration will be connected
              to the backend later.
            </p>
            <button className="dark-button" onClick={onClose}>
              Back to mushroom
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const color = colors[selectedColor];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "nav-active",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar onPreorder={() => setModalOpen(true)} />

      <main>
        <section className="hero" id="home">
          <div className="hero-topline">
            <span>DESIGNED FOR YOUR EVERYDAY</span>
            <span className="availability">
              <span className="availability-dot" />
              A NEW KIND OF CHARGING
            </span>
          </div>

          <div className="hero-copy">
            <div className="hero-heading-wrap">
              <p className="eyebrow reveal">LESS TECH. MORE OBJECT.</p>
              <h1 className="hero-title">
                <span className="title-line title-line-one">mush</span>
                <span className="title-line title-line-two">
                  room<span className="title-period">.</span>
                </span>
              </h1>
            </div>

            <p className="hero-description reveal">
              Meet the wireless charger that
              <br /> feels right at home.
            </p>
          </div>

          <div className="hero-product">
            <div className="hero-side-note">
              <span>01 — 05</span>
              <span>FORM MEETS FUNCTION</span>
            </div>

            <Charger color={color} />

            <div className="hero-price reveal">
              <div>
                <span className="eyebrow">INTRODUCING</span>
                <h2>Mushroom wireless charger</h2>
                <p>A softer side of technology.</p>
              </div>
              <div className="price-block">
                <span>PREORDER PRICE</span>
                <strong>$129</strong>
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <span>GOOD THINGS COME IN SOFT SHAPES.</span>
            <a href="#about" className="scroll-link">
              SCROLL TO DISCOVER <ArrowDown size={15} />
            </a>
          </div>
        </section>

        <section className="intro-section" id="about">
          <div className="section-marker reveal">
            <span>01</span> / THE IDEA
          </div>

          <div className="intro-layout">
            <h2 className="intro-heading reveal">
              A small object.
              <br />
              <span>A different</span>
              <br />
              kind of energy.
            </h2>

            <div className="intro-text reveal">
              <p>
                Technology doesn't have to look technical. Mushroom takes
                something we use every day and turns it into an object worth
                keeping in sight.
              </p>
              <p>
                Inspired by the simple silhouette of a mushroom, its soft
                curves, tactile finish and compact form bring a little more
                character to your everyday charging ritual.
              </p>
              <a href="#specs" className="text-link">
                Get to know the details <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="manifesto-strip">
            <span>01 / FORM</span>
            <span>02 / MATERIAL</span>
            <span>03 / FUNCTION</span>
            <span>MADE TO BE SEEN.</span>
          </div>
        </section>

        <section className="object-section" id="object">
          <div className="object-topline">
            <div className="section-marker reveal">
              <span>02</span> / THE OBJECT
            </div>
            <span className="object-top-note reveal">
              FIVE COLOURS. ONE GOOD IDEA.
            </span>
          </div>

          <div className="object-layout">
            <div className="object-copy reveal">
              <p className="eyebrow">FIND YOUR FORM</p>
              <h2>
                Not just
                <br /> another
                <br /><em>charger.</em>
              </h2>
              <p>
                A padded charging surface, a sculptural silhouette and
                a carefully considered finish. Made to sit comfortably
                in your space.
              </p>

              <div className="color-picker">
                <span className="picker-label">CHOOSE YOUR COLOUR</span>
                <div className="color-options">
                  {colors.map((item, index) => (
                    <button
                      key={item.name}
                      className={`color-option ${
                        selectedColor === index ? "color-option-active" : ""
                      }`}
                      style={{ "--swatch": item.value }}
                      onClick={() => setSelectedColor(index)}
                      aria-label={`Select ${item.name}`}
                      aria-pressed={selectedColor === index}
                    >
                      {selectedColor === index && <Check size={14} />}
                    </button>
                  ))}
                </div>
                <span className="selected-color-name">{color.name}</span>
              </div>
            </div>

            <div className="object-visual reveal">
              <Charger color={color} large />
              <div className="object-image-label">
                <span>MUSHROOM / {color.name.toUpperCase()}</span>
                <span>DESIGN STUDY — 001</span>
              </div>
            </div>
          </div>
        </section>

        <section className="statement-section">
          <span className="statement-top reveal">THOUGHTFULLY SHAPED.</span>
          <h2 className="statement-heading reveal">
            Good design
            <br />
            <span>doesn't shout.</span>
          </h2>
          <p className="statement-bottom reveal">
            It just makes everything feel a little more right.
          </p>
          <div className="statement-orbit" aria-hidden="true" />
        </section>

        <section className="specs-section" id="specs">
          <div className="specs-header">
            <div className="section-marker reveal">
              <span>03</span> / THE DETAILS
            </div>
            <h2 className="reveal">
              The little
              <br />
              things matter<span>.</span>
            </h2>
            <p className="reveal">
              A thoughtful shape on the outside. Useful technology
              on the inside.
            </p>
          </div>

          <div className="specs-list">
            {[
              {
                number: "01",
                title: "Wireless power",
                detail: "Up to 15W wireless power output",
                value: "15W",
              },
              {
                number: "02",
                title: "Soft by design",
                detail: "Magnetic padded leather surface",
                value: "SOFT",
              },
              {
                number: "03",
                title: "Power, connected",
                detail: "USB-C power input",
                value: "USB-C",
              },
              {
                number: "04",
                title: "Room to move",
                detail: "1.5m power adapter cord",
                value: "1.5M",
              },
              {
                number: "05",
                title: "A little light",
                detail: "LED wireless charging indicator",
                value: "LED",
              },
            ].map((spec) => (
              <article className="spec-row reveal" key={spec.number}>
                <span className="spec-number">{spec.number}</span>
                <div className="spec-title-block">
                  <h3>{spec.title}</h3>
                  <p>{spec.detail}</p>
                </div>
                <span className="spec-value">{spec.value}</span>
                <ArrowUpRight className="spec-arrow" size={19} />
              </article>
            ))}
          </div>
          <p className="specs-footnote">
            Product specifications are for the concept shown and should be
            verified against the final hardware before commercial release.
          </p>
        </section>

        <section className="store-section" id="store">
          <div className="store-content reveal">
            <span className="eyebrow">YOUR EVERYDAY, RECONSIDERED</span>
            <h2>
              Make room
              <br />
              for <em>mushroom.</em>
            </h2>
            <p>
              A more considered way to power your day.
              <br /> Small object. Good energy.
            </p>
            <button
              className="light-button"
              onClick={() => setModalOpen(true)}
            >
              Preorder — $129 <ArrowRight size={17} />
            </button>
            <span className="store-note">
              FIVE COLOURS · ONE EVERYDAY ESSENTIAL
            </span>
          </div>
          <div className="store-orbit store-orbit-one" />
          <div className="store-orbit store-orbit-two" />
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          mush<span className="brand-dot">.</span>
        </a>
        <span className="footer-caption">
          A SOFTER SIDE OF TECHNOLOGY.
        </span>
        <a href="#home" className="back-to-top">
          BACK TO TOP ↑
        </a>
        <span className="footer-copy">DESIGN CONCEPT · 2026</span>
      </footer>

      {modalOpen && (
        <PreorderModal
          onClose={() => setModalOpen(false)}
          color={color}
        />
      )}
    </>
  );
}

export default App;
