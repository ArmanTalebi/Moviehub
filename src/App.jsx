import "./App.css";
import React, { useEffect, useState } from "react";
import searchIcon from "../src/search.svg";
import MovieCard from "./MovieCard.jsx";

// * d02dec41 = Api Key
const API_URL = "https://www.omdbapi.com?apikey=d02dec41";

// const movie1 = {
//   Title: "Spiderman and Grandma",
//   Year: "2009",
//   imdbID: "tt1433184",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMjE3Mzg0MjAxMl5BMl5BanBnXkFtZTcwNjIyODg5Mg@@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); //! "" because our search starts with empty

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie(`Spiderman`);
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img
          src={searchIcon}
          alt="Search"
          onClick={() => searchMovie(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
