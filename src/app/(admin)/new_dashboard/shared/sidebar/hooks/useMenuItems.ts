import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { uniqueId } from "lodash";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { AuthClient } from "@/api/auth.client";
import { useRouter } from "next/navigation";
import CreateIcon from "@mui/icons-material/Create";

const authClient = new AuthClient();

export const useMenuItems = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.logout();
    router.push("/login");
  };

  const menuItems = [
    {
      navlabel: true,
      subheader: "Home",
    },
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: DashboardIcon,
      href: "/new_dashboard",
    },
    {
      navlabel: true,
      subheader: "Support",
    },
    {
      id: uniqueId(),
      title: "Guides",
      icon: AutoStoriesIcon,
      href: "/new_dashboard/guides",
    },
    {
      id: uniqueId(),
      title: "Create Guide",
      icon: CreateIcon,
      href: "/new_dashboard/guides/create",
    },
    {
      navlabel: true,
      subheader: "Auth",
    },
    {
      id: uniqueId(),
      title: "Logout",
      icon: LogoutIcon,
      onClick: handleLogout,
      href: "#",
    },
    {
      id: uniqueId(),
      title: "Manage Accounts",
      icon: ManageAccountsIcon,
      href: "#",
    },
  ];

  return { menuItems };
};
