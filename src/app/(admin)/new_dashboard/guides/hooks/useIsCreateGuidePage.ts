import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useIsCreateGuidePage = () => {
  const pathname = usePathname();

  const [IsCreateGuidePage, setIsCreateGuidePage] = useState(false);

  useEffect(() => {
    setIsCreateGuidePage(pathname === "/new_dashboard/guides/create");
  }, [IsCreateGuidePage, pathname]);
  return IsCreateGuidePage;
};
