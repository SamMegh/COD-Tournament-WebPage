import { useState, useEffect } from 'react';

function PlayerRegistrationForm() {
  const [visiblePlayers, setVisiblePlayers] = useState(1); // Show 1 player initially (Player 3)
  const maxPlayers = 6; // Maximum 6 additional players after co-leader

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddPlayer = () => {
    if (visiblePlayers < maxPlayers) {
      setVisiblePlayers(visiblePlayers + 1);
    }
  };

  const handleRemovePlayer = () => {
    if (visiblePlayers > 1) {
      setVisiblePlayers(visiblePlayers - 1);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">Tournament Registration</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 mt-2">
            Register Your <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Fill in your 8-player team details to register for the tournament
          </p>
        </div>

        <form className="space-y-8">
          
          {/* Leader Section */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Team Leader</h3>
                <p className="text-gray-400 text-sm">Primary contact and Player #1</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="leader-name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Leader Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="leader-name"
                  name="leader-name"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="Enter leader name"
                />
              </div>

              <div>
                <label htmlFor="leader-uid" className="block text-sm font-semibold text-gray-300 mb-2">
                  Leader UID <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="leader-uid"
                  name="leader-uid"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="Enter UID"
                />
              </div>

              <div>
                <label htmlFor="leader-email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  id="leader-email"
                  name="leader-email"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="leader@email.com"
                />
              </div>

              <div>
                <label htmlFor="leader-mobile" className="block text-sm font-semibold text-gray-300 mb-2">
                  Mobile Number <span className="text-orange-500">*</span>
                </label>
                <input
                  type="tel"
                  id="leader-mobile"
                  name="leader-mobile"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          {/* Co-Leader Section */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Co-Leader</h3>
                <p className="text-gray-400 text-sm">Player #2</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="co-leader-name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Co-Leader Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="co-leader-name"
                  name="co-leader-name"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="Enter co-leader name"
                />
              </div>

              <div>
                <label htmlFor="co-leader-uid" className="block text-sm font-semibold text-gray-300 mb-2">
                  Co-Leader UID <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="co-leader-uid"
                  name="co-leader-uid"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="Enter UID"
                />
              </div>
            </div>
          </div>

          {/* Remaining Players Section */}
          {Array.from({ length: visiblePlayers }, (_, i) => (
            <div 
              key={i}
              className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 animate-fadeIn relative"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Player #{i + 3}</h3>
                    <p className="text-gray-400 text-sm">Team Member</p>
                  </div>
                </div>
                
                {/* Remove Button */}
                {i === visiblePlayers - 1 && (
                  <button
                    type="button"
                    onClick={handleRemovePlayer}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    title="Remove player"
                  >
                    <svg className="w-4 h-4 text-red-400 group-hover:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`player-${i + 3}-name`} className="block text-sm font-semibold text-gray-300 mb-2">
                    Player Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`player-${i + 3}-name`}
                    name={`player-${i + 3}-name`}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    placeholder="Enter player name"
                  />
                </div>

                <div>
                  <label htmlFor={`player-${i + 3}-uid`} className="block text-sm font-semibold text-gray-300 mb-2">
                    Player UID <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`player-${i + 3}-uid`}
                    name={`player-${i + 3}-uid`}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    placeholder="Enter UID"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add More Player Button */}
          {visiblePlayers < maxPlayers && (
            <button
              type="button"
              onClick={handleAddPlayer}
              className="w-full px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 border-2 border-dashed border-gray-700 hover:border-orange-500/50 rounded-2xl text-gray-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add More Player ({maxPlayers - visiblePlayers} remaining)
            </button>
          )}

          {visiblePlayers === maxPlayers && (
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl">
              <p className="text-green-400 text-sm text-center font-semibold">
                ✓ All 8 player slots filled
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              className="flex-1 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-white font-bold transition-all duration-300"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="flex-1 px-8 py-4 bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              Submit Registration
            </button>
          </div>

          {/* Terms Notice */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              By submitting, you agree to our{' '}
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
                tournament rules
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
                terms of service
              </a>
            </p>
          </div>

        </form>

      </div>

      {/* Add fadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}

export default PlayerRegistrationForm;
