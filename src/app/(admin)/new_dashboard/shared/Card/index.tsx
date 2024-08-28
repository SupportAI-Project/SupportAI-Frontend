import { Card, CardContent, Typography, Stack, Box } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
  fullHeight?: boolean;
  buttons?: JSX.Element;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  fullHeight = false,
  buttons,
}: Props) => {
  return (
    <Card
      sx={{
        padding: 0,
        height: fullHeight ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
        elevation: 9,
        variant: undefined,
      }}
    >
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px", flex: 1 }}>
          {/* Allow content to expand */}
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={"center"}
              mb={3}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box>
                  {title ? (
                    <Typography variant="h1" mb={1}>
                      {title}
                    </Typography>
                  ) : (
                    ""
                  )}

                  {subtitle ? (
                    <Typography variant="subtitle2" color="textSecondary">
                      {subtitle}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
                {buttons ? (
                  <Box mt={1} ml={5}>
                    {buttons}
                  </Box>
                ) : (
                  ""
                )}
              </Box>
              {action}
            </Stack>
          ) : null}
          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
