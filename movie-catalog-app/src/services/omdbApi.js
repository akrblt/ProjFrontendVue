
import axios from 'axios';

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const baseURL = import.meta.env.VITE_OMDB_BASE_URL;

export const searchMovies = async (query) => {
  try{
      const response = await axios.get(baseURL, {
          params: {
              s: query,
              apikey: apiKey
          }
      });

      // Gestion des erreurs fonctionnelles OMDb
      if (response.data.Response === 'False'){
          // Lancer une erreur pour les cas où OMDb renvoie 200 mais avec un message d'erreur
          throw new Error(response.data.Error || "Erreur lors de la recherche OMDb")
      }

      return response.data;

  } catch (error){
      let errorMessage = "Une erreur est survenue";

      if (errorMessage){
          const status = error.response.status;

          if (status === 500){
              errorMessage = "Erreur 500 : Problème interne du serveur OMDb.";
          } else if (status === 404){
              errorMessage = "Erreur 404 : Ressource non trouvée.";
          } else {
              errorMessage = `Erreur serveur :Statut ${status}`;
          }
      } else if (error.request) {
          errorMessage = "Erreur réseau : Vérifiez votre connexion internet.";
      } else {
          errorMessage = error.message;
      }

      console.error("OMDb API call Failed :", errorMessage)
  }
   // Relancer l'erreur pour que l'action Pinia puisse la capturer et mettre à jour le state
    throw new Error(errorMessage);
};

export const getMovieDetail = async (id) => {
  const response = await axios.get(baseURL, {
    params: {
      i: id,
      apikey: apiKey
    }
  });
  return response.data;
};
