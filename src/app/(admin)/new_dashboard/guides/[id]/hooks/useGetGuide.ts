import { useEffect, useState } from "react";
import { Guide } from "../../types";
import { GuidesClient } from "@/api/guides.client";

export const useGetGuide = (id: string) => {
  const [guide, setGuide] = useState<Guide | null>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const client = new GuidesClient();
        const response = await client.getGuideById(id); // Pass the ID here
        if ("data" in response) {
          setGuide(response.data);
        } else {
          throw new Error(response.error || "An unknown error occurred");
        }
      } catch (error) {
        console.error("Error fetching guide:", error);
      }
    };

    if (id) {
      fetchGuide();
    }
  }, [id]);

  return { guide };
};
