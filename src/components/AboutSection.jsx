import ExperienceCounter from "./ExperienceCounter.jsx";
import AboutSummary from "./AboutSummary.jsx";
import CurrentPursuit from "./CurrentPursuit.jsx";
import "../styles/about.css";

export default function AboutSection() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container">
        <h2 id="about-title" className="section-title">
          About <strong>me</strong>
        </h2>

        <div className="about__grid">
          <ExperienceCounter value={7} label="years experience" />
          <AboutSummary />
          <CurrentPursuit />
        </div>

        <div className="about_more">
          <h2>More to me...</h2>
          <p>
            I have a natural interest in creating things. This has influenced my
            hobbies. I love to draw, paint, and write occassionally. I pay
            attention to the little things and I'm also data-driven. I LOOOVEEE
            NUMBERS. Give me research backed by actual verifiable figures and
            watch me smile sheepishly.LOL. I guess this influenced my transition
            from web dev to data science.
          </p>
          <p>
            The Igbo-man in me no dey use eyes see money. I love business, and I
            am always quick to ask, "so how do we monetise this?". My friends
            would always tease me with my popular phrase, "so... how much?"
          </p>
        </div>
      </div>
    </section>
  );
}
