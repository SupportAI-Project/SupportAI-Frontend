import { Card, CardContent, Typography, Box, Rating } from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import { useTheme } from "@mui/material/styles";
import { Guide } from "@/api/types/Guide";

type Props = {
  guide: Guide;
};

const GuideCard = ({ guide }: Props) => {
  const theme = useTheme();
  const totalStars = guide.reviews?.reduce((acc, review) => acc + review.rating, 0);
  const avgRating = (totalStars ?? 0) / (guide.reviews?.length ?? 1);
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <SupportIcon color="primary" sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="h6">{guide.title}</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Created by : {guide.creator?.username}
        </Typography>
        <Rating
                value={avgRating}
                precision={0.5}
                readOnly
              />
        <Typography variant="body2" color="textSecondary" mb={2}>
          Created at: {new Date(guide.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
