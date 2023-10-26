import "./Loader.css";

export default function Loader({ isColored }) {
  return (
    <span className={`loader ${isColored ? "loader_type_colored" : ""}`}></span>
  );
}
