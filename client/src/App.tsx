import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import AboutSection from "./screen/AboutPage";
import ContactPage from "./screen/ContactPage";
import Signup from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { useEffect } from "react";
import RulesPage from "./screen/RulesPage";
import PlayerRegistrationForm from "./components/playerRegistationForm";

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
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
  const location = useLocation(); // ✅ Use it inside the component
  const hideNavbar = location.pathname === "/signup" || location.pathname === "/login";

  return (
    <div className="Main-container">
      <div className="pt-10 bg-gray-900/50">
        {!hideNavbar && <Navbar />}
        <Routes>
          
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/registration" element={<PlayerRegistrationForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

// Wrap App with BrowserRouter in a separate component
const AppWrapper = () => (
  <BrowserRouter>
    <ScrollToHash />
    <App />
  </BrowserRouter>
);

export default AppWrapper;
