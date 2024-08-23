import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext"; 
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context); // Accede al store y las acciones del contexto

  // Estados para almacenar los datos de personajes, vehículos y planetas
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  // useEffect para hacer las solicitudes fetch cuando el componente se monta
  useEffect(() => {
    // Fetch para personajes
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.error("Error fetching characters:", error));

    // Fetch para vehículos
    fetch("https://swapi.dev/api/vehicles/")
      .then((response) => response.json())
      .then((data) => setVehicles(data.results))
      .catch((error) => console.error("Error fetching vehicles:", error));

    // Fetch para planetas
    fetch("https://swapi.dev/api/planets/")
      .then((response) => response.json())
      .then((data) => setPlanets(data.results))
      .catch((error) => console.error("Error fetching planets:", error));
  }, []);

  // Función para manejar favoritos
  const handleFavorite = (item) => {
    if (store.favorites.some((fav) => fav.name === item.name)) {
      actions.removeFavorite(item); // Elimina si ya está en favoritos
    } else {
      actions.addFavorite(item); // Agrega si no está en favoritos
    }
  };

  return (
    <div className="container-fluid mt-5">
      {/* Characters Section */}
      <div className="mb-4">
        <h1 className="text-danger">Characters</h1>
      </div>

      <div className="scrolling-wrapper d-flex justify-content-between mb-5">
        {characters.map((character, index) => (
          <div className="card" key={index}>
            <img 
              src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} 
              className="card-img-top" 
              alt={character.name} 
              onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"} // Fallback si la imagen no existe
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <p className="card-text">
                Gender: {character.gender}<br />
                Hair Color: {character.hair_color}<br />
                Eye-Color: {character.eye_color}
              </p>
              <Link to={`/details/people/${index + 1}`} className="btn btn-primary">
                Learn more!
              </Link>
              <button
                className="btn btn-outline-warning float-end"
                onClick={() => handleFavorite(character)}
              >
                {store.favorites.some((fav) => fav.name === character.name) ? (
                  <i className="fas fa-heart text-danger"></i> // Icono rojo si es favorito
                ) : (
                  <i className="fas fa-heart"></i> // Icono sin color si no es favorito
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Vehicles Section */}
      <div className="mb-4">
        <h1 className="text-danger">Vehicles</h1>
      </div>

      <div className="scrolling-wrapper d-flex justify-content-between mb-5">
        {vehicles.map((vehicle, index) => (
          <div className="card" key={index}>
            <img 
              src={`https://starwars-visualguide.com/assets/img/vehicles/${index + 1}.jpg`} 
              className="card-img-top" 
              alt={vehicle.name} 
              onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"} // Fallback si la imagen no existe
            />
            <div className="card-body">
              <h5 className="card-title">{vehicle.name}</h5>
              <p className="card-text">
                Model: {vehicle.model}<br />
                Manufacturer: {vehicle.manufacturer}
              </p>
              <Link to={`/details/vehicles/${index + 1}`} className="btn btn-primary">
                Learn more!
              </Link>
              <button
                className="btn btn-outline-warning float-end"
                onClick={() => handleFavorite(vehicle)}
              >
                {store.favorites.some((fav) => fav.name === vehicle.name) ? (
                  <i className="fas fa-heart text-danger"></i> // Icono rojo si es favorito
                ) : (
                  <i className="fas fa-heart"></i> // Icono sin color si no es favorito
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Planets Section */}
      <div className="mb-4">
        <h1 className="text-danger">Planets</h1>
      </div>

      <div className="scrolling-wrapper d-flex justify-content-between mb-5">
        {planets.map((planet, index) => (
          <div className="card" key={index}>
            <img 
              src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`} 
              className="card-img-top" 
              alt={planet.name} 
              onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"} // Fallback si la imagen no existe
            />
            <div className="card-body">
              <h5 className="card-title">{planet.name}</h5>
              <p className="card-text">
                Climate: {planet.climate}<br />
                Terrain: {planet.terrain}
              </p>
              <Link to={`/details/planets/${index + 1}`} className="btn btn-primary">
                Learn more!
              </Link>
              <button
                className="btn btn-outline-warning float-end"
                onClick={() => handleFavorite(planet)}
              >
                {store.favorites.some((fav) => fav.name === planet.name) ? (
                  <i className="fas fa-heart text-danger"></i> // Icono rojo si es favorito
                ) : (
                  <i className="fas fa-heart"></i> // Icono sin color si no es favorito
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
