import { useState } from 'react';

interface Props {
  navLinks: { href: string; label: string }[];
}

export default function MobileMenu({ navLinks }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <span style={{
          display: 'block',
          width: '22px',
          height: '1px',
          background: 'var(--color-ink)',
          transition: 'transform 0.3s, opacity 0.3s',
          transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
        }} />
        <span style={{
          display: 'block',
          width: '22px',
          height: '1px',
          background: 'var(--color-ink)',
          transition: 'opacity 0.3s',
          opacity: open ? 0 : 1,
        }} />
        <span style={{
          display: 'block',
          width: '22px',
          height: '1px',
          background: 'var(--color-ink)',
          transition: 'transform 0.3s, opacity 0.3s',
          transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
        }} />
      </button>

      {open && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          background: 'rgba(250,247,242,0.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 99,
          animation: 'fadeDown 0.2s ease both',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-soft)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
