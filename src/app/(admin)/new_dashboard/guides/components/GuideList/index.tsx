import { Grid, Typography } from "@mui/material";
import GuideCard from "../GuideCard";
import { Guide } from "@/api/types/Guide";
import { ClientResponse, SuccessResponse } from "@/api/base.client";

type Props = {
  guideItems:Guide[];
};

const GuideList = ({ guideItems }: Props) => {
  if (!guideItems) {
    return (
      <Grid item xs={12}>
        <Typography>Loading...</Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {guideItems.length > 0 ? (
        guideItems.map((guide) => (
          <Grid item xs={12} sm={6} md={4} key={guide.guideId}>
            <GuideCard guide={guide} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography>No guides available</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default GuideList;
