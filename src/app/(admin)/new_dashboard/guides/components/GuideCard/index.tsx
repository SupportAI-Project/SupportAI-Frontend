import { Card, CardContent, Typography, Box } from "@mui/material";
import SupportIcon from "@mui/icons-material/Support";
import { useTheme } from "@mui/material/styles";
import { Guide } from "@/api/types/Guide";

type Props = {
  guide: Guide;
};

const GuideCard = ({ guide }: Props) => {
  const theme = useTheme();

  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <SupportIcon color="primary" sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="h6">{guide.title}</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Created by User ID: {guide.creatorId}
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Created at: {new Date(guide.createdAt).toLocaleDateString()}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            Total Stars: {guide.starsTotalSum}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
