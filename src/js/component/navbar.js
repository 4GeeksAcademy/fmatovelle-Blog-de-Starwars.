import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Importa el contexto

export const Navbar = () => {
  const { store, actions } = useContext(Context); // Accede al store y las acciones del contexto

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 px-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Star Wars</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end p-2" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Favorites ({store.favorites.length})
              </a>
              <ul className="dropdown-menu">
                {store.favorites.length > 0 ? (
                  store.favorites.map((item, index) => (
                    <li key={index}>
                      <a className="dropdown-item" href="#">
                        {item.name}
                        <button
                          className="btn btn-outline-danger btn-sm float-end"
                          onClick={() => actions.removeFavorite(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </a>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item">No favorites added</span>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
