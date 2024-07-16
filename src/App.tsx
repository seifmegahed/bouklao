import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Game from "./pages/game";
import Loading from "./components/Loading";
import { Analytics } from "firebase/analytics";
import { analytics } from "./firebase-config";

const allImages = [
  "images/bottle1.png",
  "images/bottle2.png",
  "images/bottle3.png",
  "images/buildings.png",
  "images/clouds.png",
  "images/ground.png",
  "images/player-jumping.png",
  "images/player-lose.png",
  "images/player-run-0.png",
  "images/player-run-1.png",
  "https://utfs.io/f/9076bf45-4d29-49ab-9835-4c863f3c63fa-1zbfv.png",
];

// declare global {
//   interface Window {
//     analytics: Analytics;
//   }
// }

function App() {
  const [isLoaded, setIsLoaded] = useState(0);

  useEffect(() => {
    // window.analytics = analytics;
    const images = allImages.map(() => new Image());
    images.forEach((image, index) => {
      image.onload = () => setIsLoaded((prev) => prev + 1);
      image.src = allImages[index];
    });
  }, []);

  if (isLoaded < allImages.length) return <Loading />;

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
