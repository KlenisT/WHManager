"use client";
import styles from "../styles/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Ruudi Robotniidukid</div>
      <button
        className={styles.menuButton}
        onClick={() => {
          const sidebar = document.getElementById("sidebar");
          sidebar?.classList.toggle(styles.sidebarOpen);
        }}
      >
        ☰
      </button>
    </header>
  );
}
