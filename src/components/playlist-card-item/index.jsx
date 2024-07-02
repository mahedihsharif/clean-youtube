import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Box, Button, CardActions, Link, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const PlaylistCardItem = ({
  playlistId,
  playlistThumbnail,
  playlistTitle,
  channelTitle,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: 1,
      }}
    >
      <CardMedia
        component="img"
        image={playlistThumbnail.url}
        alt={playlistTitle}
      />
      <CardContent>
        <Stack>
          <Typography variant="h6" color="text.primary">
            {playlistTitle.length > 50
              ? playlistTitle.substr(0, 50) + "..."
              : playlistTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {channelTitle}
          </Typography>
        </Stack>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}></Box>
      <CardActions disableSpacing>
        <Button>
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <PlayCircleFilledOutlined />
            <Link
              to={`/player/${playlistId}`}
              component={RouterLink}
              sx={{ textDecoration: "none" }}
            >
              start tutorial
            </Link>
          </Stack>
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
