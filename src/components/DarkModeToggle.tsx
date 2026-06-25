import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Sync with whatever the inline script set before paint
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      style={{
        background: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: '20px',
        cursor: 'pointer',
        padding: '5px 10px',
        fontSize: '0.82rem',
        color: 'var(--color-ink-soft)',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        transition: 'border-color 0.2s, color 0.2s',
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-terracotta)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-terracotta)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-ink-soft)';
      }}
    >
      {dark ? '☀' : '☾'}
    </button>
  );
}
