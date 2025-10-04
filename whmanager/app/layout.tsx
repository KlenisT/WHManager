import "../app/globals.css";
import Sidebar from "../app/components/Sidebar";
import Header from "../app/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="appContainer">
          <Sidebar />
          <div className="mainContent">
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
