import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Phone, MapPin, Upload, Shield, Users, Award, DollarSign, TrendingUp } from 'lucide-react';

const MedicalHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    patientName: '',
    mobile: '',
    location: 'Gurgaon',
    prescription: null
  });

  const slides = [
    {
      id: 1,
      title: "Advanced & Affordable MRI Testing",
      originalPrice: "₹8,000",
      discountedPrice: "₹2,000",
      image: "/api/placeholder/400/300",
      features: [
        { icon: Shield, text: "State of the Art MRI Scanners" },
        { icon: Award, text: "100% covid safe" },
        { icon: Users, text: "Highly experienced 130+ radiology specialists" },
        { icon: TrendingUp, text: "State of the art radiology labs across India" }
      ],
      benefits: [
        { icon: DollarSign, text: "100% Cash Back", color: "bg-green-500" },
        { icon: TrendingUp, text: "100% Tax Benefit", color: "bg-yellow-500" }
      ]
    },
    {
      id: 2,
      title: "Comprehensive Health Screening",
      originalPrice: "₹12,000",
      discountedPrice: "₹3,500",
      image: "/api/placeholder/400/300",
      features: [
        { icon: Shield, text: "Advanced Imaging Technology" },
        { icon: Award, text: "Certified Radiologists" },
        { icon: Users, text: "24/7 Customer Support" },
        { icon: TrendingUp, text: "Quick Report Delivery" }
      ],
      benefits: [
        { icon: DollarSign, text: "Insurance Covered", color: "bg-blue-500" },
        { icon: TrendingUp, text: "Home Sample Collection", color: "bg-purple-500" }
      ]
    },
    {
      id: 3,
      title: "Premium Diagnostic Package",
      originalPrice: "₹15,000",
      discountedPrice: "₹4,999",
      image: "/api/placeholder/400/300",
      features: [
        { icon: Shield, text: "Latest 3T MRI Technology" },
        { icon: Award, text: "NABL Accredited Labs" },
        { icon: Users, text: "Expert Consultation Included" },
        { icon: TrendingUp, text: "Digital Reports Available" }
      ],
      benefits: [
        { icon: DollarSign, text: "Free Follow-up", color: "bg-red-500" },
        { icon: TrendingUp, text: "Priority Booking", color: "bg-indigo-500" }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      prescription: file
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Callback request submitted successfully!');
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
          
          {/* Left Content */}
          <div className="lg:w-1/2 text-white mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {currentSlideData.title}
            </h1>
            
            <div className="text-2xl md:text-3xl mb-8">
              <span className="text-yellow-300">Starting @ </span>
              <span className="line-through text-gray-300 text-xl mr-2">
                {currentSlideData.originalPrice}
              </span>
              <span className="text-yellow-300 font-bold">
                {currentSlideData.discountedPrice}
              </span>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentSlideData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="bg-yellow-400 p-2 rounded-full">
                    <feature.icon className="w-5 h-5 text-teal-900" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-8">
              {currentSlideData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className={`${benefit.color} p-1 rounded-full`}>
                    <benefit.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={prevSlide}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 flex flex-col items-center">
            {/* MRI Image */}
            <div className="mb-8 relative">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-white rounded-full shadow-2xl overflow-hidden">
                <img
                  src={currentSlideData.image}
                  alt="MRI Scanner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-teal-900 px-4 py-2 rounded-full font-bold text-sm">
                Advanced MRI
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Get a call back
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="patientName"
                    placeholder="Enter Patient Name"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your Mobile No*"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none"
                  >
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Upload Prescription
                  </label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                  </div>
                  {formData.prescription && (
                    <p className="text-sm text-green-600">
                      File uploaded: {formData.prescription.name}
                    </p>
                  )}
                </div>

                <div className="text-xs text-gray-500 text-center">
                  You hereby affirm & authorize HealthKart to process the personal data as per the{' '}
                  <a href="#" className="text-teal-600 hover:underline">T&C</a>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHeroSection;