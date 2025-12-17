import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import MovieListPageTemplate from "../components/templateMovieListPage";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const ReviewedMoviesPage = () => {
  const { reviewedMovies } = useContext(MoviesContext);

  const reviewedMovieQueries = useQueries({
    queries: reviewedMovies.map((id) => ({
      queryKey: ["movie", { id }],
      queryFn: getMovie,
    })),
  });

  const isLoading = reviewedMovieQueries.some((q) => q.isLoading);

  if (isLoading) return <Spinner />;

  const movies = reviewedMovieQueries
    .map((q) => q.data)
    .filter((m) => m !== undefined);

  return (
    <MovieListPageTemplate
      title="Reviewed Movies"
      movies={movies}
      action={() => {}}
    />
  );
};

export default ReviewedMoviesPage;
