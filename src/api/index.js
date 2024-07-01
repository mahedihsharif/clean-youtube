import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const getPlaylistItems = async (playlistId, pageToken = "", result = []) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&part=id,contentDetails%2Csnippet&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);
  result = [...result, ...data.items];
  if (data.nextPageToken) {
    result = getPlaylistItems(playlistId, data.nextPageToken, result);
  }
  return result;
};

const getPlaylist = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=id%2Csnippet&id=${playlistId}&key=${API_KEY}`;

  const { data } = await axios.get(URL);
  let playlistItems = await getPlaylistItems(playlistId);

  const {
    channelId,
    channelTitle,
    title: playlistTitle,
    description: playlistDescription,
    thumbnails,
  } = data?.items[0]?.snippet;

  playlistItems = playlistItems.map((items) => {
    const {
      title,
      description,
      thumbnails: { medium },
    } = items.snippet;

    return {
      title,
      description,
      thumbnail: medium,
    };
  });

  return {
    channelId,
    channelTitle,
    playlistId,
    playlistTitle,
    playlistDescription,
    playlistThumbnail: thumbnails.default,
    playlistItems,
  };
};

export default getPlaylist;
