import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects";
import "../styles/projects.css";

export default function Projects() {
  return (
    <section className="container page">
      <h1>Projects</h1>
      <p>Projects page content coming in a later part.</p>
      <div className="projects__grid">
{projects.map((project)=> (
  <ProjectCard key={project.id} project={project}/>
))}
      </div>
    </section>
  );
}
