import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import "../../styles/index.css";


export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [searchVisible, setSearchVisible] = useState(false);
    const [cityFilter, setCityFilter] = useState("");
    const [petType, setPetType] = useState(""); // Nuevo estado para el tipo de mascota
    const cities = [
        "Álava",
        "Albacete",
        "Alicante",
        "Almería",
        "Asturias",
        "Ávila",
        "Badajoz",
        "Barcelona",
        "Burgos",
        "Cáceres",
        "Cádiz",
        "Cantabria",
        "Castellón",
        "Ceuta",
        "Ciudad Real",
        "Córdoba",
        "Cuenca",
        "Girona",
        "Granada",
        "Guadalajara",
        "Guipúzcoa",
        "Huelva",
        "Huesca",
        "Illes Balears",
        "Jaén",
        "La Coruña",
        "La Rioja",
        "Las Palmas",
        "León",
        "Lérida",
        "Lugo",
        "Madrid",
        "Málaga",
        "Melilla",
        "Murcia",
        "Navarra",
        "Orense",
        "Palencia",
        "Pontevedra",
        "Salamanca",
        "Santa Cruz de Tenerife",
        "Segovia",
        "Sevilla",
        "Soria",
        "Tarragona",
        "Teruel",
        "Toledo",
        "Valencia",
        "Valladolid",
        "Vizcaya",
        "Zamora",
        "Zaragoza"
    ];

    const [searchHistory, setSearchHistory] = useState([]); // Historial de búsquedas

    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
    };

    const closeSearch = () => {
        setSearchVisible(false);
    };

    const filteredCities = cities
        .filter(city =>
            city.toLowerCase().startsWith(cityFilter.toLowerCase())
        )
        .filter(city =>
            !searchHistory.includes(city.toLowerCase())
        );

    const handleSearch = () => {
        setSearchHistory([...searchHistory, cityFilter.toLowerCase()]);
        // Aquí puedes realizar la acción de búsqueda
        console.log("City: ", cityFilter);
        console.log("Pet Type: ", petType);
        closeSearch();
    };

    const animalshelterId = localStorage.getItem("animalshelterId");
    const peopleId = localStorage.getItem("peopleId");

    return (
        <nav className="navbar navbar-expand-lg navbarcolor ">
            <div className="container-fluid text-center justify-content-center">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="nav-links">
                        <Link to="/" className="navbar-brand custom-link"><b>Home</b></Link>
                        <Link to="/adoptme" className="navbar-brand custom-link"><b>Adoptme</b></Link>
                        {store.user_id && (
                        <Link to="/animals" className="navbar-brand custom-link"><b>My Animals</b></Link>
                        )}
                        {!store.animalshelterId && (
                            <Link to="/animalshelter" className="navbar-brand custom-link"><b>Animal Shelter</b></Link>
                        )}
                        <Link to="/tips" className="navbar-brand custom-link"><b>Tips</b></Link>
                        <Link to="/lostanimals" className="navbar-brand custom-link"><b>Lost animals</b></Link> 
                        <Link to="/voluntaryform" className="navbar-brand custom-link">
                        <b>{(!store.user_id) ? "Become a volunteer" : (animalshelterId !== 'false' || (store.user_id && peopleId === 'false' && animalshelterId === 'false')) ? 
                        "Find your volunteer" : "Voluntary Form" }</b>
                        </Link>
                        <Link to="/experiences" className="navbar-brand custom-link"><b>Experiences</b></Link>
                        {store.user_id && store.animalshelterId == null && store.peopleId == null && (
                        <Link to="/users" className="navbar-brand custom-link"><b>Manage Users</b></Link>
                        )}
                    </div>
                    {/* <button className="btn btn-outline-success" id="openSearchButton" onClick={toggleSearch}>
                        Open Search
                    </button> */}
                </div>
            </div>
            {searchVisible && (
                <div className="search-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form action="https://petshelter.miwuki.com/busqueda-avanzada-protectoras" method="POST">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="searchModalLabel">Advanced search</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeSearch}></button>
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" name="_token" value="HmnY8nKjVRyXFWy9N95Gf0ftsuxgm8nz4NQKhTGS" />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="form-label ms-2" htmlFor="City"><b>City</b></label>
                                            <input
                                                type="text"
                                                id="City"
                                                name="City"
                                                className="form-control"
                                                placeholder="Enter a city"
                                                list="citySuggestions"
                                                value={cityFilter}
                                                onChange={(e) => {
                                                    setCityFilter(e.target.value);
                                                }}
                                            />
                                            <datalist id="citySuggestions">
                                                {filteredCities.map((city, index) => (
                                                    <option key={index} value={city} />
                                                ))}
                                            </datalist>
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <label className="form-label ms-2" htmlFor="PetType"><b>Pet Type</b></label>
                                            <select
                                                id="PetType"
                                                name="PetType"
                                                className="form-control"
                                                value={petType}
                                                onChange={(e) => {
                                                    setPetType(e.target.value);
                                                }}
                                            >
                                                <option value="dog">Dog</option>
                                                <option value="cat">Cat</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={closeSearch}>Close</button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        id="contactBtn"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <div className="ml-auto">
                {!store.token ?
                    (<div className="d-flex me-3">
                        <Link to="/login">
                            <button className="btn btn-dark me-3">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn btn-dark">Register</button>
                        </Link>
                    </div>
                    ) : (
                        <div className="d-flex me-3">
                            <div className="dropdown">
                            <button
                                className="btn btn-transparent dropdown-toggle custom-drop-btn"
                                type="button"
                                id="userDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-user me-2"></i>
                                <b>{store.user_email}</b>
                            </button>
                                <ul className="dropdown-menu dropdown-menu-lg-end custom-dropdown-menu" aria-labelledby="userDropdown">
                                    <li>
                                        <Link to="/" onClick={() => actions.logout()} className="dropdown-item">
                                            Logout
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/profile" className="dropdown-item">
                                            My profile
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </nav>
    );
};
