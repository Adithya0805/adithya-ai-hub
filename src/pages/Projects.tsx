import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <Layout>
      <Helmet>
        <title>Projects | Adithya AI Hub</title>
        <meta
          name="description"
          content="Real AI systems built to solve real problems. Portfolio of AI/ML projects by Adithya Kuppusamy."
        />
        <meta property="og:title" content="Projects | Adithya AI Hub" />
        <meta property="og:description" content="Real AI systems built to solve real problems." />
        <meta property="og:url" content="https://adithya-ai-hub.vercel.app/projects" />
      </Helmet>

      {/* Projects — clean editorial list */}
      <div style={{ maxWidth: 'var(--content-width)', margin: '0 auto', padding: '64px 24px' }}>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '48px',
          fontWeight: '700',
          marginBottom: '8px',
          letterSpacing: '-1px'
        }}>Projects</h1>

        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '64px'
        }}>
          Real AI systems built to solve real problems.
        </p>

        {projects.map((project, index) => (
          <div key={project.slug} style={{
            paddingBottom: '48px',
            marginBottom: '48px',
            borderBottom: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                0{index + 1}
              </span>
              {project.flagship && (
                <span style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--text-primary)',
                  padding: '3px 10px',
                  borderRadius: '2px'
                }}>
                  Flagship
                </span>
              )}
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '8px',
              letterSpacing: '-0.5px'
            }}>{project.title}</h2>

            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              marginBottom: '20px',
              maxWidth: '560px'
            }}>{project.tagline || project.problem}</p>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {(project.stack || []).map(t => (
                <span key={t} style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--border-light)',
                  padding: '4px 12px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)'
                }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  GitHub →
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  Live Demo →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
