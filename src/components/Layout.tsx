import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { ChatWidget } from "./ChatWidget";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-0, #F7F3EC)" }}>
      <Navbar />
      {/* push content below fixed navbar */}
      <main style={{ flex: 1, paddingTop: "64px" }}>
        {children}
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </div>
  );
};

export default Layout;
