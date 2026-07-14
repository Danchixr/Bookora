export default function SaveButton({
  text = "Save Service",
}) {
  return (
    <button
      type="submit"
      className="save-service-btn"
    >
      {text}
    </button>
  );
}