import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PersonDetailsPage from "./pages/personDetailsPage";
import WatchlistPage from "./pages/watchlistPage";
import ReviewedMoviesPage from "./pages/reviewedMoviePage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1a237e" },
    secondary: { main: "#f44336" },
    background: { default: "#fbff00ff", paper: "#ffa200ff" },
    text: { primary: "#000000", secondary: "#424242" },
  },
  typography: { fontFamily: "Roboto, Arial, sans-serif" },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthContextProvider>
            <SiteHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/:id/credits" element={<MovieCreditsPage />} />
                <Route path="/person/:id" element={<PersonDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                  <Route path="/movies/watchlist" element={<WatchlistPage />} />
                  <Route path="/movies/reviewed" element={<ReviewedMoviesPage />} />
                  <Route path="/reviews/:id" element={<MovieReviewPage />} />
                  <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);

export default App;
