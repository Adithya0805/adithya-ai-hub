// Clean minimal top navbar — exactly like Codesmith
export function Navbar() {
  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--bg-primary)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>

        {/* Logo — left */}
        <a href="/" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          letterSpacing: '-0.5px'
        }}>
          Adithya
        </a>

        {/* Nav links — center */}
        <div className="nav-links" style={{ display: 'flex', gap: '32px' }}>
          {['Home', 'Blog', 'Projects', 'About'].map(link => (
            <a
              key={link}
              href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                letterSpacing: '0.2px',
                borderBottom: '2px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.borderColor = 'var(--text-primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Hire Me button — right */}
        <a
          href="/about"
          style={{
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--bg-primary)',
            backgroundColor: 'var(--text-primary)',
            padding: '8px 18px',
            borderRadius: '4px',
            textDecoration: 'none',
            letterSpacing: '0.3px',
            transition: 'opacity 0.2s'
          }}
        >
          Hire Me
        </a>

      </div>
    </nav>
  )
}
