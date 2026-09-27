export function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'rgba(10,10,10,0.85)',
      backdropFilter: 'blur(12px)',
      height: '56px',
      display: 'flex', alignItems: 'center'
    }}>
      <div style={{
        maxWidth: 'var(--max)', margin: '0 auto', width: '100%',
        padding: '0 32px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center'
      }}>
        <a href="/" style={{
          fontFamily: 'var(--font-serif)', fontSize: '18px',
          color: 'var(--text-1)', textDecoration: 'none'
        }}>Adithya</a>

        <div className="nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {['Work', 'Blog', 'Freelance', 'Services', 'About'].map(item => (
            <a
              key={item}
              href={item === 'Work' ? '/work' : `/${item.toLowerCase()}`}
              style={{
                fontSize: '13px', color: 'var(--text-2)',
                textDecoration: 'none', letterSpacing: '0.3px',
                transition: 'color 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
            >{item}</a>
          ))}
          <a href="mailto:adithyaadhi0805@gmail.com" style={{
            fontSize: '13px', fontWeight: '500',
            color: 'var(--bg-0)', background: 'var(--text-1)',
            padding: '7px 16px', borderRadius: '4px',
            textDecoration: 'none', letterSpacing: '0.3px'
          }}>Hire Me</a>
        </div>
      </div>
    </nav>
  );
}
