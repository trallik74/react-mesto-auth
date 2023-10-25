import { Link } from "react-router-dom";

export default function Header({ children }) {
  return (
    <header className="header">
      <Link className="header__logo" to="/" />
      <nav>{children}</nav>
    </header>
  );
}
