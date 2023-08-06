import "./App.css";
import { Header } from "./Components/Header";
// import { Footer } from "./Components/Footer";
import backgroundpic from "./assets/Luffy.jpg";
import { Allroutes } from "./Components/Allroutes";

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Pseudo-element for the blurred background */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-sm"
        style={{
          backgroundImage: `url(${backgroundpic})`,
        }}
      ></div>

      {/* Content on top of the blurred background */}
      <div className="relative z-10">
        <Header />
        <div>
          <Allroutes />
        </div>
      </div>
    </div>
  );
}

export default App;
