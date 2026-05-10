import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary Education (10th)</h4>
                <h5>Matrix Academy School</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed foundational education with distinction, securing an excellent score of 84.74% in board examinations. Cultivated a strong analytical and problem-solving mindset.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Diploma in Computer Engineering</h4>
                <h5>Vidyalankar Polytechnic</h5>
              </div>
              <h3>2023–26</h3>
            </div>
            <p>
              Pursuing comprehensive studies in core computer science principles, software engineering life cycles, and advanced programming methodologies. Consistently applying theoretical knowledge to practical, hands-on development projects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SDE Intern</h4>
                <h5>Ayritech Business Solutions</h5>
              </div>
              <div className="career-date-box">
                <h3>2025</h3>
                <span className="career-months">(Jun – Aug)</span>
              </div>
            </div>
            <p>
              Spearheaded the complete redesign and overhaul of the company’s official website. Architected a scalable frontend structure, implemented a responsive visual design system, and significantly elevated the overall user experience utilizing HTML, CSS, and modern web development practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
