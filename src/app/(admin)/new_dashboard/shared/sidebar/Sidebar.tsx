import { Box, Drawer } from "@mui/material";
import Image from "next/image";
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
      backgroundColor: "paper",
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
          <Drawer
            open={isSidebarOpen}
            variant="permanent"
            PaperProps={{
              sx: {
                boxSizing: "border-box",
                ...scrollbarStyles,
                width: "270px",
                backgroundColor: "paper",
              },
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                width: "270px",
              }}
            >
              <Image src="/logo.png" alt="logo" width={220} height={150} />
            </Box>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Box>
          </Drawer>
        </Box>
      </Drawer>
    </Box>
  );
};
export default DashboardSidebar;
