import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";

const RefundAndCancellation = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className=" bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto  px-6 py-18">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-2 text-justify">
              <div className="flex mt-9 items-center mb-8">
                <FileText className="h-8 w-8 text-green-600 mr-3" />
                <h1 className="text-3xl  font-bold text-[#0B63F6]">
                  Refund And Cancellation Policy
                </h1>
              </div>

              <div className="prose prose-lg max-w-none">
                {/* <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-8">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-green-800 font-semibold">
                        Effective Date: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div> */}

                <section className="mb-8">
                  <p className="text-gray-700 mb-4">
                    At Doctor’s Adda , we maintain a strict no-refund policy
                    under any circumstances. We strongly encourage all
                    participants to thoroughly review and understand our terms
                    and conditions before completing their registration. By
                    registering, you acknowledge and agree to abide by these
                    policies. Please make an informed decision, as once the
                    payment is made, no refunds will be processed.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundAndCancellation;
