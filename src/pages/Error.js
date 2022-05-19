import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Error.css";

function Error() {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="light-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            <i class="bi bi-emoji-frown"></i>
            <h1 className="error-page-message w-50 text-center">
              Sorry. We couldn’t find any{" "}
              <span className="text-black">type</span> on{" "}
              <span className="text-black">platform</span> that matched your
              search.
            </h1>
          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Error;
