import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
    <CookieBanner />
  </div>
);
