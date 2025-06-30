import { MovieCard } from "./MovieCard";

export function MovieList({movies, onMovieClick}){
    return (
        <div>
            <ul className="movie-list">
                {movies && movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onMovieClick={onMovieClick}/>
                ))}
            </ul>
        </div>

    )
}