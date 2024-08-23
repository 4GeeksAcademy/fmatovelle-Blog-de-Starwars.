import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleEntityView = () => {
    const { type, id } = useParams(); 
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then(res => res.json())
            .then(data => setDetails(data.result.properties))
            .catch(error => console.error("Error fetching details:", error));
    }, [type, id]);

    if (!details) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${id}.jpg`}
                        className="img-fluid"
                        alt={details.name}
                    />
                </div>
                <div className="col-md-6">
                    <h1>{details.name}</h1>
                    <p>{details.description || "No description available."}</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="d-flex flex-wrap">
                        <div className="p-2 flex-fill">
                            <h5>Appearances:</h5>
                            <ul>
                                <li>Star Wars: Episode IV - A New Hope</li>
                                <li>Star Wars: Episode V - The Empire Strikes Back</li>
                            </ul>
                        </div>
                        <div className="p-2 flex-fill">
                            <h5>Affiliations:</h5>
                            <p>Rebel Alliance, Jedi Order</p> 
                        </div>
                        <div className="p-2 flex-fill">
                            <h5>Locations:</h5>
                            <p>Polis Massa, Lars Moisture Farm, Tatooine</p>
                        </div>
                        <div className="p-2 flex-fill">
                            <h5>Gender:</h5>
                            <p>{details.gender}</p>
                        </div>
                        <div className="p-2 flex-fill">
                            <h5>Dimensions:</h5>
                            <p>Height: {details.height}</p>
                        </div>
                        <div className="p-2 flex-fill">
                            <h5>Species:</h5>
                            <p>{details.species || "Human"}</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
