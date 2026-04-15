import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0f141e', color: '#e2e8f0', fontFamily: "'Public Sans', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px' }}>

        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span className="material-icons" style={{ fontSize: 16 }}>arrow_back</span>
          Back
        </button>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 40 }}>Effective Date: April 5, 2026 &nbsp;·&nbsp; Last Updated: April 5, 2026</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Information We Collect</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1', marginBottom: 12 }}><strong>Account data</strong> — provided through Clerk Authentication: email address, display name.</p>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1', marginBottom: 12 }}><strong>Production data</strong> — any content you enter: project titles, crew names and rates, budget figures, locations, character details, storyboard images.</p>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}><strong>Usage data</strong> — standard server logs (IP address, browser type, pages visited). We do not use third-party analytics trackers.</p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>How We Use It</h2>
          <ul style={{ paddingLeft: 24, lineHeight: 2, color: '#cbd5e1' }}>
            <li>To operate and improve the Pocket Productions service</li>
            <li>To send transactional emails (team invites, account alerts)</li>
            <li>To respond to your support requests</li>
          </ul>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1', marginTop: 12 }}>We do <strong>not</strong> sell your data. We do <strong>not</strong> use your production content to train machine learning models.</p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Third-Party Services</h2>
          <ul style={{ paddingLeft: 24, lineHeight: 2, color: '#cbd5e1' }}>
            <li><strong>Clerk</strong> — authentication and account management (clerk.com)</li>
            <li><strong>Railway</strong> — database hosting in the United States (railway.app)</li>
            <li><strong>Amazon S3</strong> — file storage in the United States (aws.amazon.com)</li>
            <li><strong>Anthropic Claude</strong> — AI-powered features (prompts are not stored by Anthropic beyond their standard retention policy)</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Data Retention</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}>
            Your data is retained for as long as your account is active. When you delete your account, all your projects,
            crew data, budget figures, and uploaded files are permanently deleted within 30 days.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Your Rights</h2>
          <ul style={{ paddingLeft: 24, lineHeight: 2, color: '#cbd5e1' }}>
            <li><strong>Access &amp; Export</strong> — download all your data as JSON from Settings → Export Data</li>
            <li><strong>Deletion</strong> — delete your account and all associated data from Settings → Delete Account</li>
            <li><strong>Correction</strong> — edit any data you have entered at any time</li>
            <li><strong>Portability</strong> — your export file is in standard JSON format</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Cookies</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}>
            We use only essential cookies required for authentication (set by Clerk). We do not use advertising or tracking cookies.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Contact</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}>
            Privacy questions: <span style={{ color: '#60a5fa' }}>privacy@pocketproductions.app</span>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', gap: 16 }}>
          <a href="/terms" style={{ color: '#60a5fa', fontSize: 13 }}>Terms of Use</a>
          <span style={{ color: '#334155' }}>·</span>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: 13 }}>Go Back</button>
        </div>
      </div>
    </div>
  );
}
