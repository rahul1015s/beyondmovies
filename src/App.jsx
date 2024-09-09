import { useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCart';
import { useState } from 'react';

const API_URL = 'http://www.omdbapi.com?apikey=111f50ee';





  const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);


  // function to search movies
    const searchMovies = async (title) => {
      const response = await fetch (`${API_URL}&s=${title}`);

      const data = await response.json();

      setMovies(data.Search);
    };

    // function to get movies details  Now its not working



    const fetchMovieDetails = async (imdbID) => {
      const response = await fetch(`${API_URL}&i=${imdbID}`);

      const data = await response.json();
      console.log(data);
      setSelectedMovie(data);
    };

    useEffect( () => {
      searchMovies('Batman');
    }, []);

    const handleKeyDown = (event) => {
      if (event.key === 'Enter'
      ) {
          searchMovies(searchTerm);
      }
    };

    const handleMovieClick = (movie) => {
      setSelectedMovie(movie);
    };

    const handleGoBack = () => {
      setSelectedMovie(null);
    }


  return (
   <div className= "app">
    <h1>Beyond Movies</h1>

    <div className="search">
      <input 
        placeholder="Search for movies"
        value= {searchTerm}
        onChange={ (e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <img 
      src={SearchIcon} 
      alt="search"
      onClick={ () => searchMovies(searchTerm)}
      style={{ cursor: 'pointer'}}
    
      />
    </div>

    {selectedMovie ? (
      <div className='movie-details'>
        <h2>{selectedMovie.Title}</h2>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
          <p><strong>Year:</strong> {selectedMovie.Year}</p>
          <p><strong>Directed By:</strong> {selectedMovie.Director}</p>
          <p><strong>Writing Credits:</strong> {selectedMovie.Writer}</p>
          <p><strong>Cast:</strong> {selectedMovie.cast}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
          <button onClick={handleGoBack}>Go Back</button>

      </div>
    ) : (
      <>
      {movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <div key={movie.imdbID} onClick={() => handleMovieClick(movie)}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App
