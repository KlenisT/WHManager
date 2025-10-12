// app/dashboard/page.tsx
// Purpose: Server page for dashboard route. Guards via NextAuth.

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardContent from "./dashboardcontent";

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

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return <DashboardContent orders={orders} />;
}


