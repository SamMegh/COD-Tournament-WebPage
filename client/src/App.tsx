import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import AboutSection from "./screen/AboutPage";
import ContactPage from "./screen/ContactPage";
import PlayerRegistrationForm from "./components/playerRegistationForm";
import { useEffect } from "react";

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToHash />
    <div className="Main-container">
      <div className="pt-10 bg-gray-900/50">
    <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/registration" element={<PlayerRegistrationForm />} />
      </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
