import { useState } from "react";
import styles from "./SearchBar.module.css";
import toast, { Toaster } from 'react-hot-toast';



interface SearchBarProps {
  onSubmit: (query: string) => void
}

function SearchBar( { onSubmit } : SearchBarProps) {
  const [isEmpty, setIsEmpty] = useState<boolean>(false)


  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string
    onSubmit(query)

    if (query.trim() === "") {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
}

  const notify = () => toast.error('Please enter your search query.');
  
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <a
            className={styles.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <form action={handleSubmit} className={styles.form}>
            <input
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button onClick={notify} className={styles.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
      {isEmpty ? <Toaster /> : null}
    </>
  );
}

export default SearchBar;
