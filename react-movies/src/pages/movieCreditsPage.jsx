import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/tmdb-api";
import { Link } from "react-router";

export default function MovieCreditsPage() {
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movieCredits", { id }],
    queryFn: () => getMovieCredits(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const cast = data.cast || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie Credits</h1>
      <ul>
        {cast.map((member) => (
          <li key={member.cast_id}>
            <Link to={`/person/${member.id}`}>{member.name}</Link> —{" "}
            {member.character}
          </li>
        ))}
      </ul>
    </div>
  );
}
