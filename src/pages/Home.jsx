import { Link } from "react-router-dom";
import profile from "../data/profile.js";
import useSectionRouting, {
  useSectionLinkClick,
} from "../hooks/useSectionRouting.js";
import AboutSection from "../components/AboutSection.jsx";
import ProjectsSection from "../components/ProjectsSection.jsx";
import "../styles/home.css";

export default function Home() {
  const { name, email, intro, yearsExperience, skills, photo, photoAlt } = profile;

  useSectionRouting();
  const handleSectionClick = useSectionLinkClick();

  return (
    <>
      <section id="home" className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__text">
            <h1 id="hero-title" className="hero__title">
              <span className="hero__line">My name</span>
              <span className="hero__line">
                is <strong>{name}</strong>
              </span>
            </h1>

            <p className="hero__intro">{intro}</p>

            <div className="hero__actions">
              <a className="btn btn--orange" href={`mailto:${email}`}>
                Hire Me
              </a>
              <Link
                to="/projects"
                className="btn btn--ghost"
                onClick={(e) => handleSectionClick(e, "/projects")}
              >
                View my projects
              </Link>
            </div>

            <ul className="hero__skills" aria-label="Skills">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="hero__visual">
            <div className="hero__stripe" aria-hidden="true" />

            <div className="hero__photo-frame">
              <img
                className="hero__photo"
                src={photo}
                alt={photoAlt}
                width="420"
                height="560"
              />
            </div>

            <div className="hero__badge">
              <span className="hero__badge-number">{yearsExperience}+</span>
              <span className="hero__badge-label">years experience</span>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <ProjectsSection />
    </>
  );
}