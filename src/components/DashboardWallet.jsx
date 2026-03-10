import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, Clock, User, Phone, Calendar } from "lucide-react";

const DashboardWallet = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // Static demo data; replace with real data source when available
  const currentBalance = 8165;
  const previousBalance = 7340; // For trend calculation
  const balanceChange = currentBalance - previousBalance;
  const changePercentage = ((balanceChange / previousBalance) * 100).toFixed(1);

  const transactions = [
    {
      id: 1,
      name: "Shubhangi Sri",
      gender: "Female",
      phone: "8707050874",
      description: "Pharmacy service fee credited",
      amount: 1825,
      date: "25/08/2025, 10:54:10",
      type: "credit",
    },
    {
      id: 2,
      name: "Vishnu Yadav",
      gender: "Male",
      phone: "9455050871",
      description: "Pharmacy service fee credited",
      amount: 1000,
      date: "23/08/2025, 11:26:12",
      type: "credit",
    },
    {
      id: 3,
      name: "Vikrant Dubey",
      gender: "Male",
      phone: "9455050876",
      description: "Pharmacy service fee credited",
      amount: 375,
      date: "22/08/2025, 17:24:32",
      type: "credit",
    },
  ];

  const formatDate = (dateStr) => {
    const [datePart, timePart] = dateStr.split(", ");
    const [day, month, year] = datePart.split("/");
    const date = new Date(`${year}-${month}-${day}T${timePart}`);
    return {
      date: date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="md:w-[90%] mx-auto py-8  px-4 sm:px-6 lg:px-2 ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h1 className="md:text-2xl text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Wallet Overview
            </h1>
          </div>
          <p className="text-gray-600">
            Manage your earnings and track transactions
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Main Balance Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 bg-white opacity-5 rounded-full"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-300 to-teal-400 bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Balance
                    </p>
                    <p className="text-xs text-blue-200">
                      Available to withdraw
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="md:text-2xl text-xl font-bold mb-2">
                  ₹{currentBalance.toLocaleString("en-IN")}
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-300" />
                  <span className="text-green-300 font-semibold">
                    +₹{balanceChange.toLocaleString("en-IN")}
                  </span>
                  <span className="text-blue-200 text-sm">
                    ({changePercentage}% this month)
                  </span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-br from-teal-500 to-teal-600 bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 rounded-xl py-3 px-4 font-semibold text-sm backdrop-blur-sm border border-white border-opacity-20">
                Withdraw Funds
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    This Month
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{balanceChange.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Transactions
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {transactions.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-2 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Average Transaction
                  </p>
                  <p className="md:text-xl text-base font-bold text-gray-900">
                    ₹
                    {Math.round(
                      transactions.reduce((sum, t) => sum + t.amount, 0) /
                        transactions.length
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">
                    <img
                      width="35"
                      height="35"
                      src="https://img.icons8.com/fluency/48/combo-chart.png"
                      alt="combo-chart"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="md:text-xl text-lg font-bold text-gray-900">
                  Recent Transactions
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Your latest pharmacy service earnings
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                View All
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {transactions.map((transaction, index) => {
              const { date, time } = formatDate(transaction.date);
              return (
                <div
                  key={transaction.id}
                  className="md:px-6 md:py-6 px-2 py-6 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="md:w-12 md:h-12 w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                        <User className="md:w-6 md:h-6 w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="md:text-lg text-base font-semibold text-gray-900">
                            {transaction.name}
                          </p>
                          <div className="flex items-center md:space-x-4 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <User className="w-3 h-3" />
                              <span>{transaction.gender}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Phone className="w-3 h-3" />
                              <span>{transaction.phone}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2 font-medium">
                            {transaction.description}
                          </p>
                          <div className="flex items-center space-x-1 text-xs text-gray-400 mt-2">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {date} at {time}
                            </span>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="flex flex-col items-end ml-4">
                          <div className="md:text-xl font-bold text-green-600">
                            +₹{transaction.amount.toLocaleString("en-IN")}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600 font-medium">
                              Credited
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <button className="w-full text-center py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Load more transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWallet;
