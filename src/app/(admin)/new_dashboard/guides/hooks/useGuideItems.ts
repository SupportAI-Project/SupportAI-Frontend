import { useState } from "react";
import { Guide } from "../types";

export const useGuideItems = () => {
  const [guideItems] = useState<Guide[]>([
    {
      id: 1,
      title: "How to startup the computer",
      issue: "Computer not starting",
      likes: 100,
      dislikes: 5,
    },
    {
      id: 2,
      title: "Fixing WIFI issues",
      issue: "Wi-Fi connectivity issues",
      likes: 75,
      dislikes: 12,
    },
    {
      id: 3,
      title: "How to fix Installion Errors in Mac",
      issue: "Software installation errors",
      likes: 150,
      dislikes: 7,
    },
    {
      id: 4,
      title: "Fixing slow system startup",
      issue: "Slow system performance",
      likes: 90,
      dislikes: 10,
    },
  ]);

  return { guideItems };
};
