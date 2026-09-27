import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = lazy(() => import("./pages/Index.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const Freelance = lazy(() => import("./pages/Freelance.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Resume = lazy(() => import("./pages/Resume.tsx"));
const Tools = lazy(() => import("./pages/Tools.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Resources = lazy(() => import("./pages/Resources.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const AdminNewsletter = lazy(() => import("./pages/AdminNewsletter.tsx"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--text-1)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/work" element={<Projects />} />
              <Route path="/freelance" element={<Freelance />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/admin/newsletter" element={<AdminNewsletter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
