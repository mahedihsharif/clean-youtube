import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const PlaylistForm = ({ open, handleClose, getPlaylistId }) => {
  const [state, setState] = useState("");

  const handleSubmit = () => {
    if (!state) {
      alert("Please provide a playlist id or link");
    } else {
      getPlaylistId(state);
      setState("");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Playlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a playlist just provide your playlist id and submit
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          name="name"
          label="Playlist ID or Link"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setState(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          add playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistForm;
