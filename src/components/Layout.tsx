import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-0)' }}>
    <Navbar />
    {/* push content below fixed navbar */}
    <main style={{ flex: 1, paddingTop: '56px' }}>{children}</main>
    <Footer />
    <CookieBanner />
  </div>
);
