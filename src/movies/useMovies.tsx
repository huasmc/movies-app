import React, { useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { Movie, MoviesAction } from "types";
import { getMovies } from "api/movies";

interface MoviesState {
  movies: Movie[];
  initialized: boolean;
}

export function useMoviesCollection(): [
  MoviesState,
  React.Dispatch<MoviesAction>
] {
  // TODO: Implement all action processing

  const movieReducer = (
    state: MoviesState,
    action: MoviesAction
  ): MoviesState => {
    switch (action.type) {
      case "fetch":
        return { ...state, movies: action.payload.data, initialized: true };

      case "add":
        return {
          ...state,
          movies: [...state.movies].concat({
            ...action.payload.movie,
            id: state.movies.length.toString(),
            ratings: [],
          }),
        };

      case "delete":
        return {
          ...state,
          movies: state.movies.filter(
            (movie) => movie.id !== action.payload.movieId
          ),
        };
      case "rate":
        return {
          ...state,
          movies: [...state.movies].map((movie: Movie) => {
            if (movie.id === action.payload.movieId) {
              movie.ratings.push(action.payload.rating);
            }
            return movie;
          }),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

  useEffect(() => {
    // TODO: Call fetch action
    let movies = [] as Movie[];
    getMovies().then((data) => {
      movies = [...data];
    });
    dispatch({ type: "fetch", payload: { data: movies } });
  }, []);

  return [state, dispatch];
}
