import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testData = [
  {
    title: "TMT Test",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
    oldPrice: "₹3500",
    newPrice: "₹1109",
    description:
      "A TMT test, also known as the treadmill test is an important health test conducted to evaluate heart function...",
    features: [
      "High-performance treadmill machines",
      "Read-to-assist support staff",
    ],
  },
  {
    title: "PFT Tests",
    image: "https://images.unsplash.com/photo-1588776814546-d0370c659fad?w=400",
    oldPrice: "₹2000",
    newPrice: "₹630",
    description:
      "Pulmonary function tests or PFT tests are non-invasive diagnostic tests used to evaluate lung function...",
    features: ["Quick & painless procedure", "100% non-invasive"],
  },
  {
    title: "DEXA Scan",
    image: "https://images.unsplash.com/photo-1588776814655-92455d3a2e20?w=400",
    oldPrice: "₹1500",
    newPrice: "₹789",
    description:
      "A DEXA scan is a bone density test that is painless, non-invasive, and determines bone mineral density...",
    features: [
      "High-resolution image quality for accurate diagnosis",
      "100% non-invasive",
    ],
  },
];

const HealthScansSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-cyan-700 mb-8">
        Health Scans & Imaging Tests
      </h2>

      <div className="relative flex justify-center items-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 bg-orange-500 text-white rounded-full p-2"
        >
          <ChevronLeft />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500">
          {testData.slice(currentIndex, currentIndex + 1).map((test, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border shadow-md flex flex-col h-full bg-white"
            >
              <img src={test.image} alt={test.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                <p className="text-cyan-600 font-bold text-lg">
                  Starting @ <span className="line-through text-gray-500 mr-2">{test.oldPrice}</span>{test.newPrice}
                </p>
                <p className="text-sm text-gray-600 mt-2">{test.description}</p>
                <div className="mt-4 border-t pt-4 bg-sky-50 p-4 rounded-lg">
                  <button className="bg-orange-400 text-white text-sm px-4 py-1 rounded-full mb-3">
                    Salient Features
                  </button>
                  <ul className="text-left text-sm text-gray-700 list-disc pl-4">
                    {test.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 bg-orange-500 text-white rounded-full p-2"
        >
          <ChevronRight />
        </button>
      </div>

      <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-lg">
        View All ➤
      </button>
    </div>
  );
};

export default HealthScansSection;
