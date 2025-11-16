import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import AboutSection from "./screen/AboutPage";
import ContactPage from "./screen/ContactPage";

const App = () => {
  return (
    <BrowserRouter>
    
    <div className="Main-container">
      <div className="pt-10 bg-gray-900/50">
    <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
