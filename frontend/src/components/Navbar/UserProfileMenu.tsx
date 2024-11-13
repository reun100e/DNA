import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LightDarkToggle } from "../ui/light-dark-toggle";
import { useAuth } from "@/context/AuthContext";
import { ProPic } from "../ProPic";

const UserProfileMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <a>
            <ProPic />
          </a>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="w-auto">
          <DropdownMenuItem>
            <div onClick={(e) => e.stopPropagation()}>
              Welcome, {user?.first_name}
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <div onClick={() => navigate("/dashboard")} className="cursor-pointer">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </div>
          <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
            Logout
          </DropdownMenuItem>
          <div className="hidden md:block">
            <DropdownMenuItem>
              {/* Prevent dropdown from closing when clicking the toggle */}
              <div onClick={(e) => e.stopPropagation()}>
                <LightDarkToggle />
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfileMenu;
