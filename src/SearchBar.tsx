import { useEffect, useState } from "react";
import "./App.css"

export function useSearchBar(init_val: string) : [query: string, setQuery: React.Dispatch<React.SetStateAction<string>>] {
    const [query, setQuery] = useState<string>(init_val);

    useEffect(() => {
        console.log("Search string: ", query);
    }, [query])

    return [query, setQuery];
}

export default function SearchBar({ setQuery, onlyInStock, setOnlyInStock, inputRef, n }: {setQuery: React.Dispatch<React.SetStateAction<string>>, onlyInStock: Boolean, setOnlyInStock: React.Dispatch<React.SetStateAction<Boolean>>, inputRef: React.RefObject<HTMLInputElement | null>, n: number }) {
    return (
        <>
            <div className="searchBar">
                <input ref={inputRef} className="input" type="text" placeholder={"Поиск по названию.."} onChange={(x) => setQuery(x.target.value)}/>
                <button className={`button ${onlyInStock ? "active" : ""}`} onClick={() => setOnlyInStock((x) => !x)}></button>
                <p className="text">Только в наличии</p>
                <span className="text right">Найдено: {n}</span>
            </div>
        </>
    );
}