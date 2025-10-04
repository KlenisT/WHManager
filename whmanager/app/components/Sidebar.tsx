"use client";
import styles from "../styles/sidebar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Inventory", path: "/inventory" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>
        WH Manager <br/> Ruudi Robots
      </h2>
      <nav className={styles.nav}>
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.path}
              className={pathname === link.path ? styles.active : ""}
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
