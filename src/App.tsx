import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Game from "./pages/game";

function App() {
  return (
    <div className="screen flex flex-col justify-between w-screen h-screen max-h-screen overflow-hidden relative">
      <Navbar />
      <div className="flex items-center justify-center">
        <Game />
      </div>
      <Footer />
      <Modal isOpen={true} onClose={() => {}}>
        Modal
      </Modal>
    </div>
  );
}

export default App;
