import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SupportIcon from "@mui/icons-material/Support";
import { useTheme } from "@mui/material/styles";
import { Guide } from "../../types";

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
          Issue: {guide.issue}
        </Typography>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" mr={2}>
            <IconButton
              color="success"
              sx={{ color: theme.palette.success.main, p: 0 }}
            >
              <ThumbUpIcon />
            </IconButton>
            <Typography variant="body2" ml={0.5}>
              {guide.likes}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton
              color="error"
              sx={{ color: theme.palette.error.main, p: 0 }}
            >
              <ThumbDownIcon />
            </IconButton>
            <Typography variant="body2" ml={0.5}>
              {guide.dislikes}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
