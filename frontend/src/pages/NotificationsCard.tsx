import React from "react";

const NotificationsCard: React.FC = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-popover rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <div>
          <p className="font-medium text-left text-primary pb-4">Notifications</p>
          <ul className="space-y-4">
            <li className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <div className="flex justify-between items-center">
                <p className="text-md font-medium text-gray-700 dark:text-gray-300">
                  Payment for DIIMUN 2025 is pending.
                </p>
                <span className="text-sm text-red-500 dark:text-red-300">
                  Urgent
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Complete your payment by <strong className="text-destructive">Dec 20, 2024</strong>.
              </p>
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              <div className="flex justify-between items-center">
                <p className="text-md font-medium text-gray-700 dark:text-gray-300">
                  Registration for DIIMUN 2026 is now open!
                </p>
                <span className="text-sm text-green-500 dark:text-green-300">
                  Info
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Sign up early to secure your spot.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationsCard;
