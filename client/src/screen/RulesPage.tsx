import { useState } from 'react';

function RulesPage() {
  const [activeMode, setActiveMode] = useState<'br' | 'multiplayer'>('br');

  const brBanList = {
    weapons: [
      "No weapon restrictions"
    ],
    perks: [] as string[],
    scorestreaks: [] as string[],
    items: [
      "Hacks & Third-party software",
      "Emulators (Mobile devices only)",
      "VPN usage",
      "Stream sniping"
    ],
    actions: [
      "Teaming with enemy squads",
      "Exploiting map glitches",
      "Using game bugs for advantage",
      "Toxic behavior & harassment",
      "Ghosting/Screen watching"
    ]
  };

  const multiplayerBanList = {
    weapons: [
      "NA-45 (Banned)",
      "Shorty (Banned)",
      "Thermite (Banned)"
    ],
    perks: [
      "Persistence (Banned)",
      "Hardline (Banned)"
    ],
    scorestreaks: [
      "Napalm (Banned)",
      "Cluster Strike (Banned)"
    ],
    items: [
      "Hacks & Third-party software",
      "Emulators (Mobile devices only)",
      "VPN usage",
      "Glitch spots usage"
    ],
    actions: [
      "Using banned weapons/items",
      "Exploiting map bugs",
      "Toxic behavior & harassment",
      "Offensive team names/content"
    ]
  };

  const currentBanList = activeMode === 'br' ? brBanList : multiplayerBanList;

  return (
    <section className="relative py-20 overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Ban <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">List</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Items, weapons, and actions that are prohibited in tournaments
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-1.5">
            <button
              onClick={() => setActiveMode('br')}
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeMode === 'br'
                  ? 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Battle Royale
            </button>
            <button
              onClick={() => setActiveMode('multiplayer')}
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeMode === 'multiplayer'
                  ? 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Multiplayer
            </button>
          </div>
        </div>

        {/* Rules Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Weapons Section */}
          {(activeMode === 'multiplayer' || currentBanList.weapons[0] !== "No weapon restrictions") && (
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Banned Weapons</h3>
              </div>
              <ul className="space-y-2">
                {currentBanList.weapons.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Perks Section (Multiplayer Only) */}
          {activeMode === 'multiplayer' && (
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Banned Perks</h3>
              </div>
              <ul className="space-y-2">
                {currentBanList.perks.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Scorestreaks Section (Multiplayer Only) */}
          {activeMode === 'multiplayer' && (
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Banned Scorestreaks</h3>
              </div>
              <ul className="space-y-2">
                {currentBanList.scorestreaks.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prohibited Items */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Prohibited Items</h3>
            </div>
            <ul className="space-y-2">
              {currentBanList.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Prohibited Actions */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Prohibited Actions</h3>
            </div>
            <ul className="space-y-2">
              {currentBanList.actions.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white mb-2">⚠️ Warning</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Using any item or performing any action from this ban list will result in immediate disqualification. All matches are monitored and recorded for fair play enforcement.
              </p>
              <p className="text-red-400 text-sm font-semibold">
                Violation may result in permanent ban from all future tournaments.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Fair Play */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-green-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-bold mb-2">Fair Play Guaranteed</h4>
            <p className="text-gray-400 text-sm">We ensure equal opportunities for all participants</p>
          </div>

          {/* Support */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <h4 className="text-white font-bold mb-2">24/7 Support</h4>
            <p className="text-gray-400 text-sm">Our team is always ready to help you</p>
          </div>

          {/* Transparency */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-white font-bold mb-2">Full Transparency</h4>
            <p className="text-gray-400 text-sm">All results and standings are public</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default RulesPage;
