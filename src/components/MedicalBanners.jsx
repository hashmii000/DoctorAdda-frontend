import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, Zap, MessageCircle } from 'lucide-react';

export default function MedicalBanners() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-4">
      {/* First Banner - Imaging Services */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white min-h-[200px]">
        {/* Background Elements */}
        <div className="absolute left-0 top-0 w-80 h-full bg-gradient-to-r from-cyan-200/20 to-transparent">
          <div className="p-6 space-y-4">
            <div className="bg-white/20 rounded-lg p-3 w-48">
              <div className="bg-white/30 rounded h-3 w-32 mb-2"></div>
              <div className="bg-white/20 rounded h-2 w-24"></div>
            </div>
            <div className="bg-yellow-300/30 rounded-lg p-3 w-40">
              <div className="bg-yellow-200/40 rounded h-2 w-20"></div>
            </div>
            <div className="bg-white/15 rounded-lg p-2 w-36">
              <div className="bg-white/25 rounded h-2 w-16"></div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-between h-full px-20 py-8">
          <div className="flex-1 max-w-md">
            <h2 className="text-3xl font-bold mb-6 leading-tight">
              Your one-stop destination for affordable & reliable imaging services
            </h2>
            
            <div className="flex items-center gap-8 mb-6">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-lg p-2">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Highly experienced</div>
                  <div className="text-sm opacity-90">130+ radiology specialists</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-white/20 rounded-lg p-2">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">State-of-the-art</div>
                  <div className="text-sm opacity-90">radiology labs across India</div>
                </div>
              </div>
            </div>

            <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30">
              Explore Now
            </button>
          </div>

          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center relative">
              <div className="w-32 h-40 bg-white/20 rounded-lg flex items-center justify-center relative">
                <div className="absolute top-2 left-2 w-28 h-36 bg-gray-800/50 rounded grid grid-cols-4 gap-1 p-2">
                  {Array.from({length: 16}).map((_, i) => (
                    <div key={i} className="bg-gray-600/70 rounded-sm"></div>
                  ))}
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-12 bg-gradient-to-br from-blue-300 to-blue-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Banner - Online Consultation */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-300 to-orange-200 min-h-[200px]">
        {/* Background Elements */}
        <div className="absolute left-0 top-0 w-80 h-full">
          <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl m-6 flex items-center justify-center relative">
            <div className="w-32 h-40 bg-white/80 rounded-lg flex items-center justify-center relative shadow-lg">
              <div className="absolute top-2 left-2 w-28 h-36 bg-gray-700 rounded grid grid-cols-4 gap-1 p-2">
                {Array.from({length: 16}).map((_, i) => (
                  <div key={i} className="bg-gray-500 rounded-sm"></div>
                ))}
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <div className="w-8 h-12 bg-gradient-to-br from-orange-300 to-orange-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors">
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-between h-full px-20 py-8">
          <div className="flex-1 max-w-md ml-32">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
              Online Doctors & Diet Consultation from the comfort of your home
            </h2>
            
            <div className="mb-6">
              <span className="bg-red-400 text-white font-semibold px-6 py-2 rounded-full text-sm">
                Doctor Consultation starts from ₹129
              </span>
            </div>

            <button className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book an Appointment
            </button>
          </div>

          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center relative">
              <div className="w-32 h-40 bg-white/90 rounded-lg flex items-center justify-center relative shadow-lg">
                <div className="w-24 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative">
                  <div className="w-16 h-24 bg-gradient-to-br from-blue-300 to-blue-400 rounded"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side teal section */}
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-teal-400 to-teal-300">
          <div className="p-8 h-full flex flex-col justify-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              You got Tested.<br />Don't Stop Here.
            </h3>
            <p className="text-sm opacity-90 mb-6">
              Wellness a routine. Get daily health tips on our WhatsApp channel.
            </p>
            <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/30 flex items-center gap-2 w-fit">
              <MessageCircle className="w-4 h-4" />
              Follow Us Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}