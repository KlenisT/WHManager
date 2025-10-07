// app/(dashboard)/layout.tsx
// Purpose: Dashboard group layout that includes Sidebar and Header.

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { SearchProvider } from "../context/SearchContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <div className="appContainer">
        <Sidebar />
        <div className="mainContent">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </SearchProvider>
  );
}


