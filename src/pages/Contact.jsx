import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: (
        <div className="flex flex-col">
          <span>support@doctoradda.com</span>
          <span>info@doctoradda.com</span>
        </div>
      ),
      description: "Send us an email anytime!",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+91 9450180033",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      content: "Vani Elite Homes Laulai Chinhat, LUCKNOW",
      description:
        "H NO 39-B Block B Vani Elite Homes Laulai Chinhat LUCKNOW UP 226028 IND",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl mt-10 font-bold mb-4 text-[#0B63F6]">
            Let's Connect
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from
            you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="p-8 rounded-3xl bg-gray-100 shadow-lg">
              <h2 className="text-3xl font-bold text-[#0B63F6] mb-8 flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-[#0B63F6]" />
                Get in Touch
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-[#0B63F6] text-white">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{info.title}</h3>
                        <p className="text-gray-800 font-medium">
                          {info.content}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[#0B63F6]/10 rounded-2xl border border-[#0B63F6]/20">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#0B63F6]" />
                  <h3 className="text-lg font-semibold text-[#0B63F6]">
                    Business Hours
                  </h3>
                </div>
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="p-8 rounded-3xl bg-gray-100 shadow-lg">
              <h2 className="text-3xl font-bold text-[#0B63F6] mb-8 flex items-center gap-3">
                <Send className="w-8 h-8 text-[#0B63F6]" />
                Send Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#0B63F6] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B63F6]"
                      placeholder="Subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B63F6] resize-none"
                      placeholder="Tell us about your project..."
                      required
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-[#0B63F6] hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-[#0B63F6]/10 rounded-2xl p-8 border border-[#0B63F6]/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[#0B63F6] mb-4">
              Ready to start your project?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of satisfied clients who have trusted us with their
              projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#0B63F6] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-transform transform hover:scale-105">
                Schedule a Call
              </button>
              <button className="border border-[#0B63F6] text-[#0B63F6] px-6 py-3 rounded-lg hover:bg-[#0B63F6]/10 transition-transform transform hover:scale-105">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
