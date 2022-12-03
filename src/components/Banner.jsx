import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import categories, { getMovies } from "../api";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const fetchRandomMovie = async () => {
    try {
      const data = await getMovies(
        categories.find((category) => category.name === "netflixOriginals").path
        );
        const randomIndex = Math.floor(Math.random() * data.results.length)
        setMovie(data?.results[randomIndex])
    } catch (error) {
      console.log("Banner error", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie()
  }, []);

  return (

  <header className="banner-container" style={{backgroundSize: "cover", backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`, backgroundPosition: "center-center"}}>
    <div className="banner-content">
      <h1 className="banner-title">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <div className="banner-button-container">
        <div className="banner-button">Assistir</div>
        <div className="banner-button">Minha Lista</div>
      </div>
      <div className="banner-description">
        <p>{movie?.overview}</p>
      </div>
    </div>
  </header>
  )
};

export default Banner;
