const Sidebar = ({ pageLabel, docs, activeDocId, onSelectDoc }) => (
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

export default Sidebar
