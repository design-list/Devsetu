"use client";
import { useState } from "react";
import Api from "../../../../../services/fetchApi";
const api = new Api();

const MobileLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      // ✅ Ensure +91 prefix for Twilio (E.164 format)
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

      // ✅ Await API response
      const res = await api.SendMobileOtp({ phone: formattedPhone });

      if (res?.success) {
        setStep(2);
        setMessage("OTP sent successfully ✅");
      } else {
        setMessage("Error: " + (res?.error || "Failed to send OTP"));
      }
    } catch (err) {
      console.error("Send OTP Error:", err);
      setMessage("Something went wrong ❌");
    }
  };

  const verifyOtp = async () => {
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

      // ✅ Include OTP payload too
      const res = await api.VerifyMobileOtp({ phone: formattedPhone, otp });

      if (res?.success) {
        setMessage("Login successful 🎉");
      } else {
        setMessage("Invalid OTP ❌");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 mb-6 p-6 border rounded-lg shadow-md">
      {step === 1 && (
        <>
          <h2 className="text-xl font-semibold mb-3">Mobile Login</h2>
          <input
            type="text"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          />
          <button
            onClick={sendOtp}
            className="bg-yellow-600 text-white px-4 py-2 rounded w-full"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-xl font-semibold mb-3">Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full rounded mb-3"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Verify OTP
          </button>
        </>
      )}

      <p className="text-sm text-gray-600 mt-3">{message}</p>
    </div>
  );
};

export default MobileLogin;
