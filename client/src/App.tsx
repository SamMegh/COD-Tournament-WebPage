import HeroSection from './components/heroSection';
import Navbar from './components/Navbar';


const App = () => {
    return (
      <div className='Main-container'>
 <div className="pt-10 bg-gray-900/50">
        <Navbar />
       <HeroSection />
      </div>
      </div>
     
    );
};

export default App;