import HeroSection from "./components/heroSection";
import Navbar from "./components/Navbar";
import RecentSection from "./components/resentSection";
import RecentTournamentSection from "./components/recentTournamentSecrion";
import FooterSection from "./components/fotterSection";
import AboutSection from "./components/aboutSection";
import { BrowserRouter, Route, Router } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter >
    <div className="Main-container">
      <div className="pt-10 bg-gray-900/50">
      <Router>
        <Route path="/"/>

      </Router>
        <Navbar />
        <HeroSection />
        <RecentSection />
        <AboutSection />
        <RecentTournamentSection />
        <FooterSection />
      </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
