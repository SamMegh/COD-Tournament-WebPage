function ContactPage() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-orange-500/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-bold uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 mt-2">
            Contact <span className="bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Have questions about tournaments or want to join our team? We'll get back to you within 24-48 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Side - Contact Form */}
          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                  Subject <span className="text-orange-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="tournament">Tournament Inquiry</option>
                  <option value="join-team">Join Our Team</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-xl text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side - Info */}
          <div className="space-y-8">
            
            {/* Response Time Notice */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Response Time</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We typically respond to all inquiries within 24-48 hours. For urgent matters, please reach out to us directly on Discord.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {/* Email */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email Us</p>
                    <a href="mailto:contact@battlecore.com" className="text-white font-semibold hover:text-orange-400 transition-colors">
                      contact@battlecore.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Discord */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Join Our Server</p>
                    <a href="#" className="text-white font-semibold hover:text-orange-400 transition-colors">
                      discord.gg/battlecore
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Follow Us</p>
                    <a href="#" className="text-white font-semibold hover:text-orange-400 transition-colors">
                      @battlecore_esports
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">Office Hours</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-white">Closed</span>
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactPage;
