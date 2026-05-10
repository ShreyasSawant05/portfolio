import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles/Certifications.css";
import { FaExpand } from "react-icons/fa";
import { MdClose } from "react-icons/md";

// Dynamically import all images from the certifications folder
const certFiles = import.meta.glob('../assets/certifications/*.{png,jpg,jpeg,webp,avif}', { eager: true, query: '?url', import: 'default' });

let loadedCerts = Object.keys(certFiles).map((path, index) => {
  // Extract filename without extension for the title
  const fileName = path.split('/').pop() || '';
  const name = fileName.replace(/\.[^/.]+$/, ""); 
  
  // Format the name (optional): e.g., 'Certificate-1' -> 'Certificate 1'
  const formattedName = name.replace(/[-_]/g, ' ');

  return {
    id: index + 1,
    name: formattedName,
    image: certFiles[path] as string,
  };
});

// Fallback to a placeholder if the folder is empty
if (loadedCerts.length === 0) {
  loadedCerts = [
    { id: 1, name: "Drop certificates in src/assets/certifications", image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1200&q=80" }
  ];
}

export const certData = loadedCerts;

const Certifications = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (isMaximized) return; // Pause slider when maximized

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certData.length);
    }, 4500); // 4-5 seconds wait

    return () => clearInterval(timer);
  }, [isMaximized]);

  return (
    <div className="certifications" id="certifications">
      <h2>
        My <span>Certifications</span>
      </h2>
      <p className="cert-subtitle">Achievements & Milestones</p>

      <div className="cert-slider-container">
        {certData.map((cert, index) => (
          <div
            key={cert.id}
            className={`cert-slide ${index === currentIndex ? "active" : ""}`}
          >
            <div className="cert-image-wrapper">
              <img src={cert.image} alt={cert.name} />
              <div className="cert-overlay">
                <button 
                  className="maximize-btn" 
                  onClick={() => setIsMaximized(true)}
                  aria-label="Maximize certificate"
                >
                  <FaExpand />
                </button>
              </div>
            </div>
            <div className="cert-info">
              <h3>{cert.name}</h3>
            </div>
          </div>
        ))}

        <div className="slider-dots">
          {certData.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Maximized Modal via Portal to avoid transform issues */}
      {createPortal(
        <div className={`cert-modal ${isMaximized ? "open" : ""}`} onClick={() => setIsMaximized(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setIsMaximized(false)}>
              <MdClose />
            </button>
            <img src={certData[currentIndex].image} alt={certData[currentIndex].name} />
            <div className="modal-title">{certData[currentIndex].name}</div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Certifications;
