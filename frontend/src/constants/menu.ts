import {
  HomeTrendUp,
  Profile2User,
  Additem,
  Convert3DCube,
  Icon,
  Message,
  User,
  Setting,
  Setting2,
  Notification,
  TriangleLogo,
  Data2,
  DollarSquare,
} from "iconsax-react";

export const menuItems: MenuItemType = [
  {
    category: "Home",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: HomeTrendUp,
      },
      {
        title: "Products",
        href: "/admin/products",
        icon: Additem,
      },
      {
        title: "Brands",
        href: "/admin/brands",
        icon: TriangleLogo,
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: Data2,
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: Profile2User,
      },
      {
        title: "Orders",
        href: "/admin/orders",
        icon: Convert3DCube,
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        title: "Messages",
        href: "/admin/messages",
        icon: Message,
      },
      {
        title: "Notfications",
        href: "/admin/notifications",
        icon: Notification,
      },
    ],
  },
  {
    category: "Site Management",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Setting2,
      },
      {
        title: "Payment Settings",
        href: "/admin/payments",
        icon: DollarSquare,
      },
    ],
  },
];

export const dropDownMenuItems: DropDownMenuItemType = [
  {
    label: "Profile",
    icon: User,
    url: "/admin/profile",
  },
  {
    label: "Settings",
    icon: Setting,
    url: "/admin/settings",
  },
];

/**
 * Type definitions for the menu items ⬇️⬇️
 */

export type MenuItemType = {
  category: string;
  items: {
    title: string;
    href: string;
    icon: Icon;
  }[];
}[];

export type DropDownMenuItemType = {
  label: string;
  icon: Icon;
  url: string;
}[];
