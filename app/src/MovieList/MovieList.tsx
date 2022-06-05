import {useHits} from "react-instantsearch-hooks-web";
import {MovieBox} from "./MovieBox";

export function MovieList(props: any) {
    const {hits} = useHits();

    return (
        <div className="ais-Hits">
            <ol className="ais-Hits-list grid grid-cols-4 gap-4 justify-items-stretch shadow-2xl rounded-2xl">
                {hits.map(hit => (
                    <li key={hit.objectID} onClick={() => {
                        props.onMovieClicked(hit);
                    }}
                        className="ais-Hits-item bg-slate-700 hover:bg-slate-600 p-3 cursor-pointer">
                        <MovieBox hit={hit}/>
                    </li>
                ))
                }
            </ol>
        </div>
    )
}