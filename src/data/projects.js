function placeholder(label, background) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="${background}"/><text x="50%" y="50%" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const projects = [
  {
    id: "project-1",
    title: "Project One",
    description:
      "A short description of what this project does, the problem it solves, and your role in building it.",
    image: placeholder("Project One", "#4f46e5"),
    imageAlt: "Screenshot of Project One",
    tech: ["React", "CSS", "JavaScript"],
    liveUrl: "https://example1.com",
    repoUrl: "https://github.com/your-username/project-one",
  },
  {
    id: "project-2",
    title: "Project Two",
    description:
      "A short description of what this project does, the problem it solves, and your role in building it.",
    image: placeholder("Project Two", "#0f766e"),
    imageAlt: "Screenshot of Project Two",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://example2.com",
    repoUrl: "https://github.com/your-username/project-two",
  },
  {
    id: "project-3",
    title: "Project Three",
    description:
      "A short description of what this project does, the problem it solves, and your role in building it.",
    image: placeholder("Project Three", "#b45309"),
    imageAlt: "Screenshot of Project Three",
    tech: ["Node.js", "Express", "MongoDB"],
    liveUrl: "https://example3.com",
    repoUrl: "https://github.com/your-username/project-three",
  },
];

export default projects;