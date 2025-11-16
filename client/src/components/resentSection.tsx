function RecentSection() {
  const recentMatches = [
    {
      id: 1,
      team1: "Shadow Wolves",
      team2: "Fire Squad",
      score1: 15,
      score2: 12,
      time: "2 hours ago",
      status: "completed",
      map: "Isolated"
    },
    {
      id: 2,
      team1: "Apex Legends",
      team2: "Storm Riders",
      score1: 18,
      score2: 14,
      time: "4 hours ago",
      status: "completed",
      map: "Blackout"
    },
    {
      id: 3,
      team1: "Titan Force",
      team2: "Elite Warriors",
      score1: 0,
      score2: 0,
      time: "Live Now",
      status: "live",
      map: "Alcatraz"
    }
  ];

  const recentNews = [
    {
      id: 1,
      title: "New Map Added to Tournament",
      description: "Alcatraz map now available for competitive play",
      time: "1 day ago",
      category: "Update"
    },
    {
      id: 2,
      title: "Prize Pool Increased",
      description: "Total prize pool now exceeds $15,000",
      time: "2 days ago",
      category: "Announcement"
    },
    {
      id: 3,
      title: "Pro Player Spotlight",
      description: "Interview with top ranked player 'Shadow'",
      time: "3 days ago",
      category: "Featured"
    }
  ];

  return (
    <section
    id="matches"
    className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-950/5 to-transparent"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full backdrop-blur-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-orange-400 text-sm font-semibold tracking-wider">LATEST UPDATES</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Recent <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Matches</span>
          </h2>
          
          <div className="h-1 w-24 bg-linear-to-r from-orange-500 to-red-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Recent Matches - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-linear-to-b from-orange-500 to-red-600 rounded-full"></div>
              Match Results
            </h3>

            {recentMatches.map((match) => (
              <div 
                key={match.id}
                className="group bg-gray-900/60 backdrop-blur-xl border border-gray-800 hover:border-orange-500/50 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {match.status === 'live' ? (
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-red-400 text-xs font-bold uppercase">Live</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full">
                        <span className="text-gray-400 text-xs font-semibold">Completed</span>
                      </div>
                    )}
                    <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full">
                      <span className="text-orange-400 text-xs font-semibold">{match.map}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{match.time}</span>
                </div>

                <div className="flex items-center justify-between">
                  {/* Team 1 */}
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-bold text-white mb-2">{match.team1}</h4>
                    <div className="text-3xl font-black bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                      {match.score1}
                    </div>
                  </div>

                  {/* VS Divider */}
                  <div className="px-8">
                    <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/50">
                      <span className="text-white font-black text-sm">VS</span>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex-1 text-right">
                    <h4 className="text-xl font-bold text-white mb-2">{match.team2}</h4>
                    <div className="text-3xl font-black bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                      {match.score2}
                    </div>
                  </div>
                </div>

                {match.status === 'live' && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Round 3 of 5</span>
                      <button className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                        Watch Live →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button className="w-full py-4 border-2 border-gray-800 hover:border-orange-500 rounded-xl text-white font-semibold transition-all duration-300 hover:bg-orange-500/5">
              View All Matches
            </button>
          </div>

          {/* Recent News - Takes 1 column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-linear-to-b from-orange-500 to-red-600 rounded-full"></div>
              Latest News
            </h3>

            {recentNews.map((news) => (
              <div 
                key={news.id}
                className="group bg-gray-900/60 backdrop-blur-xl border border-gray-800 hover:border-orange-500/50 rounded-xl p-5 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    news.category === 'Update' ? 'bg-blue-500/20 text-blue-400' :
                    news.category === 'Announcement' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {news.category}
                  </span>
                  <span className="text-gray-500 text-xs">{news.time}</span>
                </div>

                <h4 className="text-white font-bold mb-2 group-hover:text-orange-400 transition-colors">
                  {news.title}
                </h4>
                
                <p className="text-gray-400 text-sm mb-3">
                  {news.description}
                </p>

                <div className="flex items-center text-orange-400 text-sm font-semibold group-hover:gap-2 transition-all">
                  Read More 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}

            {/* Quick Stats Card */}
            <div className="bg-linear-to-br from-orange-500/10 to-red-600/10 backdrop-blur-xl border border-orange-500/30 rounded-xl p-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Tournament Stats
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Matches Played</span>
                  <span className="text-white font-bold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Active Players</span>
                  <span className="text-white font-bold">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Teams Competing</span>
                  <span className="text-white font-bold">125</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default RecentSection;
