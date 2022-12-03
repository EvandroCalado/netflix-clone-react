import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../api";
import ReactPlayer from 'react-player'
import movieTrailer from "movie-trailer"

import "./Row.css";

const imageHost = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, path, isLarge }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("")

  const handleImgPlay = (movie) => {

    if(trailerUrl) {
      setTrailerUrl("")
    } else {
      movieTrailer( movie.title || movie.name || movie.original_name || "")
      .then((url) => {
        setTrailerUrl(url)
      })
      .catch((error) => {
        console.log("Error fetching movie trailer:", error)
      })
    }
    
    
  }


  const fetchMovies = async (path) => {
    try {
      const data = await getMovies(path);
      console.log("data", data);
      setMovies(data?.results);
    } catch (error) {
      console.log("fetchMovies error", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {movies?.map((movie) => {
          return (
            <img
              className={isLarge ? "movie-card-large" : "movie-card"}
              onClick={() => handleImgPlay(movie)}
              key={movie.id}
              src={`${imageHost}${
                isLarge ? movie.backdrop_path : movie.poster_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      { trailerUrl && <ReactPlayer url={trailerUrl} playing={true} />}
    </div>
  );
};

export default Row;

