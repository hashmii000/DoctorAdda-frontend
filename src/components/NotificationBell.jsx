import React, { useState, useRef, useEffect } from "react";
import { Bell, X, ChevronRight } from "lucide-react";
import { getRequest, deleteRequest } from "../Helpers";
import { useSelector } from "react-redux";
// import { getCookieItem } from "../Hooks/cookie";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

const NotificationBell = () => {
  const { userProfileData, isLoggedIn } = useSelector((state) => state.user);
  // const userId = getCookieItem("UserId");
  const userId = useSelector((state) => state?.user?.userProfileData?._id);
  console.log("UserId", userId);

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const bellRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUserNotification = async (pageNum = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getRequest(
        `notifications?UserId=${userId}&page=${pageNum}&limit=${limit}`
      );
      const apiData = response?.data?.data?.notifications || [];
      const formatted = apiData.map((n) => ({
        id: n._id,
        title: n.title,
        message: n.comment,
        time: formatTime(n.createdAt),
      }));

      setNotifications((prev) =>
        pageNum === 1 ? formatted : [...prev, ...formatted]
      );
      setHasMore(apiData.length === limit);
      setTotal(response?.data?.data?.total);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserNotification();
  }, [userId]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 10 && hasMore && !loading) {
      const nextPage = page + 1;
      fetchUserNotification(nextPage);
      setPage(nextPage);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await deleteRequest(`notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  return (
    <div className="relative hidden md:block" ref={bellRef}>
      {/* Bell Button */}
      <button
        className="relative bg-gradient-to-r from-[#007BBD] to-[#005A8C] text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell
          className={`md:w-4 md:h-4 xl:w-6 xl:h-6 ${
            isOpen ? "animate-pulse" : ""
          }`}
        />
        {total > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-[#d50d52] text-white text-xs font-bold rounded-full flex items-center justify-center">
            {total > 99 ? "99+" : total}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden z-100">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 text-lg">
              Notifications
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto" onScroll={handleScroll}>
            {notifications.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="relative px-6 py-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 rounded-lg text-blue-600 bg-blue-50">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium truncate text-gray-900">
                          {n.title}
                        </h4>
                      </div>
                      <p className="text-sm mb-2 text-gray-600">{n.message}</p>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(n.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div className="py-4 flex justify-center items-center text-gray-500">
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                <span className="ml-2 text-sm">Loading...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
