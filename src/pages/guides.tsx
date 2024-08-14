import React, { useEffect } from "react";
import { GuidesList, Sidebar } from "@/components";
import { Guide } from "@/types";
import axios from "axios";

const Home: React.FC = () => {
  return (
    <div id="wrapper" className="d-flex">
      <Sidebar />
      <div
        style={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <GuidesList />
      </div>
    </div>
  );
};

export default Home;
