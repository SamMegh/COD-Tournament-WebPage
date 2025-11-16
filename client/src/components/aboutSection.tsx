function AboutSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Your Name",
      role: "Founder & Tournament Director",
      description: "Passionate CODM player with competitive experience. Founded BattleCore to create a professional esports platform for mobile gamers worldwide.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      instagram: "@your_instagram",
      email: "your@email.com"
    },
    {
      id: 2,
      name: "Member Name",
      role: "Head of Operations",
      description: "Experienced in tournament organization and community building. Ensures every competition runs smoothly and professionally.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      instagram: "@member_instagram",
      email: "member@email.com"
    },
    {
      id: 3,
      name: "Member Name",
      role: "Lead Moderator",
      description: "Dedicated to maintaining fair play and positive community standards. Available to assist players and resolve any tournament-related issues.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      instagram: "@member_instagram",
      email: "member@email.com"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Meet Our <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            The passionate individuals behind BattleCore, dedicated to creating the ultimate competitive gaming experience for the CODM community.
          </p>
        </div>

        {/* Team Cards */}
        <div className="space-y-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id}
              className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-orange-500/50 hover:bg-gray-900/60 hover:shadow-2xl hover:shadow-orange-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-6 p-6 lg:p-8">
                
                {/* Left Side - Image */}
                <div className="lg:w-80 shrink-0">
                  <div className="relative aspect-square lg:aspect-auto lg:h-80 rounded-xl overflow-hidden bg-gray-800">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-orange-500/30 to-transparent"></div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Role Badge */}
                  <div className="inline-block mb-3">
                    <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-3xl font-black text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {member.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-base leading-relaxed mb-6">
                    {member.description}
                  </p>

                  {/* Contact Info */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Instagram */}
                    <a 
                      href={`https://instagram.com/${member.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-2.5 bg-gray-800/50 hover:bg-linear-to-r hover:from-purple-500/20 hover:to-pink-500/20 border border-gray-700 hover:border-pink-500/50 rounded-lg transition-all duration-300 group/link"
                    >
                      <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-white text-sm font-medium transition-colors">
                        {member.instagram}
                      </span>
                    </a>

                    {/* Email */}
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 px-4 py-2.5 bg-gray-800/50 hover:bg-orange-500/10 border border-gray-700 hover:border-orange-500/50 rounded-lg transition-all duration-300 group/link"
                    >
                      <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-gray-300 group-hover/link:text-white text-sm font-medium transition-colors">
                        {member.email}
                      </span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Decorative Line on Hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl">
            <h3 className="text-2xl font-black text-white mb-3">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-400 mb-6 max-w-xl">
              We're always looking for passionate individuals to help grow the BattleCore community.
            </p>
            <button className="px-8 py-3 bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20">
              Get In Touch
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
