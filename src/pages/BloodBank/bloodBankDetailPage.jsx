/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Star,
  StarHalf,
  PhoneCall,
  BadgeCheck,
  Mail,
  PlusCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getRequest } from "../../Helpers";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const BloodBankDetailPage = () => {
  const userId = useSelector((state) => state?.user?.userProfileData?._id);
  const { id } = useParams();

  const [bloodBank, setBloodBank] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBloodBankDetails = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`diagnostics/${id}`);
      setBloodBank(res?.data?.data);
      setReviews(res?.data?.data?.reviews || []);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to load details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBloodBankDetails();
  }, [id]);

  const email = bloodBank?.email;

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + (r?.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : 0;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      if (rating >= i + 1) {
        return (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (rating >= i + 0.5) {
        return <StarHalf key={i} className="w-4 h-4 text-yellow-400" />;
      } else {
        return <Star key={i} className="w-4 h-4 text-gray-300" />;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-100 pt-30">
      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-6 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Image */}
        <div className="md:col-span-2">
          <img
            src={
              bloodBank?.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3011/3011270.png"
            }
            alt={bloodBank?.name}
            className="w-full h-80 object-contain rounded-2xl shadow-md"
          />
        </div>

        {/* Right Info Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
          <div>
            {/* Name & Verified */}
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {bloodBank?.name}
              <BadgeCheck className="w-5 h-5 text-green-500" />
            </h1>

            {/* Address */}
            <p className="text-gray-500 mt-1">{bloodBank?.address}</p>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{renderStars(averageRating)}</div>
                <span className="text-sm text-gray-600">
                  {averageRating} ({reviews.length} reviews)
                </span>
              </div>
            )}

            {/* Timings */}
            <div className="mt-4">
              <span className="inline-block bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                Open - {bloodBank?.storeTiming}
              </span>
            </div>

            {/* Contact Info */}
            <div className="mt-4 space-y-2 text-gray-700 text-sm">
              {bloodBank?.phone && (
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  {bloodBank.phone}
                </p>
              )}
              {bloodBank?.address && (
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-600" />
                  {bloodBank.address}
                </p>
              )}
            </div>
          </div>

          {/* Call Button */}
          <a
            href={bloodBank?.phone ? `tel:${bloodBank.phone}` : "#"}
            className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-center font-semibold hover:opacity-90 transition"
          >
            Call Now
          </a>
        </div>
      </div>

      {/* Features Section (like 4 badges in screenshot) */}
      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <span className="text-green-500 font-bold">100% Genuine</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <span className="text-blue-500 font-bold">Express Service</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <span className="text-purple-500 font-bold">24/7 Available</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <span className="text-orange-500 font-bold">Licensed</span>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-1 h-8 bg-red-600 rounded-full"></div>
          About {bloodBank?.name}
        </h2>
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          {loading ? (
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-gray-700">
              {bloodBank?.description || "No description available."}
            </p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-1 h-8 bg-red-600 rounded-full"></div>
          What People Say
        </h2>

        <div className="space-y-6">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-300"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={
                      review?.user?.profilepic ||
                      "https://ui-avatars.com/api/?name=Anonymous&background=random"
                    }
                    alt={review?.user?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-red-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {review?.user?.name}
                    </h4>
                    <div className="flex text-yellow-400 my-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-600 italic">"{review?.comment}"</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* CTA / Notice Section */}
      <div className="relative py-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800"></div>
        <div className="relative max-w-3xl mx-auto px-6 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Want to get in touch with the Blood Bank?
          </h2>
          <p className="text-lg mb-8 text-red-100">
            For more information or immediate assistance, call us now.
          </p>
          <a
            href={bloodBank?.phone ? `tel:${bloodBank.phone}` : "#"}
            className="group bg-white text-red-600 px-10 py-4 rounded-full hover:bg-red-700 hover:text-white transition-all duration-300 font-bold text-lg flex items-center gap-3 justify-center shadow-lg"
          >
            <PhoneCall className="w-6 h-6 group-hover:animate-pulse" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default BloodBankDetailPage;
