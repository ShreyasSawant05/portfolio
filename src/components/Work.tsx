import { useState, useCallback, useEffect, useRef } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const slides = [
  {
    label: "Final Year Project",
    title: "MedX — AI Medicine Authentication",
    body: "For my final year project, I led the development of MedX, an innovative AI-driven medicine identification and authentication system. Designed to ensure pharmaceutical safety and verify genuine medication, the platform utilizes a sophisticated 7-second video scan powered by Google Vision AI and the RevX API. I engineered a robust Flask backend to handle the complex processing and seamlessly integrated a feature that generates secure, automated PDF reports for authenticated batches. This project highlights my ability to combine complex computer vision technologies with practical, full-stack web architecture to solve real-world industry challenges.",
  },
  {
    label: "Internship Project",
    title: "Corporate Website Revamp",
    body: "During my recent internship, I took ownership of completely revamping the company's corporate website to significantly enhance both its performance and user experience. Leveraging the Astro framework, I rebuilt the web architecture from the ground up to deliver a modern, lightning-fast, and highly responsive interface. This initiative required translating core business requirements into clean, scalable code, ultimately optimizing the site's load times and elevating the brand's digital footprint.",
  },
  {
    label: "Micro-Projects",
    title: "Versatile Technical Portfolio",
    body: "Beyond my major projects, I have cultivated a highly versatile technical skill set through a diverse portfolio of micro-projects spanning multiple languages, including Java, Python, C, C++, HTML, and CSS. A significant portion of this foundational work involves Mobile Application Development (MAD), where I have utilized Android Studio and SQLite to build fully functional applications with clean, modern UI designs. Whether developing custom database modules or experimenting with cross-platform styling, these targeted micro-projects have continuously sharpened my problem-solving abilities and adaptability as a software developer.",
  },
];

const SWIPE_THRESHOLD = 50;

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setAnimKey((k) => k + 1);
      setCurrentIndex(index);
    },
    [isAnimating, currentIndex]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  // Touch swipe support for mobile
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) goToNext();
        else goToPrev();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToNext, goToPrev]);

  // Reset animating lock after transition completes
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  // Auto-advance every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimKey((k) => k + 1);
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentIndex];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-carousel" ref={carouselRef}>
          {/* Slide counter */}
          <div className="work-carousel__counter">
            <span className="work-carousel__current">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="work-carousel__separator">/</span>
            <span className="work-carousel__total">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          {/* Slide content — keyed to re-trigger animation */}
          <div className="work-carousel__content" key={animKey}>
            <span className="work-carousel__label">{slide.label}</span>
            <h3 className="work-carousel__title">{slide.title}</h3>
            <p className="work-carousel__body">{slide.body}</p>
          </div>

          {/* Bottom bar: dots + arrows */}
          <div className="work-carousel__controls">
            {/* Progress bar */}
            <div className="work-carousel__progress">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`work-carousel__pip ${
                    i === currentIndex ? "work-carousel__pip--active" : ""
                  }`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  data-cursor="disable"
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="work-carousel__arrows">
              <button
                className="work-carousel__arrow"
                onClick={goToPrev}
                aria-label="Previous slide"
                data-cursor="disable"
              >
                <MdArrowBack />
              </button>
              <button
                className="work-carousel__arrow"
                onClick={goToNext}
                aria-label="Next slide"
                data-cursor="disable"
              >
                <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
