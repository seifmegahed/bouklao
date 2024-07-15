import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Game from "./pages/game";

// const allImages = [
//   "images/bottle1.png",
//   "images/bottle2.png",
//   "images/bottle3.png",
//   "images/buildings.png",
//   "images/clouds.png",
//   "images/ground.png",
//   "images/player-jumping.png",
//   "images/player-lose.png",
//   "images/player-run-0.png",
//   "images/player-run-1.png",
// ];

function App() {
  return (
    <div className="screen flex flex-col justify-between w-screen h-screen max-h-screen overflow-hidden relative">
      <Navbar />
      <div className="flex items-center justify-center">
        <Game />
      </div>
      <Footer />
    </div>
  );
}

export default App;
