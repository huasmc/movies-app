import React, { useEffect, useState } from "react";

import { MovieCard } from "./MovieCard";
import { AddMovieButton } from "./AddMovieButton";
import { AddMovieForm } from "./AddMovieForm";
import { Card } from "shared/components";

import { useMovies } from "./MovieProvider";
import { getMovies } from "api/movies";
import { Movie } from "types";

type NewMovieMode = "BUTTON" | "FORM";

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState("button");

  useEffect(() => {
    getMovies().then((data) => {
      moviesDispatch({
        type: "fetch",
        payload: {
          data: data,
        },
      });
    });
  }, []);

  const returnToAddButton = () => setDisplayOptionType("button");

  const onFormSubmit = (movie: Movie) => {
    if (movie) {
      moviesDispatch({
        type: "add",
        payload: {
          movie: movie,
        },
      });
      returnToAddButton();
    }
  };

  return (
    <div className="card-deck">
      {movies.map((movie) => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>
      ))}
      <Card>
        {/* TODO: Implement displaying appropriate card for add movie - button or form */}
        {/* TODO: use AddMovieButton and AddMovieForm */}
        <AddMovieButton onClick={() => setDisplayOptionType("form")} />
        {displayOptionType === "button" ? null : (
          <AddMovieForm
            onSubmit={(movie) => onFormSubmit(movie as Movie)}
            onCancel={() => returnToAddButton()}
          />
        )}
      </Card>
    </div>
  );
};
