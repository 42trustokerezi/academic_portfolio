import useCountUp from "../hooks/useCountUp.js";

export default function ExperienceCounter({ value = 7, label = "years experience" }) {
  const [count, ref] = useCountUp(value);

  return (
    <div className="about-card about-card--counter" ref={ref}>
      <h3 className="counter__number">
        <span className="visually-hidden">
          {value} {label}
        </span>
        <span aria-hidden="true">{count}</span>
      </h3>
      <p className="counter__label" aria-hidden="true">
        {label}
      </p>
    </div>
  );
}
