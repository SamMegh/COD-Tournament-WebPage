import HeroSection from './components/heroSection';
import Navbar from './components/Navbar';
import RecentSection from './components/resentSection';
import RecentTournamentSection from './components/recentTournamentSecrion';
import FooterSection from './components/fotterSection';
import AboutSection from './components/aboutSection';


const App = () => {
    return (
      <div className='Main-container'>
 <div className="pt-10 bg-gray-900/50">
        <Navbar />
       <HeroSection />
       <RecentSection />
       <AboutSection />
       <RecentTournamentSection />
       <FooterSection />
      </div>
      </div>
     
    );
};

export default App;