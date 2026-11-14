export default function ProjectCard({ project }) {
  const { title, description, image, imageAlt, tech, liveUrl, repoUrl } = project;

  return (
    <article className="project-card">
      <div className="project-card__media">
        <img
          className="project-card__image"
          src={image}
          alt={imageAlt}
          width="800"
          height="500"
          loading="lazy"
        />
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>

        <ul className="project-card__tech" aria-label="Technologies used">
          {tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="project-card__links">
          {liveUrl && (
            <a
              className="btn btn--orange"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${title}`}
            >
              Live Demo
            </a>
          )}
          {repoUrl && (
            <a
              className="btn btn--ghost"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code of ${title} on GitHub`}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}