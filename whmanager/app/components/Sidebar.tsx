"use client";
import styles from "../styles/sidebar.module.css";

export default function Sidebar() {
  return (
    <aside id="sidebar" className={styles.sidebar}>
      <nav className={styles.nav}>
        <a href="#" className={styles.link}>Dashboard</a>
        <a href="#" className={styles.link}>Inventory</a>
        <a href="#" className={styles.link}>Reports</a>
        <a href="#" className={styles.link}>Settings</a>
      </nav>
    </aside>
  );
}
