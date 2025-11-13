"use client";

import { useEffect, useState } from "react";
import { loadState } from "../../../../../../utils/localstorage";
import Api from "../../../../../../services/fetchApi";

const api = new Api();

export default function CartHistoryPage() {
  const [allCarts, setAllCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const phone = loadState("phone");
    const token = loadState("token");

    if (phone && token) triggerUserApi(phone);
    else setLoading(false);
  }, []);

  const triggerUserApi = async (phone) => {
    setLoading(true);
    try {
      const res = await api.CartByPhone({ phone });
      if (res.status === 200) setAllCart(res.data);
    } catch (err) {
      console.error("❌ API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (orderId) => {
    window.open(`/api/invoice/${orderId}`, "_blank");
  };


  // Filters logic
  const filteredCarts = allCarts
    .filter((item) =>
      activeTab === "all" ? true : item.package?.type === activeTab
    )
    .filter((item) => {
      const query = search.toLowerCase();
      return (
        item.package?.productTitle?.toLowerCase().includes(query) ||
        item.user_details?.name?.toLowerCase().includes(query) ||
        item.package?.location?.toLowerCase().includes(query)
      );
    })
    .filter((item) => {
      if (!fromDate && !toDate) return true;
      const date = new Date(item.package?.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      if (from && date < from) return false;
      if (to && date > to) return false;
      return true;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0 text-center">
          🛕 My Puja & Chadhava History
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-full shadow-sm">
          {[
            { key: "all", label: "📜 All" },
            { key: "puja", label: "🪔 Puja" },
            { key: "chadhava", label: "🎁 Chadhava" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab.key
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="🔍 Search by name, title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex gap-2 items-center">
          <label className="text-sm text-gray-600">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm"
          />
          <label className="text-sm text-gray-600">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm"
          />
          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
            }}
            className="text-xs text-indigo-600 underline"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64 text-gray-500 text-lg animate-pulse">
          ⏳ Loading your orders...
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCarts?.length === 0 && (
        <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
          No {activeTab === "all" ? "order" : activeTab} records found.
        </div>
      )}

      {/* Cards */}
      {!loading && filteredCarts?.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCarts.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedOrder(item)}
              className="bg-white cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
            >
              <div
                className={`h-2 ${item.package?.type === "puja"
                    ? "bg-yellow-400"
                    : "bg-purple-500"
                  }`}
              />
              <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-gray-800 text-sm">
                    Order #{item.id}
                  </h2>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${item.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {item.paymentStatus}
                  </span>
                </div>

                <div className="flex gap-3 mb-3">
                  <img
                    src={item.package?.productImg}
                    alt={item.package?.productTitle}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-2">
                      {item.package?.productTitle}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      📍 {item.package?.location}
                    </p>
                    <p className="text-xs text-gray-500">
                      🕉️ {item.package?.tithi}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-700 font-semibold">
                  💰 ₹{item.grandTotal} | {item.paymentMethod?.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-[#0000008a] bg-opacity-5 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative animate-fadeIn p-6 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              🧾 Order #{selectedOrder.id} Details
            </h2>

            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Type:</strong> {selectedOrder.package?.type}</p>
              <p><strong>Title:</strong> {selectedOrder.package?.productTitle}</p>
              <p><strong>Location:</strong> {selectedOrder.package?.location}</p>
              <p><strong>Tithi:</strong> {selectedOrder.package?.tithi}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.package?.date).toLocaleString("en-IN")}</p>
              <p><strong>Payment:</strong> ₹{selectedOrder.grandTotal} ({selectedOrder.paymentMethod})</p>
              <p><strong>Status:</strong> {selectedOrder.paymentStatus}</p>
              <p><strong>Customer:</strong> {selectedOrder.user_details?.name} ({selectedOrder.user_details?.gotra})</p>
              <p><strong>Phone:</strong> {selectedOrder.user_details?.whatsapp}</p>
            </div>

            {selectedOrder.add_ons?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Add-ons:</h4>
                <ul className="text-sm list-disc pl-5 text-gray-700">
                  {selectedOrder.add_ons.map((addon) => (
                    <li key={addon.id}>
                      {addon.name} — ₹{addon.price} × {addon.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 🧾 Download Invoice Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() =>handleDownload(selectedOrder?.id)}
                className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                ⬇️ Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
