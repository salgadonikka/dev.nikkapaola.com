import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Replace this fetch with your actual newsletter provider (e.g. Buttondown, ConvertKit, Mailchimp)
    try {
      await new Promise((r) => setTimeout(r, 800)); // placeholder delay
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-sage)', fontSize: '1rem' }}>
        You're in ✦ Talk soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: 0,
        maxWidth: '420px',
        margin: '0 auto',
        border: '1px solid var(--color-border)',
        borderRadius: '3px',
        overflow: 'hidden',
        background: 'white',
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          flex: 1,
          padding: '14px 20px',
          border: 'none',
          outline: 'none',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: 'var(--color-ink)',
          background: 'transparent',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '14px 24px',
          background: status === 'loading' ? 'var(--color-muted)' : 'var(--color-terracotta)',
          color: 'white',
          border: 'none',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {status === 'loading' ? '...' : 'Subscribe'}
      </button>
    </form>
  );
}
