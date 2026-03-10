import React from "react";

const DoctorAddaLanding = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Stats Section */}
      <section className="md:py-16 py-2 bg-[#006aa4]">
        <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%]   mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center   justify-between text-center text-white gap-2">
            {[
              { number: "1000+", label: "Expert Doctors" },
              { number: "50,000+", label: "Happy Patients" },
              { number: "25+", label: "Specializations" },
              { number: "99.9%", label: "Ontime" },
            ].map((stat, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-base sm:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorAddaLanding;
