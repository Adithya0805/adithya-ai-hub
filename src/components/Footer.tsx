export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--bg-primary)',
      padding: '48px 24px'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>

        <div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '4px'
          }}>Adithya Kuppusamy</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            AI Engineer · Tamil Nadu, India
          </p>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/Adithya0805' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adithya-kuppusamy-76baab204/' },
            { label: 'Blog', href: '/blog' },
            { label: 'Projects', href: '/projects' }
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          © 2026 Adithya AI Hub
        </p>

      </div>
    </footer>
  );
}
