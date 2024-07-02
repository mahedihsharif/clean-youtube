import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Navbar from "./components/navbar";
import PlaylistCardItem from "./components/playlist-card-item";
import usePlayLists from "./hooks/usePlaylists";

const Player = ({ playLists }) => {
  const { playlistId } = useParams();
  const current = playLists[playlistId];
  if (!current) return;
  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
      <Typography variant="h4" textAlign={"center"}>
        {current.playlistTitle}
      </Typography>
      <Typography variant="body1" textAlign={"center"}>
        {current.playlistDescription}
      </Typography>
    </Container>
  );
};

const HomePage = ({ playlistArray }) => {
  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
      {playlistArray.length > 0 && (
        <Grid container>
          {playlistArray.map((item) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              marginBottom={2}
              key={item.playlistId}
            >
              <PlaylistCardItem
                playlistId={item.playlistId}
                playlistThumbnail={item.playlistThumbnail}
                playlistTitle={item.playlistTitle}
                channelTitle={item.channelTitle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const NotFound = () => {
  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
      <Typography variant="h2" textAlign={"center"}>
        Page Not Found
      </Typography>
    </Container>
  );
};

const App = () => {
  const { playLists, error, getPlaylistById } = usePlayLists();
  const playlistArray = Object.values(playLists);

  return (
    <>
      <BrowserRouter>
        <Navbar getPlaylistById={getPlaylistById} />
        <Routes>
          <Route
            path="/"
            element={<HomePage playlistArray={playlistArray} />}
          />
          <Route
            path="/player/:playlistId"
            element={<Player playLists={playLists} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
