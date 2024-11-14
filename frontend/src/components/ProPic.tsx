import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

interface ProPicProps {
  size?: string; // Optional size prop (e.g., "h-12 w-12", "h-16 w-16")
}

// Forwarding ref for ProPic
export const ProPic = React.forwardRef<HTMLDivElement, ProPicProps>(
  ({ size = "h-10 w-10" }, ref) => {
    const { user, baseUrl } = useAuth();

    return (
      <Avatar ref={ref} className={`${size}`}>
        <AvatarImage
          // src={`${baseUrl}${user?.profile_picture}`}
          alt="User Avatar"
          className="h-full w-full object-cover"
        />
        <AvatarFallback className="h-full w-full flex items-center justify-center text-xl">
          {(user?.first_name?.[0] ?? "") + (user?.last_name?.[0] ?? "")}
        </AvatarFallback>
      </Avatar>
    );
  }
);

// Set displayName for debugging purposes
ProPic.displayName = "ProPic";
