"use client";
import { Check, ChevronRight } from "lucide-react";

export default function BreadcrumbSteps({ currentStep = 2 }) {
  const steps = [
    { id: 1, label: "Add Details" },
    { id: 2, label: "Add More Offering" },
    { id: 3, label: "Review Cart" },
    { id: 4, label: "Make Payment" },
  ];

  return (
    <div className="flex items-center justify-start flex-nowrap overflow-x-auto md:overflow-visible gap-2 md:space-x-2 md:p-3 scrollbar-hide">

      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center space-x-2">
            {/* Step Icon */}
            {step.id < currentStep ? (
              <div className="md:w-6 w-3 md:h-6 h-3 flex items-center justify-center rounded-full bg-green-600 text-white text-sm">
                <Check size={12} />
              </div>
            ) : (
              <div
                className={`w-4 md:w-6 h-4 md:h-6 flex items-center justify-center rounded-full border-1 md:border-2 ${
                  step.id === currentStep
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-400"
                } text-xs md:text-sm font-medium`}
              >
                {step.id}
              </div>
            )}

            {/* Step Label */}
            <span
              className={`text-xs md:text-sm font-medium whitespace-nowrap ${
                step.id === currentStep
                  ? "text-blue-600"
                  : step.id < currentStep
                  ? "text-gray-700"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Arrow Divider */}
          {index < steps.length - 1 && (
            <ChevronRight
              size={18}
              className="mx-2 text-gray-400 shrink-0"
            />
          )}
        </div>
      ))}
    </div>
  );
}
