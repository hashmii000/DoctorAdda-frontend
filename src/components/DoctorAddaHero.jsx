
import React, { useState, useEffect } from 'react';

const DoctorAddaHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Expert Medical Care",
      description: "Experienced doctors ready to help you 24/7"
    },
    {
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Comprehensive Healthcare",
      description: "Complete medical solutions under one roof"
    },
    {
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      title: "Advanced Technology",
      description: "State-of-the-art medical equipment and facilities"
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Patient-Centered Care",
      description: "Personalized treatment plans for every patient"
    }
  ];

  const specialties = [
    { value: '', label: 'All Specialties' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'gynecology', label: 'Gynecology' }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (direction) => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() || specialty) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        alert(`Searching for: ${searchTerm} ${specialty ? 'in ' + specialty : ''}`);
      }, 1000);
    }
  };

  const styles = {
    heroSection: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #007BBD 0%, #005A8C 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      zIndex: 1
    },
    floatingShapes: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 2
    },
    shape: {
      position: 'absolute',
      opacity: 0.1,
      background: '#fff',
      animation: 'float 20s infinite linear'
    },
    shape1: {
      top: '10%',
      left: '10%',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      animationDelay: '0s'
    },
    shape2: {
      top: '20%',
      right: '10%',
      width: '60px',
      height: '60px',
      transform: 'rotate(45deg)',
      animationDelay: '5s'
    },
    shape3: {
      bottom: '20%',
      left: '20%',
      width: '100px',
      height: '100px',
      borderRadius: '20px',
      animationDelay: '10s'
    },
    shape4: {
      bottom: '30%',
      right: '20%',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      animationDelay: '15s'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      position: 'relative',
      zIndex: 3
    },
    heroContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '50px',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '80px 0'
    },
    heroText: {
      color: 'white',
      animation: 'slideInLeft 1s ease-out'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 700,
      marginBottom: '20px',
      lineHeight: 1.2,
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    },
    highlight: {
      color: 'white',
      position: 'relative',
      borderBottom: '3px solid white',
      paddingBottom: '5px'
    },
    heroDescription: {
      fontSize: '1.3rem',
      marginBottom: '30px',
      opacity: 0.9,
      lineHeight: 1.6
    },
    searchContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      marginBottom: '30px',
      backdropFilter: 'blur(10px)',
      animation: 'slideInUp 1s ease-out 0.3s both'
    },
    searchForm: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap'
    },
    searchInput: {
      flex: 1,
      minWidth: '200px',
      padding: '15px',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      color: 'black'
    },
    searchInputFocus: {
      borderColor: '#007BBD',
      boxShadow: '0 0 0 3px rgba(0, 123, 189, 0.1)'
    },
    searchBtn: {
      padding: '15px 30px',
      background: '#007BBD',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap'
    },
    ctaBtn: {
      padding: '15px 30px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center',
      minWidth: '160px'
    },
    ctaPrimary: {
      background: 'white',
      color: '#007BBD'
    },
    ctaSecondary: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white'
    },
    heroCarousel: {
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
      animation: 'slideInRight 1s ease-out 0.2s both'
    },
    carouselContainer: {
      position: 'relative',
      height: '500px',
      overflow: 'hidden'
    },
    carouselSlide: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      transition: 'opacity 1s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    carouselSlideActive: {
      opacity: 1
    },
    carouselImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    carouselOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
      color: 'white',
      padding: '30px',
      textAlign: 'center'
    },
    carouselOverlayTitle: {
      fontSize: '1.5rem',
      marginBottom: '10px'
    },
    carouselOverlayDescription: {
      fontSize: '1rem',
      opacity: 0.9
    },
    carouselIndicators: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '10px'
    },
    indicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.5)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    indicatorActive: {
      background: 'white',
      transform: 'scale(1.2)'
    },
    carouselNav: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      padding: '15px',
      cursor: 'pointer',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)'
    },
    carouselNavPrev: {
      left: '20px'
    },
    carouselNavNext: {
      right: '20px'
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      heroContent: {
        gridTemplateColumns: '1fr',
        gap: '30px',
        textAlign: 'center',
        padding: '40px 0'
      },
      heroTitle: {
        fontSize: '2.5rem'
      },
      heroDescription: {
        fontSize: '1.1rem'
      },
      searchForm: {
        flexDirection: 'column'
      },
      searchInput: {
        minWidth: '100%'
      },
      carouselContainer: {
        height: '300px'
      }
    }
  };

  return (
    <div>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); }
            50% { transform: translateY(-40px) rotate(180deg); }
            75% { transform: translateY(-20px) rotate(270deg); }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @media (max-width: 768px) {
            .hero-content {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
              text-align: center !important;
              padding: 70px 0 !important;
            }
            
            .hero-title {
              font-size: 2.5rem !important;
            }
            
            .hero-description {
              font-size: 1.1rem !important;
            }
            
            .search-form {
              flex-direction: column !important;
            }
            
            .search-input {
              min-width: 100% !important;
            }
            
            .carousel-container {
              height: 300px !important;
            }
            
            .carousel-nav {
              display: none !important;
            }
          }
          
          @media (max-width: 480px) {
            .hero-title {
              font-size: 2rem !important;
            }
            
            .search-container {
              padding: 20px !important;
            }
          }
        `}
      </style>
      
      <section style={styles.heroSection}>
        <div style={styles.overlay}></div>
        
        <div style={styles.floatingShapes}>
          <div style={{...styles.shape, ...styles.shape1}}></div>
          <div style={{...styles.shape, ...styles.shape2}}></div>
          <div style={{...styles.shape, ...styles.shape3}}></div>
          <div style={{...styles.shape, ...styles.shape4}}></div>
        </div>
        
        <div style={styles.container}>
          <div className="hero-content" style={styles.heroContent}>
            <div style={styles.heroText}>
              <h1 className="hero-title" style={styles.heroTitle}>
                Your Health, Our <span style={styles.highlight}>Priority</span>
              </h1>
              <p className="hero-description" style={styles.heroDescription}>
                Connect with qualified doctors instantly. Get expert medical advice, book appointments, and take control of your health journey with Doctor Adda.
              </p>
              
              <div className="search-container" style={styles.searchContainer}>
                <div className="search-form" style={styles.searchForm}>
                  <input
                    type="text"
                    className="search-input"
                    style={styles.searchInput}
                    placeholder="Search doctors, specialties, or symptoms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    className="search-input"
                    style={styles.searchInput}
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  >
                    {specialties.map((spec) => (
                      <option key={spec.value} value={spec.value}>
                        {spec.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    style={{
                      ...styles.searchBtn,
                      background: isSearching ? '#005A8C' : '#007BBD',
                      transform: isSearching ? 'scale(0.95)' : 'scale(1)'
                    }}
                    disabled={isSearching}
                    onClick={handleSearch}
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>
              
              <div style={styles.ctaButtons}>
                <button
                  style={{...styles.ctaBtn, ...styles.ctaPrimary}}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f8f9fa';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 5px 15px rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Book Appointment
                </button>
                <button
                  style={{...styles.ctaBtn, ...styles.ctaSecondary}}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#007BBD';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Download App Now
                </button>
              </div>
            </div>
            
            <div style={styles.heroCarousel}>
              <div className="carousel-container" style={styles.carouselContainer}>
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.carouselSlide,
                      ...(index === currentSlide ? styles.carouselSlideActive : {})
                    }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      style={styles.carouselImage}
                    />
                    <div style={styles.carouselOverlay}>
                      <h3 style={styles.carouselOverlayTitle}>{slide.title}</h3>
                      <p style={styles.carouselOverlayDescription}>{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                className="carousel-nav"
                style={{...styles.carouselNav, ...styles.carouselNavPrev}}
                onClick={() => handleSlideChange('prev')}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ❮
              </button>
              <button
                className="carousel-nav"
                style={{...styles.carouselNav, ...styles.carouselNavNext}}
                onClick={() => handleSlideChange('next')}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ❯
              </button>
              
              <div style={styles.carouselIndicators}>
                {slides.map((_, index) => (
                  <span
                    key={index}
                    style={{
                      ...styles.indicator,
                      ...(index === currentSlide ? styles.indicatorActive : {})
                    }}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorAddaHero;