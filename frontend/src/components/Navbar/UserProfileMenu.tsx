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

  return (
    <div className="flex items-center space-x-4">
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

          <a href="/dashboard" className="cursor-pointer">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </a>
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
