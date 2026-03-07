import EmptyState from "../components/EmptyState";

export default function NotFound() {
  return (
    <div className="container page">
      <EmptyState
        title="Page not found"
        text="That link doesn’t exist. Let’s get you back to the shop."
        ctaLabel="Back to shop"
        to="/"
      />
    </div>
  );
}