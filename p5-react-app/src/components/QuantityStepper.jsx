export default function QuantityStepper({ value, onDecrease, onIncrease }) {
  return (
    <div className="stepper">
      <button className="stepper__btn" onClick={onDecrease} aria-label="Decrease">
        −
      </button>

      <span className="stepper__value">{value}</span>

      <button className="stepper__btn" onClick={onIncrease} aria-label="Increase">
        +
      </button>
    </div>
  );
}