"use client";

//src/app/[locale]/main/login/page.js

import { useState } from "react";
import Api from "../../../../../services/fetchApi";
import { saveState } from "../../../../../utils/localstorage";
import { useRouter } from "next/navigation";
const api = new Api();

export default function MobileLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");


  const router = useRouter();


  const sendOtp = async () => {
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

      const res = await api.SendMobileOtp({ phoneNumber: formattedPhone });

    if (res?.success && res.status === 200 ) {
        setMessage("OTP sent successfully ✅");
        setStep(2);
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

      const res = await api.VerifyMobileOtp({ phone: formattedPhone, otp });

      if (res?.success && res.status === 200) {
        saveState("usertoken", res.token)
        setPhone("");
        setOtp("")
        setStep("");
        setMessage("")
        router.push("/en")
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
      <h2 className="text-xl font-bold mb-4">Whats'app Number</h2>

      {step === 1 && (
        <>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            className="border p-2 w-full mb-2"
          />
          <button onClick={sendOtp} className="bg-green-600 text-white px-4 py-2 rounded">
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2 w-full mb-2"
          />
          <button onClick={verifyOtp} className="bg-blue-600 text-white px-4 py-2 rounded">
            Verify OTP
          </button>
        </>
      )}

      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
