import { useNavigate } from 'react-router-dom';

export default function TermsOfUsePage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0f141e', color: '#e2e8f0', fontFamily: "'Public Sans', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span className="material-icons" style={{ fontSize: 16 }}>arrow_back</span>
          Back
        </button>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>Terms of Use</h1>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 40 }}>Effective Date: April 5, 2026 &nbsp;·&nbsp; Last Updated: April 5, 2026</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>1. Acceptance</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}>
            By creating an account or using Pocket Productions ("the Service"), you agree to these Terms of Use. If you do not agree, do not use the Service.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>2. What We Collect</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1', marginBottom: 12 }}>When you use Pocket Productions, we collect and store:</p>
          <ul style={{ paddingLeft: 24, lineHeight: 2, color: '#cbd5e1' }}>
            <li>Account information (email address, name) via Clerk Authentication</li>
            <li>Project data you create (titles, loglines, notes)</li>
            <li>Crew information (names, roles, contract types, negotiated rates)</li>
            <li>Budget figures and line items</li>
            <li>Location details including addresses and contact information</li>
            <li>Character and story development data</li>
            <li>Files you upload (storyboard images, documents) stored on Amazon S3</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>3. How We Use Your Data</h2>
          <ul style={{ paddingLeft: 24, lineHeight: 2, color: '#cbd5e1' }}>
            <li>To provide and operate the Pocket Productions service</li>
            <li>To enable team collaboration features when you invite crew members</li>
            <li>We do <strong>not</strong> sell or share your data with third parties for marketing</li>
            <li>We do <strong>not</strong> use your production data to train AI models</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>4. Data Storage &amp; Security</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}>
            Your data is stored on Railway (PostgreSQL database) and Amazon S3, both operating in United States regions.
            We use HTTPS encryption for all data in transit. Sensitive production data such as crew salaries and budget
            figures is accessible only to authorized users based on their assigned clearance tier.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>5. Team Access &amp; Clearance Tiers</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1', marginBottom: 12 }}>
            Project owners may invite crew members with different clearance levels. By accepting an invite, crew members
            agree that their access is limited to the tier assigned by the project owner and may be revoked at any time.
          </p>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}>
            Project owners are responsible for ensuring that crew member data they enter (names, rates, personal information)
            is collected and stored in compliance with applicable employment and privacy law.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>6. Your Rights</h2>
          <ul style={{ paddingLeft: 24, lineHeight: 2, color: '#cbd5e1' }}>
            <li><strong>Export:</strong> You may download a full copy of your data at any time from Settings.</li>
            <li><strong>Deletion:</strong> You may delete your account from Settings. This permanently removes all your projects and associated data.</li>
            <li><strong>Corrections:</strong> You may edit or delete any data you have entered at any time.</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>7. Prohibited Use</h2>
          <ul style={{ paddingLeft: 24, lineHeight: 2, color: '#cbd5e1' }}>
            <li>You may not use the Service for any unlawful purpose</li>
            <li>You may not attempt to access another user's data without authorization</li>
            <li>You may not use the Service to store illegally obtained personal information</li>
          </ul>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>8. Changes to These Terms</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}>
            We may update these Terms from time to time. We will notify you by email or in-app notification before significant
            changes take effect. Continued use of the Service after changes constitutes acceptance.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>9. Contact</h2>
          <p style={{ lineHeight: 1.75, color: '#cbd5e1' }}>
            Questions about these terms? Contact us at <span style={{ color: '#60a5fa' }}>support@pocketproductions.app</span>
          </p>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', gap: 16 }}>
          <a href="/privacy" style={{ color: '#60a5fa', fontSize: 13 }}>Privacy Policy</a>
          <span style={{ color: '#334155' }}>·</span>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: 13 }}>Go Back</button>
        </div>
      </div>
    </div>
  );
}
