import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Box, Button, CardActions, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";

const PlaylistCardItem = ({
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
            start tutorial
          </Stack>
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaylistCardItem;
