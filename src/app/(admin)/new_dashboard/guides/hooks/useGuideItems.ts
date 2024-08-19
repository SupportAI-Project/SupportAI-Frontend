import { useEffect, useState } from "react";
import { Guide } from "../types";
import { GuidesClient } from "@/api/guides.client";

export const useGuideItems = () => {
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const client = new GuidesClient();
        const response = await client.getGuides();
        if ("data" in response) {
          setGuides(response.data);
        } else {
          throw new Error(response.error || "An unknown error occurred");
        }
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };

    fetchGuides();
  }, []);

  return { guides };
};
