import { useState } from "react";

type GuideItem = {
  title: string;
  issue: string;
  likes: number;
  dislikes: number;
};

const useGuideItems = () => {
  const [guideItems] = useState<GuideItem[]>([
    {
      title: "How to startup the computer",
      issue: "Computer not starting",
      likes: 100,
      dislikes: 5,
    },
    {
      title: "Fixing WIFI issues",
      issue: "Wi-Fi connectivity issues",
      likes: 75,
      dislikes: 12,
    },
    {
      title: "How to fix Installion Errors in Mac",
      issue: "Software installation errors",
      likes: 150,
      dislikes: 7,
    },
    {
      title: "Fixing slow system startup",
      issue: "Slow system performance",
      likes: 90,
      dislikes: 10,
    },
  ]);

  return { guideItems };
};

export default useGuideItems;
