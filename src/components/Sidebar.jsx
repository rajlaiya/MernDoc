const Sidebar = ({ pageLabel, docs, mode = 'link-groups', activeDocId, onSelectDoc }) => {
  if (mode === 'button-docs') {
    return (
      <aside className="sidebar">
        <h2 className="sidebar-title">{pageLabel} Actions</h2>
        <div className="sidebar-actions">
          {docs.map((doc, index) => (
            <button
              key={doc.id}
              type="button"
              className={activeDocId === doc.id ? 'doc-action-btn active' : 'doc-action-btn'}
              onClick={() => onSelectDoc?.(doc.id)}
            >
              {index + 1}) {doc.label}
            </button>
          ))}
        </div>
      </aside>
    )
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">{pageLabel} Docs</h2>
      <div className="sidebar-sections">
        {docs.map((section) => (
          <section key={section.title} className="doc-section">
            <h3>{section.title}</h3>
            <ul className="doc-links">
              {section.links.map((link) => (
                <li key={link.href}>
                  <a className="doc-link" href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
