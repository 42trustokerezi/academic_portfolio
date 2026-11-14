import ProjectCard from "./ProjectCard.jsx";
import projects from "../data/projects.js";
import "../styles/projects.css";

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="container">
        <h2 id="projects-title" className="section-title">
          My <strong>projects</strong>
        </h2>
        <p className="projects__intro">
          A selection of things I've built. Each project links to a live demo and
          its source code.
        </p>

        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}