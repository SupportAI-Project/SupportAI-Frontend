"use client";
import DashboardCard from "../shared/Card";
import useGuideItems from "./hooks/useGuideItems";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SupportIcon from "@mui/icons-material/Support";
import { useTheme } from "@mui/material/styles";
import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Page = () => {
  const { guideItems } = useGuideItems();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = guideItems.filter((guide) =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer title="Guides">
      <DashboardCard title="Guides">
        <Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Search Guides"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Grid container spacing={2}>
            {filteredGuides.map((guide, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <SupportIcon
                        color="primary"
                        sx={{ marginRight: theme.spacing(1) }}
                      />
                      <Typography variant="h6">{guide.title}</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary" mb={2}>
                      Issue: {guide.issue}
                    </Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Box display="flex" alignItems="center">
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
                      </Grid>
                      <Grid item>
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
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
