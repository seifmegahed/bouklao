import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Game from "./pages/game";

function App() {
  return (
    <div className="screen flex flex-col justify-between w-screen h-screen">
      <Navbar />
      <div className="flex items-center h-full">
        <Game />
      </div>
      <Footer />
    </div>
  );
}

export default App;
