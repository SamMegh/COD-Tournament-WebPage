function RecentTournamentSection() {
  const tournaments = [
    {
      id: 1,
      name: "Battle Royale Championship",
      season: "Season 4 - 2024",
      date: "November 10",
      winner: "Shadow Wolves",
      prize: "$5,000",
      participants: 128,
      rank: "1st Place"
    },
    {
      id: 2,
      name: "Elite Squad Showdown",
      season: "Season 4 - 2024",
      date: "November 5",
      winner: "Storm Riders",
      prize: "$3,000",
      participants: 64,
      rank: "1st Place"
    },
    {
      id: 3,
      name: "Weekend Warriors Cup",
      season: "Season 3 - 2024",
      date: "October 28",
      winner: "Night Hawks",
      prize: "$2,000",
      participants: 32,
      rank: "1st Place"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Past <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Tournaments</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Celebrating our champions and legendary battles
          </p>
        </div>

        {/* Tournament Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament, index) => (
            <div 
              key={tournament.id}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-orange-500/50 hover:bg-gray-900/60">
                
                {/* Number Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-linear-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center font-black text-white shadow-lg">
                  {index + 1}
                </div>

                {/* Season Tag */}
                <div className="inline-block px-3 py-1 bg-gray-800/60 border border-gray-700 rounded-full mb-4">
                  <span className="text-gray-400 text-xs font-medium">{tournament.season}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {tournament.name}
                </h3>

                {/* Date */}
                <p className="text-orange-400 text-sm font-medium mb-6">{tournament.date}</p>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

                {/* Winner */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-400 text-sm">Champion</span>
                  </div>
                  <p className="text-white text-lg font-bold">{tournament.winner}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Prize Pool</p>
                    <p className="text-orange-500 text-xl font-black">{tournament.prize}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs mb-1">Teams</p>
                    <p className="text-white text-xl font-black">{tournament.participants}</p>
                  </div>
                </div>

                {/* View Button */}
                <button className="w-full py-2.5 border border-gray-700 hover:border-orange-500 rounded-lg text-gray-300 hover:text-white text-sm font-semibold transition-all duration-300 hover:bg-orange-500/5">
                  View Results
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default RecentTournamentSection;
