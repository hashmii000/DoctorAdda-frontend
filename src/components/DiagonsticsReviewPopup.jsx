/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { postRequest } from "../Helpers/index";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCookieItem } from "../Hooks/cookie";

const DiagonsticsReviewPopup = ({
  open,
  onClose,
  id,
  onReviewAdded,
  setUpdateStatus,
  entityType,
}) => {
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // console.log("error=====",error);

  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { userProfileData } = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const UserId = getCookieItem("UserId");
  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("You must be logged in to submit a review.");
      setError("You must be logged in to submit a review.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    // if (!userProfileData?.authToken) {
    //   const msg = "You must be logged in to submit a review.";
    //   toast.error(msg);
    //   setError(msg);
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 1000);
    //   return;
    // }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await postRequest({
        url: `${entityType}/${id}/review`,
        cred: { rating, comment },
      });
      const data = res.data;
      console.log("data in review popup", data);

      if (data.success) {
        setUpdateStatus((prev) => !prev);
        setSuccessMessage(true);
        setComment("");
        setRating(5);
        toast.success(data?.message || "Review added successfully");
        if (onReviewAdded) onReviewAdded(data.data);

        setTimeout(() => {
          setSuccessMessage(false);
          onClose();
        }, 1500);
      } else {
        setError(data?.message);
        console.log("gfereg", data?.message);
      }
    } catch (error) {
      console.log("error=========", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-sm md:w-md  relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          disabled={loading}
        >
          &times;
        </button>
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-gray-900">
          Add Your Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block mb-2 text-base  md:text-lg font-medium text-gray-700">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={28}
                  className={`cursor-pointer transition-transform ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label
              className="block mb-1 text-base md:text-lg font-medium text-gray-700"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-blue-300 rounded-lg px-4 py-2 text-sm 
             focus:outline-none focus:border-blue-300 focus:ring-0"
              rows={4}
              placeholder="Write your review..."
              required
              disabled={loading}
            />
          </div>

          {/* Response message above button */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {successMessage && (
            <div className="text-green-600 text-sm">{successMessage}</div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiagonsticsReviewPopup;
