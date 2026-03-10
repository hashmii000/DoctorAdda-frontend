<div className="max-w-7xl mx-auto mb-0 pt-36">
      <div className={`relative overflow-hidden  text-white rounded-3xl shadow-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{
        background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
      }}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -left-8 w-16 h-16 bg-cyan-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-4 right-1/4 w-12 h-12 bg-purple-300/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          
          {/* Floating Icons */}
          <div className="absolute top-6 right-16 animate-float">
            <Sparkles className="w-6 h-6 text-yellow-300 opacity-70" />
          </div>
          <div className="absolute bottom-8 left-20 animate-float" style={{ animationDelay: '1.5s' }}>
            <Star className="w-5 h-5 text-pink-300 opacity-60" />
          </div>
        </div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm"></div>
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 transform hover:scale-105 transition-transform duration-300">
                <Smartphone className="w-4 h-4" />
                <span className="text-sm font-medium">New App Available</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <h2 className="text-4xl md:text-4xl  font-bold mb-4 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent leading-tight">
                Your Health,
                
                <span className="">
                  One Tap Away
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full transform scale-x-0 animate-scale-x"></div>
                </span>
              </h2>
              
              <p className="text-white/90 text-lg mb-8 max-w-2xl leading-relaxed">
                Experience healthcare reimagined. Connect with world-class doctors, book instant consultations, 
                and manage your health journey with our award-winning mobile app.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 transform hover:scale-105 hover:bg-white/25 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <feature.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Buttons */}
            <div className="flex flex-col gap-4 min-w-fit">
              <button
                onMouseEnter={() => setHoveredButton('download')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                  <Download className="w-5 h-5" />
                  Download App
                  {hoveredButton === 'download' && (
                    <div className="absolute -right-2 -top-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  )}
                </div>
              </button>
              
              <button
                onMouseEnter={() => setHoveredButton('book')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  Book Now
                  {hoveredButton === 'book' && (
                    <div className="absolute -right-2 -top-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                  )}
                </div>
              </button>
              
              {/* Stats */}
              <div className="flex gap-6 mt-4 text-center">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-white">4.9★</div>
                  <div className="text-xs text-white/70">App Rating</div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-xs text-white/70">Downloads</div>
                </div>
              </div>
            </div>
          </div>

          
          
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-scale-x {
          animation: scale-x 2s ease-in-out 0.5s forwards;
        }
      `}</style>
    </div>