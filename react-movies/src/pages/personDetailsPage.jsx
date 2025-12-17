import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const PersonDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["person", { id }],
    queryFn: () => getPerson(id),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{data.name}</Typography>
      <Typography variant="subtitle1">{data.known_for_department}</Typography>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="body1">{data.biography || "No biography available."}</Typography>
      </Paper>
      {data.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
          alt={data.name}
          style={{ marginTop: "1em", borderRadius: "8px" }}
        />
      )}
    </Box>
  );
};

export default PersonDetailsPage;
