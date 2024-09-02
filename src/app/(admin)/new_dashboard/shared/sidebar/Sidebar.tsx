import { Box, Button, Drawer, Typography } from "@mui/material";
import Image from "next/image";
import SidebarItems from "./SidebarItems";
import Link from "next/link";

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
                width: "260px",
              }}
            >
              <Image src="/logo.png" alt="logo" width={220} height={150} />
            </Box>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{
                  m: 3,
                  p: 3,
                  bgcolor: "primary.light",
                  borderRadius: "8px",
                }}
              >
                <>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ width: "80px" }}
                      fontSize="16px"
                      mb={1}
                    >
                      Empower Guides with AI!
                    </Typography>
                  </Box>
                  <Box mt="-35px">
                    <img
                      width="94"
                      height="94"
                      src="https://img.icons8.com/3d-fluency/94/chatbot.png"
                      alt="chatbot"
                    />
                  </Box>
                </>
              </Box>
            </Box>
          </Drawer>
        </Box>
      </Drawer>
    </Box>
  );
};
export default DashboardSidebar;
