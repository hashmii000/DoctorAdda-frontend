import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PricingAndShippingPolicy = () => {
  const navigation = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg font-sans text-gray-800 py-42 ">
      <section className="text-justify">
        <h2 className="text-3xl  font-bold text-[#0B63F6] mb-4  inline-block pb-1 hover:text-[#0B63F6]">
          Shipping / Delivery Policy
        </h2>
        {/* Intro */}
        <p className="mb-6 text-gray-700 leading-relaxed text-lg">
          At <span className="font-semibold text-green-700">Doctors Adda</span>,
          we are committed to delivering your orders promptly and safely. Please
          review our shipping and delivery policy below:
        </p>

        {/* Policy List */}
        <ul className="space-y-6 text-gray-700 text-base">
          <li>
            <span className="font-semibold text-gray-900">
              Processing Time:
            </span>{" "}
            Orders are processed within <strong>1–2 business days</strong>{" "}
            (excluding weekends and holidays). You will receive a confirmation
            email with tracking information once your order ships.
          </li>

          <li>
            <span className="font-semibold text-gray-900">
              Shipping Rates & Methods:
            </span>{" "}
            We offer a variety of shipping options, including standard and
            expedited services. Shipping rates are calculated based on the
            weight of your order and the destination. You can view the shipping
            options and rates during the checkout process.
          </li>

          <li>
            <span className="font-semibold text-gray-900">
              Domestic Shipping:
            </span>{" "}
            We currently offer shipping within the City. Estimated delivery
            times for standard shipping are <strong>1–2 business days</strong>.
          </li>

          <li>
            <span className="font-semibold text-gray-900">Order Tracking:</span>{" "}
            Once your order has been shipped, you will receive an email with the
            tracking number and a link to track your package's progress. Please
            allow up to <strong>24 hours</strong> for the tracking information
            to update.
          </li>

          <li>
            <span className="font-semibold text-gray-900">
              Address Accuracy:
            </span>{" "}
            Please ensure that your shipping address is accurate and complete.
            We are not responsible for orders shipped to incorrect or incomplete
            addresses provided by the customer. Any additional shipping charges
            incurred due to incorrect addresses will be the customer's
            responsibility
          </li>

          <li>
            <span className="font-semibold text-gray-900">
              Lost or Stolen Packages:
            </span>{" "}
            We are not responsible for lost or stolen packages. If you believe
            your package has been lost or stolen, please contact the shipping
            carrier directly to file a claim. We recommend checking with
            neighbours or your local postal service for assistance.
          </li>

          <li>
            <span className="font-semibold text-gray-900">
              Returns & Refunds:
            </span>{" "}
            For information on returns and refunds, please refer to our{" "}
            <span
              className="text-green-600 underline cursor-pointer"
              onClick={() => navigation("/refund")}
            >
              Return Policy
            </span>{" "}
            for details.
          </li>

          <li>
            <span className="font-semibold text-gray-900"> Contact Us:</span> If
            you have any questions about your order or our shipping policy,
            please contact our customer service team at{" "}
            <span className="font-semibold text-green-700"> 9450180033</span>.
          </li>

          <li>
            <span className="font-semibold text-gray-900">Policy Updates:</span>{" "}
            We reserve the right to update or modify our shipping policy at any
            time without prior notice. Any changes will be reflected on this
            page.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PricingAndShippingPolicy;
