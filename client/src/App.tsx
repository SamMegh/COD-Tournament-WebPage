import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import AboutSection from "./screen/AboutPage";
import ContactPage from "./screen/ContactPage";
import Signup from  "./pages/Signup.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { useEffect } from "react";
import RulesPage from "./screen/RulesPage";
import PlayerRegistrationForm from "./components/playerRegistationForm";
import ManagerPage from "./screen/ManagerPage.tsx";
import Player from "./screen/Player.tsx";
import NotFound from "./screen/NotFound.tsx";


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
  const location = useLocation(); 
const hideNavbar =
  location.pathname === "/signup" ||
  location.pathname === "/login" ;
  const isNotFound =
    !["/", "/about", "/rules", "/contact", "/registration", "/manager", "/player", "/signup", "/login"]
      .includes(location.pathname);

  return (
    <div className="Main-container">
      <div  className={!isNotFound ? "pt-10 bg-gray-900/50" : ""}>

{!hideNavbar && !isNotFound && <Navbar />}
        <Routes>

          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/registration" element={<PlayerRegistrationForm />} />
           <Route path="/manager" element={<ManagerPage/>} />
          <Route path="/Player" element={<Player/>} />
         
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="*" element={<NotFound />} />
        
         
  
        </Routes>
      </div>
    </div>
  );
};


const AppWrapper = () => (
  <BrowserRouter>
    <ScrollToHash />
    <App />
  </BrowserRouter>
);

export default AppWrapper;
