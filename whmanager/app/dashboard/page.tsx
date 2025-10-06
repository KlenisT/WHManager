"use client";

import styles from "../styles/dashboard.module.css";
import { useSearch } from "../context/SearchContext";

interface Order {
  customer: string;
  automower: string;
  status: string;
  dateAccepted: string;
}

const orders: Order[] = [
  { customer: "John Doe", automower: "Husqvarna 315X", status: "In Progress", dateAccepted: "2025-10-02" },
  { customer: "Jane Smith", automower: "Gardena Sileno", status: "Completed", dateAccepted: "2025-09-29" },
  { customer: "Mark Wilson", automower: "Husqvarna 430X", status: "Awaiting Parts", dateAccepted: "2025-09-28" },
  { customer: "Linda Brown", automower: "Robomow RK2000", status: "In Queue", dateAccepted: "2025-10-01" },
];

export default function DashboardPage() {
  const { searchTerm } = useSearch();

  // Filter orders dynamically based on search term
  const filteredOrders = orders.filter((order) =>
    Object.values(order)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Repair Dashboard</h1>

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.headerRow}`}>
          <div>Customer</div>
          <div>Automower</div>
          <div>Status</div>
          <div>Date Accepted</div>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, i) => (
            <div key={i} className={styles.row}>
              <div>{order.customer}</div>
              <div>{order.automower}</div>
              <div className={styles.status}>{order.status}</div>
              <div>{order.dateAccepted}</div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>No matching results found.</div>
        )}
      </div>
    </div>
  );
}
