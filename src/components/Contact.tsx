import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Get in Touch</h4>
            <div className="contact-info-item">
              <FaEnvelope className="contact-info-icon" />
              <a
                href="mailto:shreyassawant1309@gmail.com"
                data-cursor="disable"
              >
                shreyassawant1309@gmail.com
              </a>
            </div>
            <div className="contact-info-item">
              <FaPhone className="contact-info-icon" />
              <a
                href="tel:7264825668"
                data-cursor="disable"
              >
                +91 7264825668
              </a>
            </div>
            <h4>Education</h4>
            <p>
              Diploma in Computer Engineering, Vidyalankar Polytechnic — 2023–2026
            </p>
            <p>
              Secondary Education, Matrix Academy School — 2023
            </p>
          </div>
          <div className="contact-box">
            <h4>Socials</h4>
            <a
              href="https://github.com/ShreyasSawant05"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/shreyas-sawant-0803992b1"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Shreyas Sawant</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
