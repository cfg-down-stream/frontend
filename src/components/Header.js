import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <span className="text-purple">down</span>
          Stream
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/" className="nav-item text-decoration-none">
              Home
            </Link>
            <Link to="/profile" className="nav-item text-decoration-none">
              Profile
            </Link>
            <Link to="/search" className="nav-item text-decoration-none">
              Search
            </Link>
            <Link to="/signup" className="nav-item text-decoration-none">
              Sign up
            </Link>
            <Link to="/login" className="nav-item text-decoration-none">
              Log In
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
