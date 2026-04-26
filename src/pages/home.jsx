import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="home-landing">
      <section className="hero-block">
        <p className="hero-kicker">Developer Knowledge Hub</p>
        <h2>Build Better Frontend Projects, Faster</h2>
        <p>
          MernDoc helps you move from setup to production with clean documentation for React,
          Next.js, Vue, and CSS best practices.
        </p>
        <div className="hero-cta-row">
          <Link to="/reactjs" className="get-started-btn">
            Get Started
          </Link>
          <p className="cta-note">Start with React guide, then explore Next.js, Vue, and CSS.</p>
        </div>
        <div className="hero-actions">
          <span className="hero-chip">Project Setup</span>
          <span className="hero-chip">UI Docs</span>
          <span className="hero-chip">Quick References</span>
        </div>
      </section>

      <section className="home-stats">
        <article>
          <h3>100+</h3>
          <p>Action-oriented documentation blocks</p>
        </article>
        <article>
          <h3>5</h3>
          <p>Learning tracks: Home, CSS, React, Next.js, Vue</p>
        </article>
        <article>
          <h3>Beginner First</h3>
          <p>Hinglish notes with practical code snippets</p>
        </article>
      </section>

      <section className="feature-grid">
        <article className="feature-card">
          <h3>Framework-Focused Guides</h3>
          <p>Each page has targeted setup steps, snippets, and extension recommendations.</p>
        </article>
        <article className="feature-card">
          <h3>Practical Coding Content</h3>
          <p>Learn with copy-ready snippets that are useful during real coding sessions.</p>
        </article>
        <article className="feature-card">
          <h3>Speed + Clarity</h3>
          <p>Sidebars are structured as action buttons so you can jump to exact topics quickly.</p>
        </article>
      </section>
    </div>
  )
}

export default HomePage
