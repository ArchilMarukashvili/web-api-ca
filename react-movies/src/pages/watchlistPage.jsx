import React, { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import MovieListPageTemplate from "../components/templateMovieListPage";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const WatchlistPage = () => {
  const { watchlist } = useContext(MoviesContext);

  const watchlistMovieQueries = useQueries({
    queries: watchlist.map((id) => ({
      queryKey: ["movie", { id }],
      queryFn: getMovie,
    })),
  });

  const isLoading = watchlistMovieQueries.some((q) => q.isLoading);

  if (isLoading) return <Spinner />;

  const movies = watchlistMovieQueries
    .map((q) => q.data)
    .filter((m) => m !== undefined);

  return (
    <MovieListPageTemplate
      title="My Watchlist"
      movies={movies}
      action={() => {}}
    />
  );
};

export default WatchlistPage;
