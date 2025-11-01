"use client";
import { CheckCircle2 } from "lucide-react";

const BookingTracker = ({ bookingId, type, pujaDate, currentStep = 1, paymentStatus }) => {

  const steps = [
    { id: 1, label: "Booking Confirmed" },
    { id: 2, label: "Puja Scheduled" },
    { id: 3, label: "Puja Completed" },
    { id: 4, label: "Video Shared" },
  ];

  return (
    <div className="max-w-full mx-auto bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      {/* Header */}
      <div className="text-left mb-6">
        <h2 className="text-2xl text-center font-semibold text-yellow-600">
           {`Your ${type === 'puja' ? "Puja" : "Chadhava" } Booking is Confirmed!`}
        </h2>
         <div className="flex justify-between my-2">
            {bookingId && <span className="font-semibold text-orange-500">{`Booking ID: #${bookingId}`}</span>}
            {paymentStatus && <spen className="font-semibold text-green-500">Payment status: {paymentStatus}</spen>}
        </div>
        {type === "puja" && <span className="text-orange-500">{`Your Puja will be Performed on: ${pujaDate}`}</span>}
        {type === "chadhava" && <span className="text-orange-500">{`Your Chadhava will be Offered on: ${pujaDate}`}</span>}
       
       {type === "puja" ? <div>
         <span className="text-orange-500">
          Puja Video will be shared on WhatsApp within <b>3–4 days</b> of completion.
        </span>
       </div> : 
       <div>
         <span className="text-orange-500">
          Chadhava Video will be Shared on WhatsApp within <b>3–4 days</b> of Offering Completion
        </span>
       </div>
       
       }
      </div>

      {/* Tracker */}
      <div className="relative flex items-center justify-between mt-10">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 -z-10"></div>

        {/* Active progress */}
        <div
          className="absolute top-1/2 left-0 h-[3px] bg-green-500 -z-10 transition-all duration-500"
          style={{
            width: `${(currentStep - 1) * (100 / (steps.length - 1))}%`,
          }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex flex-col items-center w-1/4">
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full border-4 flex items-center justify-center 
                ${
                  step.id <= currentStep
                    ? "border-green-500 bg-green-100 text-green-600"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
            >
              {step.id <= currentStep ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>

            {/* Step label below circle */}
            <p
              className={`text-sm mt-3 font-medium text-center ${
                step.id <= currentStep ? "text-green-600" : "text-gray-500"
              }`}
            >
              {step.label}
            </p>

            {/* Text between circles */}
            {/* {index < steps.length - 1 && (
              <div className="absolute top-1/2 right-[-12.5%] w-1/2 text-xs text-gray-500 text-center translate-y-[-50%]">
                <p className="whitespace-nowrap">
                  {steps[index + 1].label.split(" ")[1]}
                </p>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingTracker;