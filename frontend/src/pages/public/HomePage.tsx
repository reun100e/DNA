import { Hero } from "@/components/Hero/Hero";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@mui/material";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (isAuthenticated && user && !user.is_email_verified) {
      timeout = setTimeout(() => {
        setShowEmailDialog(true);
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isAuthenticated, user]);

  return (
    <div className="pt-16">
      <Hero />

      {/* Email Verification Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="lg:max-w-screen">
          <DialogHeader>
            <DialogTitle>Email Verification Needed</DialogTitle>
            <DialogDescription>
              Please verify your email address to continue.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" onClick={() => setShowEmailDialog(false)}>
                <div onClick={() => navigate("/verify")}>Verify</div>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
