import axios from "axios";
import {MovieDto} from "./MovieDto";

const apiHost = `http://localhost:8080/v1/movies`;

function createMovie(movie: MovieDto) {
    axios.post(`${apiHost}`, movie).then(resp => {
        console.log("Success");
    })
}

function deleteMovie(objectID: any) {
    axios.delete(`${apiHost}/${objectID}`).then(resp => {
        console.log("Success");
    })
}

async function updateMovie(movie: MovieDto) {
    axios.put(`${apiHost}/${movie.objectID}`, movie).then(resp => {
        console.log("Success");
    })
}

export {createMovie, updateMovie, deleteMovie}