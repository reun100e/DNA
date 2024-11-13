import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const CTA = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10 text-center">
      <Button className="p-6 text-xl">
        <a onClick={() => navigate("/register")}>Register for DIIMUN 2025</a>
      </Button>
    </div>
  );
};

