"use client";
import styles from "../styles/header.module.css";
import { useSearch } from "../context/SearchContext";

export default function Header() {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.logo}>WH Manager</div>
      
    </header>
  );
}
