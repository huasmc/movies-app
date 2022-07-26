import { StarRating, Button } from "shared/components";

import { getAvgRating } from "movies/ratings";
import { Movie } from "types";
import { useMovies } from "./MovieProvider";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { moviesDispatch } = useMovies();

  // TODO: implement required functionality
  const deleteMovie = (id: string) => {
    moviesDispatch({
      type: "delete",
      payload: { movieId: id },
    });
  };

  const onRate = (id: string, rating: number) => {
    moviesDispatch({
      type: "rate",
      payload: {
        movieId: id,
        rating: rating,
      },
    });
    console.log(movie);
  };

  const getAvgRating = () => {
    const sum = movie.ratings.reduce((a, b) => a + b, 0);
    const avg = sum / movie.ratings.length || 0;
    return avg;
  };

  return (
    <div data-testid="movie-item">
      {/* TODO: Display image */}
      <img className="card-img-top" alt="" src={movie.imageUrl} />
      <div className="card-body">
        <h4 className="card-title">
          {/* TODO: Display title */}
          {movie.title}
        </h4>
        {/* TODO: Display subtitle */}
        <h6 className="card-subtitle mb-2 text-muted"></h6>
        <p className="text-justify" style={{ fontSize: "14px" }}>
          {/* TODO: Display description */}
          {movie.description}
        </p>
        {/* TODO: Implement delete functionality */}
        <Button onClick={() => deleteMovie(movie.id)}>Delete</Button>
      </div>
      <div className="card-footer">
        <div className="clearfix">
          <div className="float-left mt-1">
            <StarRating
              rating={getAvgRating()}
              onRate={(rating) => {
                onRate(movie.id, rating);
              }}
            ></StarRating>
          </div>
          {/* TODO: Display rating value */}
          <div className="card-footer-badge float-right badge badge-primary badge-pill">
            {movie.ratings}
          </div>
        </div>
      </div>
    </div>
  );
};
