import "./App.css";
import Barchart from "./components/Barchart";
import Piechart from "./components/Piechart";
import Metric from "./components/Metric";
import Wordcloud from "./components/Wordcloud";
import Header from "./components/Header";
import FooterPage from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="page">
        <div className="container">
          <div className="left">
            <Metric />
          </div>
          <div className="right">
            <Piechart />
          </div>
          <div className="left">
            <Barchart />
          </div>
          <div className="right">
            <Wordcloud />
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}

export default App;
