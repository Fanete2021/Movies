import axios from "axios";
import { server } from "./config";
import { objectToQueryString } from "./serialize";

export default class MovieService {

    static async getMovies(title = '', actors = [], genres = [], limit = 10, page = 1) {
        const response = await axios.get(server + 'movies', {
            params: {
                limit: limit,
                page: page,
                idActors: actors,
                idGenres: genres,
                title: title
            },
            paramsSerializer: objectToQueryString
        })

        return response;
    }

    static async getMovie(id) {
        const response = await axios.get(server + 'movies/' + id)
        return response.data
    }

    static async getActors(id) {
        const response = await axios.get(server + `movies/${id}/actors`)
        return response.data
    }

    static async getGenres(id) {
        const response = await axios.get(server + `movies/${id}/genres`)
        return response.data
    }

    static async addMovie(movie) {
        await axios.post(server + 'movies', movie)
    }

    static async addGenre(idMovie, idGenre) {
        await axios.post(server + 'movies/genres',
            {
                movieId: idMovie,
                genreId: idGenre
            }
        )
    }

    static async addActor(idMovie, idActor) {
        await axios.post(server + 'movies/actors',
            {
                movieId: idMovie,
                actorId: idActor
            }
        )
    }

    static async getLast() {
        const response = await axios.get(server + 'movies/last');
        return response.data.id
    }

    static async deleteMovie(id) {
        await axios.delete(server + 'movies/' + id)
    }
}