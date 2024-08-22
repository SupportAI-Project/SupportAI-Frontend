import { Grid, Typography } from "@mui/material";
import GuideCard from "../GuideCard";
import { Guide } from "@/api/types/Guide";
import { useRouter } from "next/navigation";

type Props = {
  guideItems: Guide[];
};

const GuideList = ({ guideItems }: Props) => {
  const router = useRouter();

  const handleCardClick = (guideId: number) => {
    router.push(`guides/${guideId}`);
  };

  return (
    <Grid container spacing={2}>
      {guideItems.length > 0 ? (
        guideItems.map((guide) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={guide.id}
            onClick={() => handleCardClick(guide.id)}
            style={{ cursor: "pointer" }}
          >
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
