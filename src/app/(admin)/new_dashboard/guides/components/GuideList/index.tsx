import { Grid, Typography } from "@mui/material";
import GuideCard from "../GuideCard";
import { Guide } from "@/api/types/Guide";
import { ClientResponse } from "@/api/base.client";

type Props = {
  guideItems: ClientResponse<Guide[]> | undefined;
};

const GuideList = ({ guideItems }: Props) => {
  if (!guideItems) {
    return (
      <Grid item xs={12}>
        <Typography>Loading...</Typography>
      </Grid>
    );
  }

  if ("error" in guideItems) {
    return (
      <Grid item xs={12}>
        <Typography color="error">
          Error: {guideItems.message} (Status Code: {guideItems.statusCode})
        </Typography>
      </Grid>
    );
  }

  const guides = guideItems.data;

  return (
    <Grid container spacing={2}>
      {guides.length > 0 ? (
        guides.map((guide) => (
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
