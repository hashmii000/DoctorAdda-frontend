import React, { useEffect, useState, useFocusEffect, useCallback } from "react";
import DoctorAddaLanding from "../components/DoctorAddaLanding";
import DoctorAddaHero from "../components/DoctorAddaHero";
import DoctorCategoryCards from "../components/DoctorCategoryCards";
import ScrollingNotice from "../components/ScrollingNotice/ScrollingNotice";
import ServicesSection from "../components/ServicesSection";
import FeaturedHospitals from "../components/FeaturedHospitals";
import DownloadAppSection from "../components/DownloadAppSection";
import FeaturedHospitals2 from "../components/FeaturedHospitals2";
import HealthScansSection from "../components/HealthScansSection";
import ServicesSection2 from "../components/ServicesSection2";
import HeroSection from "../components/HeroSection";
import MedicalHeroSection from "../components/MedicalHeroSection";
import BannerSection from "../components/BannerSection";
import TestimonialsSection from "../components/TestimonialsSection";
import HealthBlogSection from "../components/HealthBlogSection";
import AboutUsSection from "../components/AboutUsSection";
import MedicalImagingBanner from "../components/MedicalImagingBanner";
import WhyChooseUs from "../components/WhyChooseUs";
import Carousel from "../components/Carousel";
import HomePageImagePopup from "../components/HomePageImagePopup";
import { getRequest } from "../Helpers";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUserProfile } from "../redux/slices/userSlice";
import { useUpdate } from "../context/updateContext";
import HealthcareRegistrationModal from "../components/PreLaunchForms/HealthcareRegistrationModal";
import { getCookieItem } from "../Hooks/cookie";
import { useLocation } from "react-router-dom";
import DoctorSearch from "../components/DoctorSearch";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { update } = useUpdate();
  const { userProfileData } = useSelector((state) => state.user);
  const userId = userProfileData;
  const token = getCookieItem("Token");
  const UserId = getCookieItem("UserId");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(true);
  console.log("dfgfdg======>", data);
  const fetchUser = async () => {
    if (UserId) {
      try {
        const res = await getRequest(`auth/getUserById/${UserId}`);
        dispatch(updateUserProfile(res?.data?.data));
        dispatch(login({ userData: res?.data?.data }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname, UserId, update]);
  useEffect(() => {
    getRequest(`banner?isPagination=false`)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      
      {!token && open ? (
        <HealthcareRegistrationModal
          setOpen={setOpen}
          onSuccess={() => {
            setOpen(false); // close modal
            fetchUser(); // immediately fetch updated user
          }}
        />
      ) : null}
      {/* <MedicalHeroSection/> */}

      {/* <HomePageImagePopup data={data} /> */}
       <div className="block md:hidden w-full px-4 z-100 pt-20 bg-white ">
                <DoctorSearch />
              </div>

      <BannerSection />


      {/* <ScrollingNotice /> */}

      {/* <ServicesSection /> */}
      <ServicesSection2 />
      {/* <HeroSection/> */}
      <MedicalImagingBanner data={data} />
      <DoctorCategoryCards />
      {/* <DoctorAddaHero/> */}

      {/* <FeaturedHospitals /> */}
      <FeaturedHospitals2 />
      {/* <HealthScansSection/> */}
      <DoctorAddaLanding />
      <WhyChooseUs />
      {/* <Carousel /> */}
      <AboutUsSection />
      {/* <TestimonialsSection/> */}
      <DownloadAppSection />
    </>
  );
};

export default Home;
