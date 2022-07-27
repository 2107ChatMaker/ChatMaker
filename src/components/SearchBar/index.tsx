import { useState, FormEvent } from "react";

//material UI
import { Search } from "@mui/icons-material";

//custom style
import styles from "./SearchBar.module.sass";


//props for the search bar
interface Props{
    onSubmit: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar(props: Props) {

    //search bar state
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
};