import { useEffect, useState, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MdMenu, MdClose, MdArrowOutward } from "react-icons/md";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother | undefined;

const navLinks = [
  { id: "#landingDiv", label: "HOME" },
  { id: "#about", label: "ABOUT" },
  { id: "#whatido", label: "SERVICES" },
  { id: "#career", label: "CAREER" },
  { id: "#work", label: "WORK" },
  { id: "#techstack", label: "SKILLS" },
  { id: "#certifications", label: "CERTS" },
  { id: "#contact", label: "CONTACT" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const magneticContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      smoother?.kill();
      smoother = undefined;
      return;
    }

    const nextSmoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.25,
      speed: 1.2,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother = nextSmoother;
    nextSmoother.scrollTop(0);
    nextSmoother.paused(true);
    ScrollTrigger.refresh();

    return () => {
      nextSmoother.kill();
      if (smoother === nextSmoother) {
        smoother = undefined;
      }
    };
  }, [isDesktop]);



  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && !isDesktop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isDesktop]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (isDesktop && smoother) {
      smoother.scrollTo(href, true, "top top");
    } else {
      setIsMenuOpen(false);

      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  };

  return (
    <>
      {!isDesktop && (
        <div className="header">
          <a href="#landingDiv" className="navbar-title" data-cursor="disable">
            <span className="navbar-title-mark">SS</span>
            <span className="navbar-title-copy">Portfolio</span>
          </a>
          <div
            className="nav-menu-icon"
            data-cursor="disable"
            onClick={() => setIsMenuOpen(true)}
          >
            <MdMenu size={30} />
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {!isDesktop && (
        <div className={`nav-overlay ${isMenuOpen ? "open" : ""}`}>
          <div
            className="nav-overlay-backdrop"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="nav-overlay-panel">
            <div className="nav-overlay-top">
              <div>
                <span className="nav-overlay-eyebrow">Quick navigation</span>
                <h2>Move through the portfolio with less clutter.</h2>
              </div>
              <button
                type="button"
                className="nav-overlay-close"
                onClick={() => setIsMenuOpen(false)}
                data-cursor="disable"
                aria-label="Close menu"
              >
                <MdClose size={28} />
              </button>
            </div>
            <ul className="nav-overlay-links">
              {navLinks.map((link, index) => (
                <li key={link.id}>
                  <a href={link.id} onClick={(e) => handleNavClick(e, link.id)}>
                    <span className="nav-link-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="nav-link-label">{link.label}</span>
                    <MdArrowOutward />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="nav-resume-link"
            >
              Resume
              <MdArrowOutward />
            </a>
          </div>
        </div>
      )}

      {isDesktop && (
        <div
          className="magnetic-sidebar"
          ref={magneticContainerRef}
        >
          <div className="desktop-menu-icon">
            <MdMenu size={24} />
          </div>
          <div className="desktop-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.id}
                className="desktop-nav-link"
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
