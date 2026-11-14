import Project_1 from "../assets/images/project_1.png";
import Project_2 from "../assets/images/project_2.png";
import Project_3 from "../assets/images/project_3.png";


const projects = [
  {
    id: "project-1",
    title: "carhub",
    description:
      "carhub is a car rental service which gives clients access to a wide range of automoblie products based on the preferred brand and make.",
    image: Project_1,
    imageAlt: "Screenshot of Project One",
    tech: ["React", "CSS", "JavaScript"],
    liveUrl: "https://car-dealership-five-red.vercel.app/",
    repoUrl: "https://github.com/42trustokerezi/car-dealership",
  },
  {
    id: "project-2",
    title: "7 River Labs",
    description:
      "7 river labs is a platform which provides patients the opportunity to take medical tests and recieve results anonymously",
    image: Project_2,
    imageAlt: "Screenshot of Project Two",
    tech: ["React", "Tailwindcss", "Typescript"],
    liveUrl: "https://7rl-consumer.vercel.app/",
    repoUrl: "https://github.com/42trustokerezi/7rl-consumer",
  },
  {
    id: "project-3",
    title: "Movies",
    description:
      "Movies is a personal project showcasing an attempt to create a movie streaming platform.",
    image: Project_3,
    imageAlt: "Screenshot of Project Three",
    tech: ["React", "CSS", "MongoDB"],
    liveUrl: "https://moviehub.vercel.app/",
    repoUrl: "https://github.com/42trustokerezi/movie-app",
  },
];

export default projects;
