export default function Loader({ label = "Loading..." }) {
  return (
    <div className="center">
      <div className="spinner" />
      <p className="muted">{label}</p>
    </div>
  );
}