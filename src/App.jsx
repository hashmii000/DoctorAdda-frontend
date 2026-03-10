/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Pages
import Home from "./pages/Home";
import Verification from "./pages/Verification";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import LoginSignupFlow from "./pages/LoginSignupFlow";
import UserDetails from "./pages/UserDetails";
import AmbulancePage from "./pages/AmbulancePage";
import PharmacyPage from "./pages/PharmacyPage";
import DiagnosticPage from "./pages/DiagnosticPage";
import DoctorPage from "./pages/DoctorPage";
import HospitalPage from "./pages/HospitalPage";
import AmbulanceDetailPage from "./pages/AmbulanceDetailPage";
import PharmacyDetailPage from "./pages/PharmacyDetailPage";
import DiagnosticDetailPage from "./pages/DiagnosticDetailPage";
import HospitalDetailPage from "./pages/HospitalDetailPage";
import DoctorList from "./pages/DoctorList";
import DoctorDetailPage from "./pages/DoctorDetailPage";
import AppointmentFlow from "./components/AppointmentFlow";
import About from "./pages/About";
import UserProfile from "./components/UserProfile";
import ManagePatients from "./components/ManagePatients";
import ManagePets from "./components/ManagePets";
import AppointmentSelection from "./components/AppointmentSelection";
import DoctorAppointmentsPage from "./components/DoctorAppointmentsPage";
import PopularSearch from "./components/PopularSearch";
import UpgradeProfile from "./pages/UpgradeProfile";
import AllRegistration from "./components/AllRegistration";
import HospitalRegistration from "./components/HospitalRegistration";
import PharmacyRegistration from "./components/PharmacyRegistration";
import DiagonsticRegistration from "./components/DiagonsticRegistration";
import DoctorsRegistration from "./components/DoctorsRegistration";
import AmbulanceRegistration from "./components/AmbulanceRegistration";
import Dashboard from "./components/Dashboard";
import PharmacyProfile from "./pages/PharmacyProfile";
import HospitalDashboard from "./components/HospitalDashboard";
import DiagnosticDashboard from "./components/DiagnosticDashboard";
import AmbulanceDashboard from "./components/AmbulanceDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import RefundAndCancellation from "./pages/RefundAndCancellation";
import PricingAndShippingPolicy from "./pages/PricingAndShippingPolicy";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Location from "./pages/Location";
import BloodBankListing from "./pages/BloodBank/BloodBankListing";
import BloodBankDetailPage from "./pages/BloodBank/bloodBankDetailPage";
import ManageAddresses from "./components/ManageAddresses";
import DiagnosticAppointmentsPage from "./components/DiagnosticAppointmentsPage";
import HospitalAppointments from "./components/HospitalAppointments";
import VerifyPayment from "./components/VerifyPayment";
import PharmacyOrder from "./pages/Pharmacy/pharmacyOrder";
import PharmacyOrders from "./pages/pharmacyOrders/pharmacyOrders";

function App() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [user, setUser] = useState(null);

  // Load cookie globally on every refresh
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch {
        setUser(userCookie); // fallback if not JSON
      }
    }
  }, []);

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
          success: { duration: 3000, style: { background: "#10B981" } },
          error: { duration: 4000, style: { background: "#EF4444" } },
        }}
      />

      {/* Navbar always visible, gets cookie user */}
      <Navbar user={user} />

      <Routes>
        {/* Standalone routes */}
        <Route path="/location" element={<Location />} />
        <Route path="/flow" element={<AppointmentFlow />} />
        <Route path="/pharmacy-dashboard" element={<Dashboard />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/diagnostic-dashboard" element={<DiagnosticDashboard />} />
        <Route path="/ambulance-dashboard" element={<AmbulanceDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/pharmacy-profile" element={<PharmacyProfile />} />

        {/* Main public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<VerifyPayment />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/manage-patients" element={<ManagePatients />} />
        <Route path="/manageAddresses" element={<ManageAddresses />} />
        <Route path="/pets" element={<ManagePets />} />
        <Route path="/login" element={<LoginSignupFlow />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/appointments" element={<AppointmentSelection />} />
        <Route path="/orders" element={<PharmacyOrders />} />
        <Route
          path="/doctor-appointments"
          element={<DoctorAppointmentsPage />}
        />
        <Route
          path="/diagnostic-appointments"
          element={<DiagnosticAppointmentsPage />}
        />
        <Route
          path="/hospital-appointments"
          element={<HospitalAppointments />}
        />
        <Route path="/upgrade-profile" element={<UpgradeProfile />} />
        <Route path="/all-registration" element={<AllRegistration />} />
        <Route
          path="/hospital-registration"
          element={<HospitalRegistration />}
        />
        <Route
          path="/pharmacy-registration"
          element={<PharmacyRegistration />}
        />
        <Route
          path="/diagonstics-registration"
          element={<DiagonsticRegistration />}
        />
        <Route path="/doctors-registration" element={<DoctorsRegistration />} />
        <Route
          path="/ambulance-registration"
          element={<AmbulanceRegistration />}
        />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundAndCancellation />} />
        <Route path="/price-policy" element={<PricingAndShippingPolicy />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/bloodbank" element={<BloodBankListing />} />
        <Route path="/bloodbank/:id" element={<BloodBankDetailPage />} />
        <Route path="/ambulance" element={<AmbulancePage />} />
        <Route path="/popular" element={<PopularSearch />} />
        <Route path="/ambulance/:id" element={<AmbulanceDetailPage />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />
        <Route path="/pharmacy/:id" element={<PharmacyDetailPage />} />
        <Route path="/diagnostic" element={<DiagnosticPage />} />
        <Route path="/diagnostic/:id" element={<DiagnosticDetailPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/doctorlist/:id" element={<DoctorList />} />
        <Route path="/doctordetail/:id" element={<DoctorDetailPage />} />
        <Route path="/hospital" element={<HospitalPage />} />
        <Route path="/hospital/:id" element={<HospitalDetailPage />} />
        <Route path="/hospitaldetail/:id" element={<HospitalDetailPage />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;
