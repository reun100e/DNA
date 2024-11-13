import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-popover rounded-lg w-full max-w-screen-xl mx-auto shadow dark:bg-gray-900 m-4 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col items-center sm:items-stretch">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div
            onClick={() => navigate("./")}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse cursor-pointer"
          >
            <Logo className="w-12 h-12 object-contain" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Doctors Nexus Amity
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <div
                onClick={() => navigate("./about")}
                className="hover:underline me-4 md:me-6 cursor-pointer"
              >
                About
              </div>
            </li>
            <li>
              <div
                onClick={() => navigate("./privacy")}
                className="hover:underline me-4 md:me-6 cursor-pointer"
              >
                Privacy Policy
              </div>
            </li>
            <li>
              <div
                onClick={() => navigate("./terms")}
                className="hover:underline me-4 md:me-6 cursor-pointer"
              >
                Terms and Conditions
              </div>
            </li>
            <li>
              <div
                onClick={() => navigate("./contact")}
                className="hover:underline cursor-pointer"
              >
                Contact
              </div>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span onClick={() => navigate("./")} className="hover:underline cursor-pointer">
            Doctors Nexus Amity™
          </span>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
