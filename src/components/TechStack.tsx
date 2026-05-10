import { useEffect, useRef, useCallback } from "react";
import "./styles/TechStack.css";

const techItems = [
  { name: "Java", color: "#ED8B00", icon: "/images/java.png" },
  { name: "Python", color: "#3776AB", icon: "/images/python.png" },
  { name: "C", color: "#004482", icon: "/images/c.png" },
  { name: "C++", color: "#00599C", icon: "/images/cpp.png" },
  { name: "HTML", color: "#E44D26", icon: "/images/html.png" },
  { name: "CSS", color: "#264DE4", icon: "/images/css.png" },
];

const TechStack = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const grid = gridRef.current;
    if (!grid) return;

    const rect = grid.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    grid.style.setProperty("--spotlight-x", `${x}px`);
    grid.style.setProperty("--spotlight-y", `${y}px`);

    // Update each card's individual spotlight
    const cards = grid.querySelectorAll<HTMLDivElement>(".spot-card");
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardX = e.clientX - cardRect.left;
      const cardY = e.clientY - cardRect.top;
      card.style.setProperty("--card-x", `${cardX}px`);
      card.style.setProperty("--card-y", `${cardY}px`);
    });
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (grid) {
        grid.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  // Scroll-triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("spot-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = sectionRef.current?.querySelectorAll(".spot-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="techstack" ref={sectionRef} id="techstack">
      <h2>
        My <span>Techstack</span>
      </h2>
      <p className="spot-subtitle">Technologies I work with</p>

      <div className="spot-grid" ref={gridRef}>
        {/* Global spotlight overlay */}
        <div className="spot-overlay" />

        {techItems.map((item, index) => (
          <div
            className="spot-card"
            key={item.name}
            style={
              {
                "--accent": item.color,
                "--delay": `${index * 0.1}s`,
              } as React.CSSProperties
            }
          >
            {/* Card border glow (follows mouse) */}
            <div className="spot-card-border" />

            {/* Card content */}
            <div className="spot-card-content">
              <div className="spot-icon-wrap">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="spot-icon"
                />
              </div>
              <h3 className="spot-name">{item.name}</h3>
            </div>

            {/* Inner spotlight glow */}
            <div className="spot-card-glow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
