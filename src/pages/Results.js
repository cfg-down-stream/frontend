import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Results.css";

function Results() {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 mx-4">
        <div className="col d-flex flex-column p-0">
          <Header />
          {/* Main Gradient Section Begins */}
          <main className="light-gradient h-100 d-flex flex-column justify-content-center align-items-center">
            1. Return 5 random api search results 2. Take ids from 5 results and
            run another api call with them 3. Dispaly extra information from
            second api call
          </main>
          {/* Main Gradient Section Ends */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Results;
