import {Highlight} from "react-instantsearch-hooks-web";

// @ts-ignore
export function MovieBox({hit}) {
    return (
        <article className='flex flex-row'>
            <img className="opacity-90" src={hit.image} alt="Movie title"
                 onError={({currentTarget}) => {
                     currentTarget.onerror = null;
                     currentTarget.src = "https://user-images.githubusercontent.com/2246570/172069912-1b362389-f5ee-421b-a1fd-b3630508d4f8.jpg"
                     // currentTarget.width = 90
                 }}/>
            <div className="pl-5 text-slate-400 font-bold">
                <Highlight classNames={{
                    root: 'text-xl text-slate-100 font-bold',
                    highlighted: 'bg-slate-800',
                }} attribute="title" hit={hit}/>
                <p>{hit.genre?.join(",")}</p>
                <p>{hit.year}</p>
            </div>
        </article>
    );
}