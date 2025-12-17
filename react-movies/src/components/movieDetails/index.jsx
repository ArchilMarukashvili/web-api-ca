import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { getMovieVideos } from "../../api/tmdb-api";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openTrailer, setOpenTrailer] = useState(false);

  const { data: videos } = useQuery({
    queryKey: ["movieVideos", { id: movie.id }],
    queryFn: () => getMovieVideos(movie.id),
  });

  const trailer =
    videos?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) || null;

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 2 }}>
        <Chip
          label="Production Countries"
          color="primary"
          sx={{ bgcolor: "primary.main", color: "white" }}
        />
        {movie.production_countries.map((c) => (
          <Chip
            key={c.name}
            label={c.name}
            variant="outlined"
            sx={{
              bgcolor: "orange",
              color: "black",
              fontWeight: "bold",
            }}
          />
        ))}
      </Stack>

      <Button
        component={Link}
        to={`/movies/${movie.id}/credits`}
        variant="contained"
        color="secondary"
        sx={{
          mt: 2,
          fontWeight: "bold",
          bgcolor: "orange",
          color: "black",
          "&:hover": { bgcolor: "#ffb300" },
        }}
      >
        View Credits
      </Button>

      {trailer && (
        <>
          <Button
            onClick={() => setOpenTrailer(true)}
            variant="contained"
            sx={{
              mt: 2,
              fontWeight: "bold",
              bgcolor: "red",
              color: "white",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            Play Trailer
          </Button>

          <Modal open={openTrailer} onClose={() => setOpenTrailer(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "black",
                boxShadow: 24,
                p: 2,
                borderRadius: 2,
              }}
            >
              <iframe
                width="800"
                height="450"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              />
            </Box>
          </Modal>
        </>
      )}

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
