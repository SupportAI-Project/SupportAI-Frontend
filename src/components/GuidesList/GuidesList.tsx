import React, { useEffect, useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { Guide } from "@/types";
import { useRouter } from "next/router";
import axios from "axios";

const colorLightGray = "#f5f5f5";
const colorWhite = "#ffffff";

const GuideList: React.FC = ({}) => {
  const router = useRouter();
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/guide`,
          { withCredentials: true }
        );
        const guideData = response.data;
        console.log(guideData);

        setGuides(guideData);
      } catch (error) {
        console.error("Error fetching the guides:", error);
      }
    };

    fetchGuide();
  }, []);

  const handleClick = (guide: Guide) => {
    router.push({
      pathname: "/guideView",
      query: {
        id: guide.guideId,
      },
    });
    console.log(`Clicked guide: ${guide.title}`);
  };

  return (
    <div>
      <List className="p-0">
        {guides.map((guide, index) => (
          <ListItem
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? colorLightGray : colorWhite,
            }}
            button
            onClick={() => handleClick(guide)}
          >
            <ListItemAvatar>
              <Avatar>
                <InfoIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">{guide.title}</Typography>}
              secondary={
                <Typography variant="body2">{guide.creationDate}</Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GuideList;
