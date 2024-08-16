import { useMenuItems } from "./hooks/useMenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const { menuItems: Menuitems } = useMenuItems();
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect ?? ""}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
