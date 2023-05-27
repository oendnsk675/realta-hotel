import "@styles/globals.css";

import Nav from "@components/admin/Nav";
import Sidebar from "@components/admin/Sidebar";

export const metadata = {
  title: "Realta Hotel",
  description: "Realta Hotel",
};

const DashboardLayout = ({ children }) => (
  <html lang="en">
    <body>
      <div className="main -z-30">
        <div className="gradient" />
      </div>

      <main className="max-w-full font-satoshi text-sm">
        <Nav />
        <div className="flex">
          <Sidebar />
          <div className="p-6 px-14 w-full">{children}</div>
        </div>
      </main>
    </body>
  </html>
);

export default DashboardLayout;
