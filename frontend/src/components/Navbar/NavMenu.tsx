import * as React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { diimun } from "./constants/diimun";
import { committees } from "./constants/committees";
import { Logo } from "../Logo";
import { useNavigate } from "react-router-dom";

export function NavMenu() {
  const navigate = useNavigate();
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-10">
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => navigate("./")}>
            DNA
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                    onClick={() => navigate("./")}
                  >
                    <Logo />
                    <p className="text-sm leading-tight text-muted-foreground">
                      Connect with medical professionals from all domains around
                      the globe. Explore knowledge-sharing programs and advance
                      your career.
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem className="cursor-pointer" onClick={() => navigate("/about")} title="Doctors Nexus Amity">
                Learn about Doctors Nexus Amity and our mission to bridge
                healthcare and technology for global health impact.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => navigate("./diimun")}>
            DIIMUN
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[1400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
              {diimun.map((component) => (
                <ListItem
                  className="cursor-pointer"
                  key={component.title}
                  title={component.title}
                  onClick={() => navigate(component.link)}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => navigate("./diimun")}>
            Committees
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {committees.map((component) => (
                <ListItem
                  className="cursor-pointer"
                  key={component.title}
                  title={component.title}
                  onClick={() => navigate(component.link)}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger onClick={() => navigate("./gallery")}>
            Gallery
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
