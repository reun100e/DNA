import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assumes you have a Button component

function NotFound() {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl mt-4">Oops! Page Not Found</p>
      <p className="text-muted-foreground mt-2">
        Sorry, the page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="mt-8">
        <Button
          onClick={goHome}
          className="p-6 text-lg bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90"
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
