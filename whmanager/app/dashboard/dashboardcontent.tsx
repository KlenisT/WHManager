"use client";
// app/dashboard/dashboardcontent.tsx
// Purpose: Client-side dashboard content using useSearch to filter orders.

import React from "react";
import styles from "../styles/dashboard.module.css";
import { useSearch } from "../context/SearchContext";

interface Order {
  customer: string;
  automower: string;
  status: string;
  dateAccepted: string;
}

interface DashboardContentProps {
  orders: Order[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ orders }) => {
  const { searchTerm } = useSearch();

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
};

export default DashboardContent;


