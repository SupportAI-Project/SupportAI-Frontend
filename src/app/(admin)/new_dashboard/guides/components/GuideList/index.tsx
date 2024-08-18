import { Grid } from "@mui/material";
import { Guide } from "../../types";
import GuideCard from "../GuideCard";

type Props = {
  guides: Guide[];
};

const GuideList = ({ guides }: Props) => (
  <Grid container spacing={2}>
    {guides.map((guide, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <GuideCard guide={guide} />
      </Grid>
    ))}
  </Grid>
);

export default GuideList;
