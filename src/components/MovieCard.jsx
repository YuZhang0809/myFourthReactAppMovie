export function MovieCard({ movie, onMovieClick}) {
    const ImgBaseURL = 'https://image.tmdb.org/t/p/w500';

    const posterUrl = movie.poster_path
        ? ImgBaseURL + movie.poster_path
        : 'https://via.placeholder.com/500x750/cccccc/666666?text=No+Image';

    const releaseYear = movie.release_date
        ? movie.release_date.split('-')[0]
        : 'N/A';


    return (
        <li className="movie-card" onClick={() => onMovieClick(movie.id)}>
            <img
                src={posterUrl}
                alt={`Poster of ${movie.title}`}
            />
            <div className="movie-card-info">
                <h3>{movie.title}</h3>
                <p>{releaseYear}</p>
            </div>
        </li>
    );
}