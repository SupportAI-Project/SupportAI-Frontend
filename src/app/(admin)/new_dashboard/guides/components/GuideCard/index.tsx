import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
} from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import { useTheme } from "@mui/material/styles";
import { Guide } from "@/api/types/Guide";

type Props = {
  guide: Guide;
};

const GuideCard = ({ guide }: Props) => {
  const theme = useTheme();
  const totalStars =
    guide.reviews?.reduce((acc, review) => acc + review.rating, 0) ?? 0;
  const avgRating = totalStars / (guide.reviews?.length ?? 1);

  return (
    <Card sx={{ minHeight: 230, display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box display="grid" alignItems="center" mb={1}>
          <Box display="flex" alignItems="center">
            <SupportIcon
              color="primary"
              sx={{ marginRight: theme.spacing(1) }}
            />
            <Typography variant="h6">{guide.title}</Typography>
          </Box>
          <Typography variant="body2" color="text.primary" mb={2} mt={1} ml={1}>
            Created by <b>{guide.creator?.username}</b> at{" "}
            {new Date(guide.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Box display="flex" flexWrap="wrap" mb={2}>
          {guide.categories.map((category) => (
            <Chip
              key={category}
              label={category}
              size="small"
              sx={{ margin: theme.spacing(0.5) }}
            />
          ))}
        </Box>

        <Box display="flex" alignItems="center" mt="auto">
          <Rating
            value={avgRating}
            precision={0.5}
            readOnly
            sx={{ color: "gold" }}
          />
          <Typography variant="body2" mx={1}>
            ({guide.reviews?.length ?? 0})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
