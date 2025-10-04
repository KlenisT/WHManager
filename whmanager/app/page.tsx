import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.content}>
          <h1>Welcome to WH Manager //</h1>
          <p>This is your dashboard overview.</p>
        </main>
      </div>
    </div>
  );
}
