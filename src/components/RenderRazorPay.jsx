/* eslint-disable no-dupe-keys */
"use client";
import { useEffect, useRef } from "react";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.log("❌ Razorpay SDK failed to load");
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorPay = ({ orderId, currency, amount, setUpdateStatus, onSuccess, onClose }) => {
  const rzpInstance = useRef(null);

  const displayRazorpay = async () => {
    const sdkLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!sdkLoaded || !window.Razorpay) {
      console.log("❌ Razorpay SDK not available");
      return;
    }

    const options = {
      key: "rzp_test_wHiuJBhFZCkHSf",
      amount,
      currency,
      name: "Doctor adda",
      order_id: orderId,
      handler: (response) => {
        console.log("✅ Payment succeeded", response);

        // Notify parent about success
        setUpdateStatus({ status: "success", ...response });

        if (typeof onSuccess === "function") onSuccess(response);

        // Force close the modal to clean up
        rzpInstance.current?.close();
      },
      ondismiss: () => {
        console.log("🚫 Razorpay modal dismissed");
        if (typeof onClose === "function") onClose();
      },
      theme: { color: "#3399cc" },
    };

    rzpInstance.current = new window.Razorpay(options);

    // Small delay ensures DOM ready
    setTimeout(() => rzpInstance.current?.open(), 50);
  };

  useEffect(() => {
    if (orderId) displayRazorpay();
    // Only cleanup on unmount
    return () => {
      rzpInstance.current?.close();
    };
  }, [orderId]);

  return null;
};

export default RenderRazorPay;
