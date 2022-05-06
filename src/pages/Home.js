import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container-fluid h-100 py-5 d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-1 fw-bold"><span className="text-white">down</span><span className="text-blue">Stream</span></h1>
      <div className="d-flex align-items-center text-blue text-uppercase fw-bold">
        <Link to="/signup" className="text-blue text-decoration-none">Sign up</Link>
        <span className="mx-5 my-0 h1"><i class="bi bi-play-circle"></i></span>
        <Link to="/login" className="text-blue text-decoration-none">Log In</Link>
      </div>
    </div>
  );
}

export default Home;
