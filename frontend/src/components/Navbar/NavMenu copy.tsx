import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const NavMenu = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="/">Home</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/events">Events</NavigationMenuLink>
        <NavigationMenuContent>
          <NavigationMenuLink href="/diimun">DIIMUN</NavigationMenuLink>
          <NavigationMenuLink href="/med-conf">
            Medical Conference
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Workshops</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/workshop/doctor-patient">
            Doctor Patient Communication
          </NavigationMenuLink>
          <NavigationMenuLink href="/workshop/mun">
            MUN Workshop
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/gallery">Gallery</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default NavMenu;
