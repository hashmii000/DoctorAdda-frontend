/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import AmbulanceCard from "../components/AmbulanceCard";
import { getRequest } from "../Helpers";
import AmbulanceBanner from "../components/AmbulanceBanner";
import { Skeleton, Card, Pagination } from "antd";

const AmbulancePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ radius: "8000" });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        setLoading(true);

        const res = await getRequest(
          `ambulance?radius=${location?.radius}&page=${currentPage}&limit=${pageSize}`
        );

        setAmbulanceData(res?.data?.data?.ambulances || []);
        setTotalRecords(res?.data?.data?.totalAmbulances || 0);
        setPageSize(res?.data?.data?.limit || 10); // if API sends back limit
      } catch (error) {
        console.error("Error fetching ambulances:", error);
        setAmbulanceData([]);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAmbulances();
  }, [location?.radius, currentPage, pageSize]);

  const filteredData = ambulanceData.filter((ambulance) => {
    const matchesSearch =
      ambulance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ambulance.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      ambulance.ambulanceType.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <AmbulanceBanner />

      <div className="sm:w-full lg:w-[80%] xl:w-[80%] 2xl:w-[70%] mx-auto px-4 py-8">
        {/* Search & Filter */}
        {/* ... your search + filter UI remains same ... */}

        {/* Ambulance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="rounded-2xl shadow-md">
                <Skeleton active avatar paragraph={{ rows: 3 }} />
              </Card>
            ))
          ) : filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AmbulanceCard {...data} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No ambulances found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalRecords > pageSize && (
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalRecords}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AmbulancePage;
