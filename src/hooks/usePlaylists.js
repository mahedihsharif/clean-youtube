import { useEffect, useState } from "react";
import getPlaylist from "../api";
import storage from "../utils";

const LOCAL_KEY = "clean_youtube";
const INIT = {
  playLists: {},
  recentPlaylists: [],
  favorites: [],
};

const usePlayLists = () => {
  const [state, setState] = useState(INIT);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const localState = storage.get(LOCAL_KEY);

    if (localState) {
      setState({ ...localState });
    }
  }, []);

  useEffect(() => {
    if (state !== INIT) {
      storage.save(LOCAL_KEY, state);
    }
  }, [state]);

  const getPlaylistById = async (playlistId, refresh = false) => {
    if (state.playLists[playlistId] && !refresh) {
      return;
    }

    setLoading(true);

    try {
      const playList = await getPlaylist(playlistId);
      setError("");
      setState((prev) => ({
        ...prev,
        playLists: {
          ...prev.playLists,
          [playlistId]: playList,
        },
      }));
    } catch (err) {
      setError(
        err?.response?.data?.error?.message || "Something went to wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  const recentPlayLists = (playlistId) => {
    setState((prev) => ({
      ...prev,
      recentPlaylists: [...prev, playlistId],
    }));
  };

  const addToFavorites = (playlistId) => {
    setState((prev) => ({
      ...prev,
      favorites: [...prev, playlistId],
    }));
  };

  const getPlaylistByIds = (ids = []) => {
    return ids.map((id) => state.playLists[id]);
  };

  return {
    playLists: state.playLists,
    recentPlaylists: getPlaylistByIds(state.recentPlaylists),
    favorites: getPlaylistByIds(state.favorites),
    loading,
    error,
    getPlaylistById,
    recentPlayLists,
    addToFavorites,
  };
};
export default usePlayLists;
