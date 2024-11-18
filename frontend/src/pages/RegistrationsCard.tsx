import React from "react";
import CTA from "@/components/CTA";

const RegistrationsCard: React.FC = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-popover rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <div>
          <p className="font-medium text-left text-primary pb-4">Registrations</p>
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md hover:scale-105 transition-transform duration-200">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                DIIMUN Chapter 2025
              </p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300">
                Payment Pending
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Complete your payment to confirm your registration.
            </p>
            <div className="mt-2">
              <CTA />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationsCard;
