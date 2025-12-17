import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortOption, setSortOption] = useState("title");

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) =>
      m.title.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => m.vote_average >= ratingFilter);

  if (sortOption === "title") {
    displayedMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "rating") {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortOption === "release") {
    displayedMovies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "sort") setSortOption(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            sortOption={sortOption}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
