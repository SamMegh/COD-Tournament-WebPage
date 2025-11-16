   import { useEffect, useRef } from 'react';

function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Particle animation for background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const containerRef = canvasRef.current;
    if (!containerRef || !ctx) return;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    containerRef.appendChild(canvas);

    canvas.width = containerRef.offsetWidth;
    canvas.height = containerRef.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(249, 115, 22, 0.3)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (containerRef && canvas.parentNode) {
        containerRef.removeChild(canvas);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div ref={canvasRef} className="absolute inset-0 z-0"></div>

      {/* Background Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-950 to-black z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-orange-950/20 to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl z-0"></div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 min-h-screen items-center py-20">
          
          {/* Left Side - Branding & Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-orange-400 text-sm font-semibold tracking-wider">SEASON 2024 • LIVE NOW</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                DOMINATE THE
                <span className="block bg-linear-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent mt-2">
                  BATTLEGROUND
                </span>
              </h1>
              
              <div className="h-1 w-24 bg-linear-to-r from-orange-500 to-red-600 mx-auto lg:mx-0"></div>
            </div>

            {/* Sub-heading */}
            <p className="text-xl sm:text-2xl text-gray-300 max-w-xl font-light leading-relaxed">
              Join the ultimate <span className="text-orange-400 font-semibold">Call of Duty Mobile</span> Battle Royale tournament. 
              Compete with elite players for glory and massive rewards.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 py-6 max-w-xl">
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white">$10K+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Prize Pool</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Players</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl font-bold text-white">48H</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Duration</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="group relative px-8 py-4 overflow-hidden rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-red-600 transition-transform duration-300 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-white flex items-center justify-center gap-2">
                  Register Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button className="group px-8 py-4 border-2 border-gray-700 hover:border-orange-500 rounded-lg font-bold text-lg text-white transition-all duration-300 hover:bg-orange-500/10">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Watch Trailer
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Official Tournament</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure Platform</span>
              </div>
            </div>
          </div>

          {/* Right Side - Tournament Info Cards */}
          <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Glowing Background Effects */}
            <div className="absolute inset-0 bg-linear-to-t from-orange-600/20 via-transparent to-transparent blur-3xl"></div>
            
            {/* Main Content Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Animated Background Circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[500px] h-[500px] bg-linear-to-br from-orange-500/20 via-red-500/10 to-orange-600/20 rounded-full blur-3xl animate-spin-slow"></div>
                <div className="absolute w-[400px] h-[400px] bg-linear-to-tl from-red-600/15 via-orange-500/10 to-yellow-500/15 rounded-full blur-2xl animate-spin-reverse"></div>
              </div>

              {/* Tournament Info Cards Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-6 max-w-lg">
                
                {/* Prize Pool Card */}
                <div className="group col-span-2 bg-gray-900/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-8 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-orange-400 text-sm font-semibold tracking-wider uppercase">Total Prize Pool</div>
                    <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-5xl font-black text-white mb-2">$10,000+</div>
                  <div className="text-gray-400 text-sm">In cash and rewards</div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 flex-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-linear-to-r from-orange-500 to-red-600 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-400">75% Claimed</span>
                  </div>
                </div>

                {/* Players Registered */}
                <div className="group bg-gray-900/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 hover:border-orange-400 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-xs text-gray-400 mt-1">Players Registered</div>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>

                {/* Tournament Duration */}
                <div className="group bg-gray-900/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 hover:border-orange-400 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">48H</div>
                  <div className="text-xs text-gray-400 mt-1">Tournament Duration</div>
                  <div className="mt-2 text-xs text-cyan-400">Starting Soon</div>
                </div>

                {/* Matches Scheduled */}
                <div className="group bg-gray-900/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 hover:border-orange-400 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">24</div>
                  <div className="text-xs text-gray-400 mt-1">Matches Scheduled</div>
                  <div className="mt-2 text-xs text-purple-400">Round Robin</div>
                </div>

                {/* Top Players */}
                <div className="group bg-gray-900/80 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6 hover:border-orange-400 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-linear-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">50</div>
                  <div className="text-xs text-gray-400 mt-1">Pro Players</div>
                  <div className="mt-2 text-xs text-yellow-400">Legends Tier</div>
                </div>

              </div>

              {/* Floating Elements */}
              <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                <div className="absolute top-10 left-10 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]"></div>
                <div className="absolute bottom-10 right-10 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.8)]"></div>
              </div>
              
              <div className="absolute inset-0 animate-spin-reverse pointer-events-none" style={{animationDuration: '30s'}}>
                <div className="absolute top-1/4 right-20 w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
                <div className="absolute bottom-1/4 left-20 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-950 to-transparent z-10"></div>
    </section>
  );
}

export default HeroSection;
   