import { Container, Grid } from "@mui/material";
import Navbar from "./components/navbar";
import PlaylistCardItem from "./components/playlist-card-item";
import usePlayLists from "./hooks/usePlaylists";

const App = () => {
  const { playLists, error, getPlaylistById } = usePlayLists();
  const playlistArray = Object.values(playLists);
  return (
    <>
      <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
        <Navbar getPlaylistById={getPlaylistById} />
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
                  playlistThumbnail={item.playlistThumbnail}
                  playlistTitle={item.playlistTitle}
                  channelTitle={item.channelTitle}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default App;
