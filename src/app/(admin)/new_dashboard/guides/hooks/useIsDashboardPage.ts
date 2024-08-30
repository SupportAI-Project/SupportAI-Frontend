import { usePathname } from "next/navigation";

export const useIsDashboardPage = () => {
  const pathname = usePathname();
  return pathname === "/new_dashboard"; // TODO: change "new_dashboard" name when we have a landing page
};
