"use client";

import { useEffect, useState } from "react";
import { Search, Download, X } from "lucide-react";
import Api from "../../../../services/fetchApi";
import LazyImage from "@/components/Atom/LazyImage";

const api = new Api();

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null); // for modal

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.GetAllCart().then((res) => {
      if (res.status === 200) {
        setBookingDetails(res.data);
        setFilteredBookings(res.data);
      } else {
        alert(res.error || "Something went wrong");
      }
    });
  };

  // 🔍 Apply filters
  useEffect(() => {
    let filtered = [...bookingDetails];

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.user_details?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (paymentFilter !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.paymentStatus?.toUpperCase() === paymentFilter.toUpperCase()
      );
    }

    if (fromDate && toDate) {
      filtered = filtered.filter((item) => {
        const paidAt = item.paidAt ? new Date(item.paidAt) : null;
        if (!paidAt) return false;
        return paidAt >= new Date(fromDate) && paidAt <= new Date(toDate);
      });
    }

    setFilteredBookings(filtered);
  }, [searchQuery, paymentFilter, fromDate, toDate, bookingDetails]);

  // 📥 Convert JSON to CSV and Download
  const handleDownloadCSV = () => {
    if (!filteredBookings.length) {
      alert("No records to download!");
      return;
    }

    const headers = [
      "Booking ID",
      "Name",
      "Gotra",
      "WhatsApp",
      "members",
      "Payment Status",
      "Grand Total",
      "Package Type",
      "Product Title",
      "Location",
      "Paid At",
      "Add-ons",
    ];

    const rows = filteredBookings.map((item) => {
      const pkg = item.package || {};
      const user = item.user_details || {};
      const addOns = item.add_ons?.map((a) => a.name).join(", ") || "";
      const members = item?.user_details?.members ? JSON.parse(item?.user_details?.members) : [];

      return [
        item.id,
        user.name || "",
        user.gotra || "",
        user.whatsapp || "",
        members || "",
        item.paymentStatus || "",
        item.grandTotal || 0,
        pkg.type || "",
        pkg.productTitle || "",
        pkg.location || "",
        item.paidAt ? new Date(item.paidAt).toLocaleString("en-IN") : "",
        addOns,
      ];
    });

    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booking_data_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-md border border-orange-100 p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <h1 className="text-2xl font-bold text-orange-600">Booking Details</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-orange-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              />
              <Search className="absolute left-3 top-2.5 text-orange-400 w-5 h-5" />
            </div>

            <button
              onClick={handleDownloadCSV}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              <Download size={18} />
              Download CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {["All", "PAID", "PENDING"].map((status) => (
              <button
                key={status}
                onClick={() => setPaymentFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  paymentFilter === status
                    ? status === "PAID"
                      ? "bg-green-600 text-white"
                      : status === "PENDING"
                      ? "bg-red-600 text-white"
                      : "bg-orange-600 text-white"
                    : status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : status === "PENDING"
                    ? "bg-red-100 text-red-700"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <label className="text-sm text-gray-700 font-medium">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border border-orange-200 rounded-lg px-2 py-1 text-gray-700 focus:ring-2 focus:ring-orange-400"
            />
            <label className="text-sm text-gray-700 font-medium">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border border-orange-200 rounded-lg px-2 py-1 text-gray-700 focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Cards */}
        {filteredBookings.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No records found.</p>
        ) : 
        (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredBookings.map((item) => {
              const otherCharges = JSON.parse(item.otherCharges || "{}");
              const pkg = item.package || {};
              const user = item.user_details || {};
              const members = user?.members ? JSON.parse(user.members) : [];

              return (
                <div
                  key={item.id}
                  className="border border-orange-100 bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5"
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-orange-600">
                      Booking #{item.id}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        item.paymentStatus === "PAID"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.paymentStatus}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-center mb-3">
                    {pkg?.productImg && (
                      <div className="w-32 h-24 relative rounded-lg overflow-hidden shadow">
                        <LazyImage
                          src={pkg.productImg}
                          alt={pkg.productTitle}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex-1 text-sm">
                      <p className="font-semibold text-gray-800">
                        {pkg?.productTitle || "No Title"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <strong>Type:</strong> {pkg?.type}
                      </p>
                      <p className="text-xs text-gray-500">
                        <strong>Location:</strong> {pkg?.location} {pkg.tithi}
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-3 mb-3 text-sm text-gray-700">
                    <p>Service Charge: ₹{otherCharges.service_charge}</p>
                    <p>Pandit Charge: ₹{otherCharges.pandit_charge}</p>
                    <p>Media Charge: ₹{otherCharges.media_handling_charge}</p>
                    <p className="font-semibold text-orange-600 mt-1">
                      Total: ₹{item.grandTotal}
                    </p>
                  </div>

                  <div className="text-xs text-gray-700">
                    <p><strong>Name:</strong> {user?.name
                                .trim()
                                .split(" ")
                                .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                ).join("  ")
                                
                            || "N/A"}
                            <strong className="block-inline mx-1">Gotra:</strong> {user?.gotra ? user?.gotra : "Kashyap"}
                        </p>
                    <p>
                    <strong>Members:</strong>{" "}
                    {members.length
                        ? members
                            .map((name) =>
                            name
                                .trim()
                                .split(" ")
                                .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                )
                                .join(", ")
                            )
                            
                        : "N/A"}
                    </p>
                    <p><strong>WhatsApp:</strong> {user?.whatsapp || "N/A"}</p>
                    <p><strong>Paid At:</strong> {item.paidAt ? new Date(item.paidAt).toLocaleString("en-IN") : "Not Paid"}</p>
                  </div>

                  {/* View More Button */}
                  <button
                    onClick={() => setSelectedBooking(item)}
                    className="mt-4 w-32 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    View More Details
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>

            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-orange-600 mb-4">
                Booking #{selectedBooking.id}
              </h2>
              <h2 className={`text-xl font-bold ${selectedBooking.paymentStatus === "PENDING" ? "text-orange-600" : "text-green-600" }  mb-4`}>
                Payment Status:{selectedBooking.paymentStatus}
              </h2>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
                 {selectedBooking?.package?.productImg && (
                    <div className="w-full h-[150px] relative rounded-lg overflow-hidden shadow">
                    <LazyImage
                        src={selectedBooking?.package?.productImg}
                        alt={selectedBooking?.package?.productTitle}
                        width={300}
                        height={150}
                        className="object-cover w-full h-full"
                    />
                    </div>
                )}
                <div className="flex-1 text-sm">
                    <p className="font-semibold text-gray-800">
                      {selectedBooking?.package?.productTitle || "No Title"}
                    </p>
                    { selectedBooking?.package?.type === "puja" &&
                      <p className="text-xs text-gray-500 mt-1">
                        <strong>Selected Package:</strong> {selectedBooking?.package?.name}  <strong> ₹{selectedBooking?.package?.price}</strong>
                      </p>
                    }
                    <p className="text-xs text-gray-500 mt-1">
                    <strong>Type:</strong> {selectedBooking?.package?.type}
                    </p>
                    <p className="text-xs text-gray-500">
                    <strong>Location:</strong> {selectedBooking?.package?.location} {selectedBooking?.package?.tithi}
                    </p>
                </div>
              <p><strong>Grand Total:</strong> ₹{selectedBooking.grandTotal}</p>
              <p><strong>Service Charge:</strong> ₹{JSON.parse(selectedBooking.otherCharges || "{}").service_charge}</p>
              <p><strong>Pandit Charge:</strong> ₹{JSON.parse(selectedBooking.otherCharges || "{}").pandit_charge}</p>
              <p><strong>Razorpay Order ID:</strong> {selectedBooking.razorpayOrderId}</p>
              <p><strong>Razorpay Payment ID:</strong> {selectedBooking.razorpayPaymentId}</p>
              <p><strong>Paid At:</strong> {selectedBooking.paidAt ? new Date(selectedBooking.paidAt).toLocaleString("en-IN") : "Not Paid"}</p>
              <p><strong>Created At:</strong> {new Date(selectedBooking.createdAt).toLocaleString("en-IN")}</p>
              <p><strong>Members:</strong> {selectedBooking.user_details?.members ? JSON.parse(selectedBooking.user_details.members).map((name) =>
                            name
                                .trim()
                                .split(" ")
                                .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                                )
                                .join(", ")
                            )
                        : "N/A"}</p>

              <div className="border-t pt-3 mt-3">
                 { selectedBooking?.package?.type === "puja" &&
                  <p className="text-sm text-gray-800 mt-1">
                    <strong>Selected Package:</strong> {selectedBooking?.package?.name} — <strong> ₹{selectedBooking?.package?.price}</strong>
                  </p>
                }
                <p className="font-semibold text-gray-800">Add-ons:</p>
                {selectedBooking.add_ons?.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedBooking.add_ons.map((a) => (
                      <li key={a.id}>
                        {a.name} — ₹{a.price} × {a.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No add-ons</p>
                )}
                <hr />
                <p><strong>Grand Total:</strong> .₹{selectedBooking?.grandTotal}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
