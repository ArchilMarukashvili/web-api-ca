import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";

const AddToMustWatchIcon = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext);

  const handleAdd = (e) => {
    e.preventDefault();
    addToMustWatch(movie);
  };

  return ( <IconButton aria-label="add to must watch" onClick={handleAdd}><PlaylistAddIcon color="primary" fontSize="large" /></IconButton>);
};

export default AddToMustWatchIcon;
