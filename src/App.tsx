import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// import Game from "./pages/game";
import Game2 from "./pages/game/Game2";

function App() {
  return (
    <div className="screen flex flex-col justify-between w-screen h-screen max-h-screen overflow-hidden relative">
      <Navbar />
      <Game2 />
      <Footer />
    </div>
  );
}

export default App;
