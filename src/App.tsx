import Footer from "./components/Footer";
import Navbar from "./components/Nav";
import Game from "./pages/game";

function App() {
  return (
    <div className="screen flex flex-col justify-between w-screen h-screen max-h-screen overflow-hidden relative">
      <Navbar />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
