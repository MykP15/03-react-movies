import styles from "./App.module.css"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Loader from "../Loader/Loader"
import MovieGrid from "../MovieGrid/MovieGrid"
import MovieModal from "../MovieModal/MovieModal"
import SearchBar from "../SearchBar/SearchBar"
import { fetchMovies } from "../../services/movieService"
import { useState } from "react"
import type { Movie } from "../../types/movie"



function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const data = await fetchMovies(query);
      setMovies(data)
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
}
    return (
      <div className={styles.app}>
        <SearchBar onSubmit={handleSearch} />
        {loading ? <Loader /> : null}
        {error ? <ErrorMessage /> : null}
        {movies.length > 0 && !loading && <MovieGrid movies={movies} onSelect={setSelectedMovie} />}
        {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      </div>
    )
  
}

export default App