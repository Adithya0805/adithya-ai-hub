export function Footer() {
  const cols = [
    {
      title: 'Work',
      links: [
        ['Projects', '/work'],
        ['Freelance', '/freelance'],
        ['Blog', '/blog'],
      ] as [string, string][],
    },
    {
      title: 'Connect',
      links: [
        ['GitHub', 'https://github.com/Adithya0805'],
        ['LinkedIn', 'https://www.linkedin.com/in/adithya-kuppusamy-76baab204/'],
        ['Email', 'mailto:adithyaadhi0805@gmail.com'],
      ] as [string, string][],
    },
    {
      title: 'Site',
      links: [
        ['About', '/about'],
        ['Resources', '/resources'],
        ['Privacy', '/privacy'],
      ] as [string, string][],
    },
  ];

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '48px 32px'
    }}>
      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '32px'
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: '20px',
            marginBottom: '8px', color: 'var(--text-1)'
          }}>Adithya Kuppusamy</p>
          <p style={{
            fontSize: '13px', color: 'var(--text-3)', lineHeight: '1.7'
          }}>
            AI Engineer · FutureLogic AI<br />
            Ambur, Tamil Nadu, India
          </p>
        </div>

        {cols.map(col => (
          <div key={col.title}>
            <p style={{
              fontSize: '11px', color: 'var(--text-3)',
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px'
            }}>{col.title}</p>
            {col.links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={{
                  display: 'block', fontSize: '13px',
                  color: 'var(--text-2)', textDecoration: 'none',
                  marginBottom: '10px'
                }}
              >{label}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: 'var(--max)', margin: '32px auto 0',
        paddingTop: '24px', borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px'
      }}>
        <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>
          © 2026 Adithya AI Hub · FutureLogic AI
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>
          Built with React + Vite · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
