import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 ">
        <div className="col d-flex flex-column p-0">
          {/* Main - Gradient section */}
          <main className="home-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            {/* Logo Heading */}
            <h1 className="display-1">
              <span className="text-white">down</span>
              <span className="text-blue">Stream</span>
            </h1>
            {/* Links */}
            <div className="d-flex align-items-center text-blue text-uppercase fw-bold">
              <Link to="/signup" className="text-blue text-decoration-none">
                Sign up
              </Link>
              <Link to="/search" className="text-blue text-decoration-none">
                <span className="mx-5 my-0 h1">
                  <i class="bi bi-play-circle"></i>
                </span>
              </Link>
              <Link to="/login" className="text-blue text-decoration-none">
                Log In
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
