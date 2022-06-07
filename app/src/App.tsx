import {InstantSearch, SearchBox} from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch';
import {useState} from 'react';
import {MovieDto} from './MovieDto';
import MovieEditor from './MovieEditor/MovieEditor';
import {MovieList} from './MovieList/MovieList';
import {createOrUpdateMovie, deleteMovie} from "./service/movieApi";

const searchClient = algoliasearch(
    import.meta.env.VITE_ALGOLIA_APP_ID,
    import.meta.env.VITE_ALGOLIA_APP_READ_KEY,
);

function App() {
    const [selectedMovie, setSelectedMovie] = useState<MovieDto>();
    return (
        <div className="p-6 flex flex-col items-center mx-auto">
            <p className="text-6xl mt-10 font-bold text-slate-100 ">YAMA</p>
            <p className="text-sm mb-5 font-bold text-slate-100 font-bold ">Yet Another Movie App</p>
            <InstantSearch searchClient={searchClient} indexName="Movies">
                <div className="flex flex-row items-center w-3/5">
                    <SearchBox
                        classNames={{
                            root: 'w-3/5 m-10',
                            form: 'bg-transparent',
                            input: 'rounded-md text-xl',
                        }}
                        placeholder="Search for a film ..."
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setSelectedMovie({image: 'https://user-images.githubusercontent.com/2246570/172069912-1b362389-f5ee-421b-a1fd-b3630508d4f8.jpg'} as MovieDto)}
                    >
                        or add a new one!
                    </button>
                </div>
                <MovieList onMovieClicked={setSelectedMovie}/>
            </InstantSearch>
            {selectedMovie && (
                <MovieEditor movie={selectedMovie}
                             onClose={() => setSelectedMovie(undefined)}
                             onDelete={(objectID: string) => deleteMovie(objectID)}
                             onCreateOrUpdate={(movie: MovieDto) => createOrUpdateMovie(movie)}/>
            )}
        </div>
    );
}

export default App;
