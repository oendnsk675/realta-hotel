import "@styles/globals.css";

import Nav from "@components/Nav";

export const metadata = {
  title: "Realta Hotel",
  description: "Realta Hotel",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <div className="main -z-30">
        <div className="gradient" />
      </div>

      <main className="max-w-full font-satoshi text-sm">
        <Nav />
        <div className="p-6 px-14 w-full">{children}</div>
      </main>
    </body>
  </html>
);

export default RootLayout;
