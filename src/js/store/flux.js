const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			favorites: [], 
			people: [], 
			vehicles: [], 
			planets: [] 
		},
		actions: {
			fetchPeople: () => {
				fetch("https://www.swapi.tech/api/people")
					.then(response => response.json())
					.then(data => setStore({ people: data.results }))
					.catch(error => console.error("Error fetching people:", error));
			},

			// Acción para obtener vehículos desde la API de swapi.tech
			fetchVehicles: () => {
				fetch("https://www.swapi.tech/api/vehicles")
					.then(response => response.json())
					.then(data => setStore({ vehicles: data.results }))
					.catch(error => console.error("Error fetching vehicles:", error));
			},

			// Acción para obtener planetas desde la API de swapi.tech
			fetchPlanets: () => {
				fetch("https://www.swapi.tech/api/planets")
					.then(response => response.json())
					.then(data => setStore({ planets: data.results }))
					.catch(error => console.error("Error fetching planets:", error));
			},

			// Acción para agregar un favorito
			addFavorite: (item) => {
				const store = getStore();
				const favorites = store.favorites;

				// Verificar si el ítem ya está en favoritos
				if (!favorites.some(fav => fav.name === item.name)) {
					setStore({ favorites: [...favorites, item] });
				}
			},

			// Acción para eliminar un favorito
			removeFavorite: (item) => {
				const store = getStore();
				const favorites = store.favorites;

				// Filtrar los favoritos para eliminar el ítem seleccionado
				setStore({ favorites: favorites.filter(fav => fav.name !== item.name) });
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// Ejemplo de carga de datos (actualmente no en uso)
			loadSomeData: () => {
				// fetch().then().then(data => setStore({ "foo": data.bar }))
			},

			changeColor: (index, color) => {
				// Obtener el store
				const store = getStore();

				// Recorrer el array demo para cambiar el color en el índice dado
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				// Actualizar el store global
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
