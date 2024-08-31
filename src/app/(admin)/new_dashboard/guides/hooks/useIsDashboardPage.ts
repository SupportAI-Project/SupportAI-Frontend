import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useIsDashboardPage = () => {
  const pathname = usePathname();

  const [isDashboardPage, setIsDashboardPage] = useState(false);

  useEffect(() => {
    setIsDashboardPage(pathname === "/new_dashboard");
    console.log(isDashboardPage, "isDashboardPage");
  }, [isDashboardPage,pathname]);
  return isDashboardPage;
};
