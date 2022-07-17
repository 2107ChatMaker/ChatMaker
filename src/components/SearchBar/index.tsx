import { Search } from "@mui/icons-material";
import { useState, FormEvent } from "react";
import styles from "./SearchBar.module.sass";


interface Props{
    onSubmit: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar(props: Props) {

    const [search, setSearch] = useState("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(search);
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className={styles.searchBar}>
                <div className={styles.searchInput}>
                    <input value={search} placeholder={props.placeholder} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <button className={styles.searchButton} type={"submit"}>
                    <Search fontSize="medium" sx={{color: "white"}}/>
                </button>
            </div>
        </form>
        
    );
}