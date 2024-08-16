import { Box, Drawer } from "@mui/material";
import { Sidebar, Logo } from "react-mui-sidebar";
import SidebarItems from "./SidebarItems";

interface ItemType {
  isSidebarOpen: boolean;
}

const DashboardSidebar = ({ isSidebarOpen }: ItemType) => {
  const sidebarWidth = "270px";

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  return (
    <Box
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar*/}
      {/* ------------------------------------------- */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="permanent"
        PaperProps={{
          sx: {
            boxSizing: "border-box",
            ...scrollbarStyles,
          },
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar Box */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Sidebar
            width={"270px"}
            collapsewidth="80px"
            open={isSidebarOpen}
            themeColor="#5d87ff"
            themeSecondaryColor="#49beff"
            showProfile={false}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Logo img="/logo.png" />
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Box>
          </Sidebar>
        </Box>
      </Drawer>
    </Box>
  );
};
export default DashboardSidebar;
